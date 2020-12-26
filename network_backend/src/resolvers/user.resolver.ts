/* eslint-disable @typescript-eslint/no-unused-vars */
import argon2 from 'argon2';
import { createWriteStream, unlink } from 'fs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import _ from 'lodash';
import os from 'os';
import path from 'path';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { JwtToken } from '../entity/jwtToken.entity';
import { User } from '../entity/user.entity';
import { JwtResponse } from '../graphql_types/jwtResponse';
import { generateAccessToken, generateRefreshToken } from '../utils/helpers/auth';
import { MyContext } from '../utils/interfaces/context.interface';
import { JwtUser } from '../utils/interfaces/jwtUser';
import { log } from '../utils/services/logger';
import { minioClient } from '../utils/services/minio';
import { UserValidator } from '../validators/user.validator';

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

  @Mutation(() => User)
  public async register(@Arg('input') input: UserValidator, @Ctx() ctx: MyContext): Promise<User | null> {
    const hashedPassword = await argon2.hash(input.password);
    const user = new User(input, hashedPassword);
    user.followers = [];
    user.following = [];
    await getRepository(User).save(user);
    return user;
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
  ): Promise<JwtResponse> {
    const user = await getRepository(User).findOne({ where: { email }, relations: ['roles'] });
    if (!user) {
      return null;
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return null;
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

    const metaData = {
      'Content-Type': 'application/octet-stream',
      'X-Amz-Meta-Testing': 1234,
      example: 5678,
    };
    const filenameUUID = uuidv4();
    const { createReadStream, filename } = await file;

    const fileEnding = filename.split('.')[1];
    const newFileName = filenameUUID + '.' + fileEnding;
    const destinationPath = path.join(os.tmpdir(), filename);
    await new Promise((res, rej) =>
      createReadStream()
        .pipe(createWriteStream(destinationPath))
        .on('error', rej)
        .on('finish', () => {
          minioClient.fPutObject('profile-pics', newFileName, destinationPath, metaData, (err, etag) => {
            if (err) {
              log.error(err.stack);
              throw Error('image upload failed');
            }
            log.info('File uploaded successfully.');

            //Delete the tmp file uploaded
            unlink(destinationPath, () => {
              res('file upload complete');
            });
          });
        }),
    );

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
    user.following.push(follower);

    const userRepo = await getRepository(User);

    userRepo.save(user);

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

    return user;
  }
}
