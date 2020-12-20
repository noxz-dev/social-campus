/* eslint-disable @typescript-eslint/no-unused-vars */
import argon2 from 'argon2';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { JwtToken } from '../entity/jwtToken.entity';
import { User } from '../entity/user.entity';
import { JwtResponse } from '../graphql_types/jwtResponse';
import { generateAccessToken, generateRefreshToken } from '../utils/helpers/auth';
import { MyContext } from '../utils/interfaces/context.interface';
import { JwtUser } from '../utils/interfaces/JwtUser';
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

    const user = getRepository(User).findOne({ relations: ['roles'], where: { id } });
    if (!user) {
      return null;
    }
    return user;
  }

  @Mutation(() => User)
  public async register(@Arg('input') input: UserValidator, @Ctx() ctx: MyContext): Promise<User | null> {
    const hashedPassword = await argon2.hash(input.password);
    const user = new User(input, hashedPassword);
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

  // @Mutation(() => Boolean)
  // public async confirmUser(@Arg('token') token: string, @Ctx() ctx: MyContext): Promise<boolean> {
  //   const userToken = await getRepository(Token).findOne({ token: `confirm:${token}` });

  //   if (!userToken) {
  //     return null;
  //   }

  //   const user = await ctx.em.getRepository(User).findOneOrFail({ id: userToken.userId });

  //   user.confirmed = true;

  //   await ctx.em.getRepository(Token).remove(userToken);
  //   await ctx.em.flush();
  //   return user.confirmed;
  // }

  // @Mutation(() => Boolean)
  // public async forgotPassword(@Arg('email') email: string, @Ctx() ctx: MyContext): Promise<boolean> {
  //   const user = await ctx.em.getRepository(User).findOne({ email });

  //   if (!user) {
  //     return false;
  //   }

  //   const changePasswordUrl = await createTokenUrl({
  //     user,
  //     type: 'change-password',
  //     ctx,
  //   });

  //   await sendEmail({
  //     email,
  //     subject: '🔑  Dont worry, set your new password now.',
  //     html: `To reset your password, <a href="${changePasswordUrl}">click here</a>`,
  //   });

  //   return true;
  // }

  // @Mutation(() => User)
  // public async changePassword(
  //   @Arg('password') password: string,
  //   @Arg('token') token: string,
  //   @Ctx() ctx: MyContext,
  // ): Promise<User | null> {
  //   const userToken = await ctx.em.getRepository(Token).findOne({ token: `change-password:${token}` });

  //   if (!userToken) {
  //     return null;
  //   }

  //   const user = await ctx.em.getRepository(User).findOneOrFail({ id: userToken.userId });

  //   user.password = await argon2.hash(password);
  //   await ctx.em.getRepository(Token).remove(userToken);
  //   await ctx.em.flush();

  //   return user;
  // }
}
