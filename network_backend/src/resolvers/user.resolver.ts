/* eslint-disable @typescript-eslint/no-unused-vars */
import argon2 from 'argon2';
import crypto from 'crypto';
import jdenticon from 'jdenticon';
import _ from 'lodash';
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Brackets, getConnection, getRepository } from 'typeorm';
import { Group } from '../entity/group.entity';
import { Media, MediaType } from '../entity/media.entity';
import { NotificationType } from '../entity/notification.entity';
import { Post } from '../entity/post.entity';
import { Role } from '../entity/role.entity';
import { Token } from '../entity/token.entity';
import { User } from '../entity/user.entity';
import { JwtResponse } from '../graphql_types/jwtResponse';
import { UserStats } from '../graphql_types/userStats';
import { generateAccessToken } from '../utils/helpers/auth';
import { uploadFile, uploadFileGraphql } from '../utils/helpers/fileUpload';
import { sendEmail } from '../utils/helpers/sendMail';
import { JwtUser, MyContext } from '../utils/interfaces/interfaces';
import { log } from '../utils/services/logger';
import { redis } from '../utils/services/redis';
import { UpdatePasswordInput } from '../validators/updatePassword.validator';
import { UpdateProfileInput } from '../validators/updateProfile.validator';
import { UserValidator } from '../validators/user.validator';
import { notify } from './notification.resolver';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  public async getUsers(@Ctx() ctx: MyContext): Promise<User[]> {
    return getRepository(User).find();
  }

  @Authorized()
  @Query(() => User, {
    nullable: true,
    description: 'Me returns User info when logged in.',
  })
  public async me(@Ctx() ctx: MyContext): Promise<User | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const user = await getRepository(User).findOne({
      relations: ['roles', 'following', 'followers'],
      where: { id },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => Boolean, { description: 'creates a new user' })
  public async register(
    @Arg('input', () => UserValidator) input: UserValidator,
    @Ctx() ctx: MyContext,
  ): Promise<boolean | null> {
    //validate the email, to check if it is a valid university email
    // if (!input.email.endsWith('@hs-hannover.de') || input.email.endsWith('@stud.hs-hannover.de')) {
    //   throw new Error('only university email allowed');
    // }

    const hashedPassword = await argon2.hash(input.password);
    const result = await getRepository(User).findOne({
      where: {
        email: input.email,
      },
    });
    if (result) throw Error('a user with this email already exisits');

    const user = new User(input, hashedPassword);
    user.followers = [];
    user.following = [];

    //create a default profile image
    const avatar = new Media();
    const profileImg = jdenticon.toPng(user.firstname, 300, { backColor: '#181A20' });

    //uplaod to s3
    const { filename, blurhash } = await uploadFile(profileImg, 'images');

    avatar.name = filename;
    avatar.blurhash = blurhash;
    avatar.type = MediaType.IMAGE;

    const saved = await getRepository(Media).save(avatar);

    user.avatar = saved;

    const savedUser = await getRepository(User).save(user);

    //generate a cryptographic save token
    const token = new Token(crypto.randomBytes(64).toString('hex'), savedUser.id);

    await getRepository(Token).save(token);

    await sendEmail({
      email: input.email,
      subject: 'Aktiviere deinen Account',
      text: `Willkommen zu SocialCampus, aktiviere jetzt deinen Account: https://social.noxz.dev/api/activate/${token.token}`,
    });

    return true;
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'logout an user to invalidate the access token' })
  async logout(@Ctx() ctx: MyContext, @Arg('access', () => String) accessToken: string): Promise<boolean> {
    try {
      //add token to blacklist
      redis.lpush('token', accessToken);
    } catch (err) {
      console.log(err);
    }

    return true;
  }

  @Mutation(() => JwtResponse, { description: 'login to get a new auth token' })
  public async login(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
    @Ctx() ctx: MyContext,
  ): Promise<JwtResponse | null> {
    const user = await getRepository(User).findOne({ where: { email }, relations: ['roles'] });
    if (!user) {
      throw Error('found no user with this email');
    }

    if (!user.activated) throw Error('account is not activated');

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      throw Error('wrong email or password');
    }
    log.info(`user with the id: ${user.id} logged in`);
    const jwtUser: JwtUser = {
      id: user.id,
      email: user.email,
      role: 'User',
    };

    const accessToken = generateAccessToken(jwtUser);

    const response = new JwtResponse(accessToken);

    return response;
  }

  @Authorized()
  @Mutation(() => User, { description: 'follow a user' })
  async addFollower(@Ctx() ctx: MyContext, @Arg('userID', () => String) userID: string): Promise<User | null> {
    const id = ctx.req.user.id;
    if (!id) {
      throw new Error('not authenticated');
    }
    const user = await getRepository(User).findOne({ where: { id: id }, relations: ['following', 'followers'] });
    if (!user) {
      throw new Error('user not found');
    }
    const follower = await getRepository(User).findOne({
      where: { id: userID },
      relations: ['following', 'followers'],
    });
    if (!follower) {
      throw new Error('to be followed user not found');
    }

    //check if user is already following
    const followState = user.following.some((user) => user.id === follower.id);
    if (followState) throw new Error('youre already following this user');

    user.following.push(follower);

    const userRepo = await getRepository(User);

    userRepo.save(user);
    log.info(`user with the id ${user.id} followed ${userID}`);
    await notify(
      {
        type: NotificationType.NEW_FOLLOWER,
        message: `${user.firstname} folgt dir jetzt`,
        toUser: follower,
        fromUser: user,
      },
      ctx,
    );

    user.meFollowing = true;

    return user;
  }

  @Authorized()
  @Mutation(() => User, { description: 'unfollow a user' })
  async removeFollower(@Ctx() ctx: MyContext, @Arg('userID', () => String) userID: string): Promise<User | null> {
    const id = ctx.req.user.id;
    if (!id) {
      throw new Error('not authenticated');
    }

    const user = await getRepository(User).findOne({ where: { id: id }, relations: ['following', 'followers'] });
    if (!user) {
      throw new Error('user not found');
    }

    _.remove(user.following, {
      id: userID,
    });

    await getRepository(User).save(user);
    log.info(`user with the id ${user.id} unfollowed ${userID}`);
    user.meFollowing = false;
    return user;
  }

  @Authorized()
  @Mutation(() => User, { description: 'update the profile information of the loggedIn user' })
  async updateProfile(
    @Ctx() ctx: MyContext,
    @Arg('input', () => UpdateProfileInput) input: UpdateProfileInput,
  ): Promise<User> {
    const userId = ctx.req.user.id;
    if (!userId) {
      throw new Error('not authenticated');
    }

    const userRepo = await getRepository(User);

    const user = await userRepo.findOne({ where: { id: userId }, relations: ['following', 'followers'] });

    if (input.bio) user.bio = input.bio;
    if (input.interests) user.interests = input.interests;
    if (input.faculty) user.faculty = input.faculty;
    if (input.studyCourse) user.studyCourse = input.studyCourse;

    if (input.avatar) {
      const { filename, blurhash } = await uploadFileGraphql(input.avatar, 'images');
      user.avatar.name = filename;
      user.avatar.blurhash = blurhash;
      await getRepository(Media).save(user.avatar);
    }

    await userRepo.save(user);

    const followState = user.followers.some((user) => user.id === userId);
    user.meFollowing = followState;
    log.info(`user with the id ${userId} updated the profile`);
    return user;
  }

  @Authorized()
  @Query(() => User, { description: 'UserById returns a user based on the given id' })
  async userById(@Ctx() ctx: MyContext, @Arg('userId', () => String) userId: string): Promise<User | null> {
    const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['following', 'followers'] });
    if (!user) {
      throw Error('no user found');
    }

    const followState = user.followers.some((user) => user.id === userId);
    user.meFollowing = followState;

    return user;
  }

  @Authorized()
  @Query(() => User, { description: 'UserByUsername returns a user based on the given user handle' })
  async userByUsername(@Ctx() ctx: MyContext, @Arg('username', () => String) username: string): Promise<User> {
    const userId = ctx.req.user.id;
    const user = await getRepository(User).findOne({
      where: { username: username },
      relations: ['following', 'followers', 'roles'],
    });

    if (!user) {
      throw Error('no user found');
    }

    const followState = user.followers.some((user) => user.id === userId);
    user.meFollowing = followState;
    return user;
  }

  @Authorized()
  @Mutation(() => User, { description: 'updates the password' })
  async updatePassword(
    @Ctx() ctx: MyContext,
    @Arg('input', () => UpdatePasswordInput) { password }: UpdatePasswordInput,
  ): Promise<User> {
    const userId = ctx.req.user.id;

    const user = await getRepository(User).findOne({ where: { id: userId } });

    const hashedPassword = await argon2.hash(password);

    user.password = hashedPassword;

    const saved = await getRepository(User).save(user);
    return saved;
  }

  @Authorized()
  @Query(() => [User], { description: 'returns all users that the logged in user is following' })
  async getFollowing(
    @Ctx() ctx: MyContext,
    @Arg('userId', () => String) userId: string,
    @Arg('skip', () => Number) skip: number,
    @Arg('take', () => Number) take: number,
  ): Promise<User[]> {
    const me_userId = ctx.req.user.id;
    const me = await getRepository(User).findOne({ where: { id: me_userId }, relations: ['following'] });
    const following = await getRepository(User)
      .createQueryBuilder('following')
      .innerJoin('following.followers', 'followers')
      .where('followers.id = :id', { id: userId })
      .leftJoinAndSelect('following.avatar', 'avatar')
      .skip(skip)
      .take(take)
      .getMany();

    following.forEach((user) => {
      user.meFollowing = me.following.some((u) => u.id === user.id);
    });

    return following;
  }

  @Authorized()
  @Query(() => [User], { description: 'returns all followers of the user' })
  async getFollowers(
    @Ctx() ctx: MyContext,
    @Arg('userId', () => String) userId: string,
    @Arg('skip', () => Number) skip: number,
    @Arg('take', () => Number) take: number,
  ): Promise<User[]> {
    const me_userId = ctx.req.user.id;
    const me = await getRepository(User).findOne({ where: { id: me_userId }, relations: ['following'] });
    const followers = await getRepository(User)
      .createQueryBuilder('followers')
      .innerJoin('followers.following', 'following')
      .where('following.id = :id', { id: userId })
      .leftJoinAndSelect('followers.avatar', 'avatar')
      .skip(skip)
      .take(take)
      .getMany();

    followers.forEach((user) => {
      user.meFollowing = me.following.some((u) => user.id === u.id);
    });

    return followers;
  }

  @Authorized()
  @Query(() => UserStats, { description: 'UserStats are some stats like follower count, post count ...' })
  async userStats(@Arg('userId', () => String) userId: string): Promise<UserStats> {
    const followerCount = await getRepository(User)
      .createQueryBuilder('followers')
      .innerJoin('followers.following', 'following')
      .where('following.id = :id', { id: userId })
      .getCount();

    const followingCount = await getRepository(User)
      .createQueryBuilder('following')
      .innerJoin('following.followers', 'followers')
      .where('followers.id = :id', { id: userId })
      .getCount();

    const postCount = await getRepository(Post).count({
      where: {
        user: userId,
        group: null,
      },
      relations: ['user'],
    });

    const userStats = new UserStats(postCount, followerCount, followingCount);

    return userStats;
  }

  @Authorized()
  @Query(() => [User], { description: 'recommeding users based on Faculty' })
  async recommendedUsersFaculty(@Ctx() ctx: MyContext): Promise<User[]> {
    const userId = ctx.req.user.id;
    const me = await getRepository(User).findOne({ where: { id: userId }, relations: ['following'] });

    const following = getRepository(User)
      .createQueryBuilder('following')
      .innerJoin('following.followers', 'followers')
      .where(`followers.id = '${userId}'`)
      .leftJoinAndSelect('following.avatar', 'avatar')
      .select('following.id', 'following_id');

    const recommended = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id NOT IN (' + following.getSql() + ')')
      .andWhere('user.id != :id', { id: userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('user.faculty = :faculty', { faculty: me.faculty }).orWhere('user.studyCourse = :course', {
            course: me.studyCourse,
          });
        }),
      )
      .leftJoinAndSelect('user.avatar', 'avatar')
      .orderBy('RANDOM()')
      .limit(3)
      .getMany();

    if (recommended.length < 3) {
      const ids = recommended.map((u) => u.id);
      ids.push(userId);
      const moreUsers = await getRepository(User)
        .createQueryBuilder('user')
        .where('user.id NOT IN (' + following.getSql() + ')')
        .andWhere('user.id NOT IN (:...recommended)', { recommended: ids })
        .leftJoinAndSelect('user.avatar', 'avatar')
        .orderBy('RANDOM()')
        .limit(3)
        .getMany();

      //fill up recommended with random users of the network, to allow more interaction opportunities
      recommended.push(...moreUsers.splice(0, 3 - recommended.length));
    }

    recommended.forEach((user) => {
      user.meFollowing = me.following.some((u) => u.id === user.id);
    });

    return recommended;
  }

  @Authorized()
  @Query(() => [User], { description: 'recommeding users based on Faculty' })
  async recommendedUsersInterests(@Ctx() ctx: MyContext): Promise<User[]> {
    const userId = ctx.req.user.id;
    const me = await getRepository(User).findOne({ where: { id: userId }, relations: ['following'] });

    //parse all needed data, to be usable in the sql query
    const interests = (me.interests || 'x').split(',');
    const stringInterests = [];

    for (const interest of interests) {
      stringInterests.push("'" + interest.trim().toLocaleLowerCase() + "'");
    }

    const parsedInterests = stringInterests.toString().replace('[', '').replace(']', '');

    console.log(parsedInterests);

    const followingIds = me.following.map((u) => u.id);
    followingIds.push(userId);

    const stringFollowingIds = [];

    for (const id of followingIds) {
      stringFollowingIds.push("'" + id + "'");
    }

    const parsedFollowingIds = stringFollowingIds.toString().replace('[', '').replace(']', '');

    //TODO ITS NOT WORKING PROPPERLY ... RANDOM STUFF HAPPENS
    const recommendedUsers = await getConnection().query(
      `select count(*), "user".* 
      from "user", 
      unnest(array[${parsedInterests}]) u 
      where string_to_array(regexp_replace(lower("user".interests), '[\s*]', '' , 'g'), ',','g') @> array[u]  
      AND "user".id NOT IN (${parsedFollowingIds}) 
      group by "user".id
      order by 1 desc LIMIT 3;`,
    );

    console.log(recommendedUsers);

    //delete key, only needed for ordering
    recommendedUsers.forEach((u) => {
      delete u.count;
    });

    //fill up recommended with random users of the network, to allow more interaction opportunities
    if (recommendedUsers.length < 3) {
      const ids = recommendedUsers.map((u) => u.id);
      ids.push(userId);
      const moreUsers = await getRepository(User)
        .createQueryBuilder('user')
        .where(`user.id NOT IN (${parsedFollowingIds})`)
        .andWhere('user.id NOT IN (:...recommended)', { recommended: ids })
        .leftJoinAndSelect('user.avatar', 'avatar')
        .orderBy('RANDOM()')
        .limit(3)
        .getMany();

      recommendedUsers.push(...moreUsers.splice(0, 3 - recommendedUsers.length));
    }

    return recommendedUsers;
  }

  @FieldResolver()
  async meFollowing(@Ctx() ctx: MyContext, @Root() user: User): Promise<boolean> {
    const u = await getRepository(User).findOne({ where: { id: user.id }, relations: ['followers'] });
    return u.followers.some((us) => us.id === u.id);
  }

  @FieldResolver()
  async followers(@Ctx() ctx: MyContext, @Root() user: User): Promise<User[]> {
    const u = await getRepository(User).findOne({ where: { id: user.id }, relations: ['followers'] });
    return u.followers;
  }

  @FieldResolver()
  async following(@Ctx() ctx: MyContext, @Root() user: User): Promise<User[]> {
    const u = await getRepository(User).findOne({ where: { id: user.id }, relations: ['following'] });
    return u.following;
  }

  @FieldResolver()
  async avatar(@Root() user: User): Promise<Media> {
    const u = await getRepository(User).findOne({ where: { id: user.id }, relations: ['avatar'] });
    return u.avatar;
  }

  @FieldResolver()
  async roles(@Root() user: User): Promise<Role[]> {
    const u = await getRepository(User).findOne({ where: { id: user.id }, relations: ['roles'] });
    return u.roles;
  }

  @FieldResolver()
  async posts(@Root() user: User): Promise<Post[]> {
    //shows only posts that are not from a group
    return await getRepository(Post).find({ where: { user: user.id, group: null } });
  }

  @FieldResolver()
  async groups(@Root() user: User): Promise<Group[]> {
    const u = await getRepository(User).findOne({ where: { id: user.id }, relations: ['groups'] });
    return u.groups;
  }
}
