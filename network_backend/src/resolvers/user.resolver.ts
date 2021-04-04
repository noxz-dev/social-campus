/* eslint-disable @typescript-eslint/no-unused-vars */
import argon2 from 'argon2';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import jdenticon from 'jdenticon';
import _ from 'lodash';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { JwtToken } from '../entity/jwtToken.entity';
import { NotificationType } from '../entity/notification.entity';
import { Post } from '../entity/post.entity';
import { User } from '../entity/user.entity';
import { JwtResponse } from '../graphql_types/jwtResponse';
import { UserStats } from '../graphql_types/userStats';
import { generateAccessToken, generateRefreshToken } from '../utils/helpers/auth';
import { uploadFile, uploadFileGraphql } from '../utils/helpers/fileUpload';
import { MyContext } from '../utils/interfaces/context.interface';
import { JwtUser } from '../utils/interfaces/jwtUser.interface';
import { log } from '../utils/services/logger';
import { UserValidator } from '../validators/user.validator';
import { notify } from './notification.resolver';

@Resolver(() => User)
export class UserResolver {
  @Authorized('ADMIN')
  @Query(() => [User])
  public async getUsers(@Ctx() ctx: MyContext): Promise<User[]> {
    return getRepository(User).find({ relations: ['roles'] });
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

    const user = getRepository(User).findOne({ relations: ['roles', 'following', 'followers'], where: { id } });
    if (!user) {
      return null;
    }
    return user;
  }

  @Mutation(() => Boolean)
  public async register(@Arg('input') input: UserValidator, @Ctx() ctx: MyContext): Promise<boolean | null> {
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
    const profileImg = jdenticon.toPng(user.firstname, 300);
    const filename = await uploadFile(profileImg, 'profile-pics');
    user.profilePicName = filename;
    await getRepository(User).save(user);
    return true;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext, @Arg('refreshToken') refreshToken: string): Promise<boolean> {
    const jwtToken = await getRepository(JwtToken).findOne({ where: { token: refreshToken } });
    if (!jwtToken) {
      return null;
    }
    await getRepository(JwtToken).remove(jwtToken);

    return true;
  }

  @Mutation(() => JwtResponse)
  public async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext,
  ): Promise<JwtResponse | null> {
    const user = await getRepository(User).findOne({ where: { email }, relations: ['roles'] });
    if (!user) {
      throw Error('found no user with this email');
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      throw Error('wrong email or password');
    }
    log.info(`user with the id: ${user.id} logged in`);
    const jwtUser: JwtUser = {
      id: user.id,
      email: user.email,
      role: 'Admin',
    };

    const refreshToken = generateRefreshToken(jwtUser);

    const token = new JwtToken(refreshToken, user.id);
    await getRepository(JwtToken).save(token);

    const accessToken = generateAccessToken(jwtUser);

    const response = new JwtResponse(accessToken, refreshToken);

    return response;
  }

  @Authorized()
  @Mutation(() => User)
  async uploadProfileImage(@Ctx() ctx: MyContext, @Arg('file', () => GraphQLUpload) file: FileUpload): Promise<User> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: id }, relations: ['following', 'followers'] });
    if (!user) {
      return null;
    }

    const newFileName = await uploadFileGraphql(file, 'profile-pics');
    user.profilePicName = newFileName;

    await getRepository(User).save(user);
    return user;
  }

  @Authorized()
  @Mutation(() => User)
  async addFollower(@Ctx() ctx: MyContext, @Arg('userID') userID: string): Promise<User | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }
    const user = await getRepository(User).findOne({ where: { id: id }, relations: ['following', 'followers'] });
    if (!user) {
      return null;
    }
    const follower = await getRepository(User).findOne({
      where: { id: userID },
      relations: ['following', 'followers'],
    });
    if (!follower) {
      return null;
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

    return user;
  }

  @Authorized()
  @Mutation(() => User)
  async removeFollower(@Ctx() ctx: MyContext, @Arg('userID') userID: string): Promise<User | null> {
    const id = ctx.req.user.id;
    if (!id) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: id }, relations: ['following', 'followers'] });
    if (!user) {
      return null;
    }

    _.remove(user.following, {
      id: userID,
    });

    await getRepository(User).save(user);
    log.info(`user with the id ${user.id} unfollowed ${userID}`);
    return user;
  }

  @Authorized()
  @Mutation(() => User)
  async setBio(@Ctx() ctx: MyContext, @Arg('bio') bio: string): Promise<User | null> {
    const userID = ctx.req.user.id;

    if (!userID) return null;
    const userRepo = await getRepository(User);
    const user = await userRepo.findOne({ id: userID });
    user.bio = bio;

    await userRepo.save(user);
    log.info(`user with the id ${user.id} updated the bio`);
    return user;
  }

  @Authorized()
  @Query(() => User)
  async userById(@Ctx() ctx: MyContext, @Arg('userId') userId: string): Promise<User | null> {
    const user = await getRepository(User).findOne({ where: { id: userId }, relations: ['following', 'followers'] });
    if (!user) {
      throw Error('no user found');
    }

    //could be a bad idea .. maybe better to do via db
    const followState = user.followers.some((user) => user.id === userId);
    user.meFollowing = followState;

    return user;
  }

  @Authorized()
  @Query(() => User)
  async userByUsername(@Ctx() ctx: MyContext, @Arg('username') username: string): Promise<User | null> {
    const userId = ctx.req.user.id;
    const user = await getRepository(User).findOne({
      where: { username: username },
      relations: ['following', 'followers'],
    });

    //could be a bad idea .. maybe better to do via db

    if (!user) {
      throw Error('no user found');
    }

    const followState = user.followers.some((user) => user.id === userId);
    user.meFollowing = followState;
    return user;
  }

  @Authorized()
  @Query(() => [User])
  async following(
    @Arg('userId') userId: string,
    @Arg('skip') skip: number,
    @Arg('take') take: number,
  ): Promise<User[]> {
    const following = await getRepository(User)
      .createQueryBuilder('following')
      .innerJoin('following.followers', 'followers')
      .where('followers.id = :id', { id: userId })
      .skip(skip)
      .take(take)
      .getMany();

    return following;
  }

  @Authorized()
  @Query(() => [User])
  async followers(
    @Arg('userId') userId: string,
    @Arg('skip') skip: number,
    @Arg('take') take: number,
  ): Promise<User[]> {
    const followers = await getRepository(User)
      .createQueryBuilder('followers')
      .innerJoin('followers.following', 'following')
      .where('following.id = :id', { id: userId })
      .skip(skip)
      .take(take)
      .getMany();

    return followers;
  }

  @Authorized()
  @Query(() => UserStats)
  async userStats(@Arg('userId') userId: string): Promise<UserStats> {
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
      },
      relations: ['user'],
    });

    const userStats = new UserStats(postCount, followerCount, followingCount);

    return userStats;
  }
}
