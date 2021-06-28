/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { GroupMedia, Media } from '../entity/media.entity';
import { Post } from '../entity/post.entity';
import { MyContext } from '../utils/interfaces/interfaces';
import { isMemberOfGroup } from './group.resolver';

@Resolver(() => Media)
export class MediaResolver {
  /**
   * Get all the Media from posts in a group
   */
  @Authorized()
  @Query(() => [GroupMedia])
  async mediaFromGroup(@Ctx() ctx: MyContext, @Arg('groupId') groupId: string): Promise<GroupMedia[]> {
    const userId = ctx.req.user.id;

    //check if a user is allowed to access this information
    if (!(await isMemberOfGroup(groupId, userId))) throw new Error('youre not a member of this group');

    const posts = await getRepository(Post).find({
      where: { group: { id: groupId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    if (!posts) return [];

    const postsWithMedia = posts.filter((p) => p.media !== null);
    return postsWithMedia.map((p) => {
      return new GroupMedia(p.media, p.user.firstname + ' ' + p.user.lastname);
    });
  }
}
