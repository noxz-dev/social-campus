/* eslint-disable @typescript-eslint/no-unused-vars */
import { Media } from '../entity/media.entity';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Post } from '../entity/post.entity';
import { MyContext } from '../utils/interfaces/interfaces';
import { isMemberOfGroup } from './group.resolver';

@Resolver(() => Media)
export class MediaResolver {
  @Authorized()
  @Query(() => [Media])
  async mediaFromGroup(@Ctx() ctx: MyContext, @Arg('groupId') groupId: string): Promise<Media[]> {
    const userId = ctx.req.user.id;

    if (!(await isMemberOfGroup(groupId, userId))) throw new Error('youre not a member of this group');

    const posts = await getRepository(Post).find({
      where: { group: { id: groupId } },
      order: { createdAt: 'DESC' },
    });

    if (!posts) return [];

    const postsWithMedia = posts.filter((p) => p.media !== null);
    return postsWithMedia.map((p) => p.media);
  }
}
