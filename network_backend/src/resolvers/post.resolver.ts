import { isUUID } from 'class-validator';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { EntityManager, getConnection, getManager, getRepository, In, IsNull } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { Group } from '../entity/group.entity';
import { Like } from '../entity/like.entity';
import { NotificationType } from '../entity/notification.entity';
import { Post } from '../entity/post.entity';
import { Tag } from '../entity/tag.entity';
import { User } from '../entity/user.entity';
import { uploadFileGraphql } from '../utils/helpers/fileUpload';
import { MyContext } from '../utils/interfaces/context.interface';
import { log } from '../utils/services/logger';
import { AddPostInput } from '../validators/addPost.validator';
import { EditPostInput } from '../validators/editPost.validator';
import { notify, SUB_TOPICS } from './notification.resolver';

export interface NewPostPayload {
  post?: Post;
}

@Resolver(() => Post)
export class PostResolver {
  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'getPosts returns all posts for a given userID',
  })
  public async getPostsFromUser(
    @Ctx() ctx: MyContext,
    @Arg('userID') userID: string,
    @Arg('skip') skip: number,
    @Arg('take') take: number,
  ): Promise<Post[] | null> {
    const userId = ctx.req.user.id;
    if (!userId) throw Error('auth error');

    const posts = await getRepository(Post).find({
      relations: [
        'comments',
        'user',
        'likes',
        'likes.user',
        'user.followers',
        'user.following',
        'comments.user',
        'comments.likes',
        'comments.likes.user',
      ],
      where: { user: { id: userID } },
      order: { createdAt: 'DESC' },
      take: take,
      skip: skip,
    });
    if (!posts) {
      return null;
    }

    for await (const post of posts) {
      const likeState = await checkLikeState(userId, post.id);
      post.liked = likeState;
    }

    return posts;
  }

  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'returns all posts that are not associated with groups, allows to be filterd via tags',
  })
  public async browsePosts(
    @Ctx() ctx: MyContext,
    @Arg('skip') skip: number,
    @Arg('take') take: number,
    @Arg('tags', () => [String], { nullable: true }) tags: string[],
  ): Promise<Post[]> {
    const userId = ctx.req.user.id;
    if (!userId) throw new Error('no user found');
    let posts: Post[];
    if (tags && tags.length > 0) {
      posts = await getRepository(Post)
        .createQueryBuilder('posts')
        .where('posts.group = :group', { group: null })
        .leftJoinAndSelect('posts.user', 'user')
        .leftJoinAndSelect('posts.tags', 'tags')
        .where('lower(tags.name) IN (:...tags)', { tags: tags.map((t) => t.toLowerCase()) })
        .orderBy('posts.createdAt', 'DESC')
        .skip(skip)
        .take(take)
        .getMany();
    } else {
      posts = await getRepository(Post).find({
        where: {
          group: null,
        },
        order: {
          createdAt: 'DESC',
        },
        relations: ['user', 'tags'],
        skip: skip,
        take: take,
      });
    }

    if (!posts) {
      return [];
    }

    //add all tags to the post.. its need based on the restriction of left join
    for await (const post of posts) {
      const tagsFromPost = await getRepository(Tag)
        .createQueryBuilder('tags')
        .leftJoin('tags.posts', 'post')
        .where('post.id = :id', { id: post.id })
        .getMany();

      post.tags = tagsFromPost;
    }

    for await (const post of posts) {
      const likeState = await checkLikeState(userId, post.id);
      post.liked = likeState;
    }
    log.info(`'User with the id: ${userId} called browsePosts'`);
    return posts;
  }

  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'getPostsFromGroup returns all posts from a group',
  })
  public async getPostsFromGroup(@Ctx() ctx: MyContext, @Arg('groupId') groupId: string): Promise<Post[] | null> {
    const userId = ctx.req.user.id;
    if (!userId) return null;
    const posts = await getRepository(Post).find({
      relations: [
        'comments',
        'user',
        'likes',
        'likes.user',
        'user.followers',
        'user.following',
        'comments.user',
        'comments.likes',
        'comments.likes.user',
      ],
      where: { group: { id: groupId } },
      order: { createdAt: 'DESC' },
    });
    if (!posts) {
      return null;
    }

    for await (const post of posts) {
      const likeState = await checkLikeState(userId, post.id);
      post.liked = likeState;
    }

    log.info(`'User with the id: ${userId} called getPostsFromGroup'`);
    return posts;
  }

  @Authorized()
  @Query(() => [Post], { description: 'returns the post feed of user' })
  public async getFeed(
    @Ctx() ctx: MyContext,
    @Arg('skip') skip: number,
    @Arg('take') take: number,
  ): Promise<Post[] | null> {
    const userId = ctx.req.user.id;

    const user = await getRepository(User).findOne({
      where: { id: userId },
      relations: ['following', 'groups'],
    });

    const following = user.following.map((user: User) => user.id);
    const userGroups = user.groups.map((group) => group.id);

    // push own user id to see also your own posts
    following.push(userId);

    //fetch all posts from the users you follow
    const posts = await getRepository(Post).find({
      where: [
        { user: In(following), group: In(userGroups) },
        { user: In(following), group: IsNull() },
      ],
      order: { createdAt: 'DESC' },
      relations: ['user', 'comments', 'group'],
      skip,
      take,
    });

    if (!posts) return [];

    const feedPosts = posts.filter((p) => {
      if (p.group) {
        if (userGroups.includes(p.group.id)) {
          return p;
        }
      } else {
        return p;
      }
    });

    for await (const post of feedPosts) {
      const likeState = await checkLikeState(userId, post.id);
      post.liked = likeState;
    }

    log.info(`'User with the id: ${userId} called getFeed'`);
    return feedPosts;
  }

  @Authorized()
  @Query(() => Post, { description: 'returns a specific post' })
  public async postById(@Ctx() ctx: MyContext, @Arg('postId') postId: string): Promise<Post | null> {
    const userId = ctx.req.user.id;

    if (!isUUID(postId, 4)) throw new Error('given postId ist not a valid uuid');

    const post = await getRepository(Post)
      .createQueryBuilder('post')
      .where('post.id = :id', { id: postId })
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.comments', 'comments')
      .orderBy({
        'comments.createdAt': 'DESC',
      })
      .leftJoinAndSelect('comments.user', 'user.comments')
      .getOne();

    if (!post) return null;

    const likeState = await checkLikeState(userId, post.id);
    post.liked = likeState;
    log.info(`'User with the id: ${userId} called postById'`);
    return post;
  }

  @Authorized()
  @Mutation(() => Post, { description: 'addPost creates a new Post and pushes updates to all followers' })
  public async addPost(
    @Ctx() ctx: MyContext,
    @Arg('input') { content, file, groupId, tags }: AddPostInput,
  ): Promise<Post> {
    const id = ctx.req.user.id;
    if (!id) {
      throw new Error('not authenticated');
    }

    const user = await getRepository(User).findOne({
      relations: ['posts', 'posts.comments', 'posts.user', 'posts.group', 'posts.likes', 'posts.likes.user'],
      where: { id: ctx.req.user.id },
    });
    if (!user) {
      throw new Error('no user found');
    }

    let group: Group;
    if (groupId) {
      group = await getRepository(Group).findOne({ where: { id: groupId }, relations: ['members'] });
      const user = group.members.find((member) => member.id === id);
      if (!user) throw Error('youre not allowed to create content for this group');
    }
    const post = new Post();
    post.text = content;
    post.user = user;
    post.likes = [];
    post.tags = [];
    post.group = group;
    user.posts.push(post);

    if (tags) {
      const postTags = await createTags(user, tags, getConnection().createEntityManager());
      post.tags = [...postTags];
    }

    if (file) {
      const newFileName = await uploadFileGraphql(file, 'post-images');
      post.imageName = newFileName;
    }
    if (groupId && !group) {
      throw new Error('group does not exist');
    }

    const dbPost = await getRepository(Post).save(post);
    await getRepository(User).save(user);

    dbPost.likesCount = 0;
    dbPost.commentCount = 0;
    dbPost.liked = false;

    if (content.match(/@[a-zA-ZäöüÄÖÜß]*/g) !== null) {
      for await (const mention of content.match(/@[a-zA-ZäöüÄÖÜß]*/g)) {
        const toUser = await getRepository(User).findOne({ where: { username: mention.substring(1) } });
        if (!toUser) return;
        await notify(
          {
            type: NotificationType.MENTION,
            message: `${user.firstname} hat dich in einem Post erwähnt`,
            toUser: toUser,
            fromUser: user,
            post: dbPost,
          },
          ctx,
        );
      }
    }

    await ctx.req.pubsub.publish(SUB_TOPICS.NEW_POST, { post: dbPost, userId: id });
    log.info(`'User with the id: ${id} added a new post'`);
    return dbPost;
  }

  @Subscription(() => Post, {
    topics: SUB_TOPICS.NEW_POST,
    description: 'subscribe to new posts',
    filter: async ({ payload, args }) => {
      if (args.all) return true;
      if (args.groupId) {
        const group = await getRepository(Group).findOne({ where: { id: args.groupId }, relations: ['members'] });
        const ids = group.members.map((m) => m.id);

        return ids.includes(args.userId);
      }
      const user = await getRepository(User).findOne({
        where: {
          id: payload.userId,
        },
        relations: ['followers'],
      });
      //add user to auto update also the same user on two devices
      user.followers.push(user);

      const ids = user.followers.map((u) => u.id);
      return ids.includes(args.userId);
    },
  })
  public async newPost(
    @Ctx() ctx: MyContext,
    @Root() payload: NewPostPayload,
    @Arg('userId') userId: string,
    @Arg('all') all: boolean,
    @Arg('groupId', { nullable: true }) groupId: string,
  ): Promise<Post> {
    log.info('new post subscription fired');
    return payload.post;
  }

  @Authorized()
  @Mutation(() => Post, { description: 'likes an post' })
  public async likePost(@Ctx() ctx: MyContext, @Arg('postID') postID: string): Promise<Post | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    const post = await getRepository(Post).findOne({
      relations: ['comments', 'user', 'likes', 'likes.user', 'comments.user', 'comments.likes', 'comments.likes.user'],
      where: { id: postID },
    });
    if (!post) {
      return null;
    }
    for (const like of post.likes) {
      if (userId === like.user.id) throw new Error('you already liked this post');
    }

    const like = new Like();
    like.user = user;

    post.likes.push(like);
    await getRepository(Like).save(like);
    await getRepository(Post).save(post);

    const likeState = await checkLikeState(userId, post.id);
    post.liked = likeState;
    log.info(`user with the id ${userId} liked the post ${postID}`);
    post.likesCount = await countLikes(post.id);
    await notify(
      {
        type: NotificationType.POST_LIKE,
        message: `${user.firstname} gefällt dein Post`,
        toUser: post.user,
        fromUser: user,
        post: post,
      },
      ctx,
    );
    return post;
  }

  @Authorized()
  @Mutation(() => Post, { description: 'unlikes an post' })
  public async unlikePost(@Ctx() ctx: MyContext, @Arg('postID') postID: string): Promise<Post | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const post = await getRepository(Post).findOne({
      relations: [
        'comments',
        'user',
        'likes',
        'likes.user',
        'likes.post',
        'comments.user',
        'comments.likes',
        'comments.likes.user',
      ],
      where: { id: postID },
    });
    if (!post) {
      return null;
    }

    post.likes = post.likes.filter((like) => like.user.id !== userId);
    const like = await getRepository(Like).findOne({ where: { post: postID, user: userId } });
    await getRepository(Like).delete(like);
    await getRepository(Post).save(post);

    const likeState = await checkLikeState(userId, post.id);
    post.liked = likeState;
    log.info(`user with the id ${userId} unliked the post ${postID}`);
    post.likesCount = await countLikes(post.id);
    return post;
  }

  @Authorized()
  @Mutation(() => Boolean, { description: 'deletes an post' })
  public async deletePost(@Ctx() ctx: MyContext, @Arg('postId') postId: string): Promise<boolean | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }
    const post = await getRepository(Post).findOne({ where: { id: postId }, relations: ['user'] });
    if (!post) throw Error('post not found');
    if (post.user.id === userId) {
      delete post.likesCount;
      delete post.commentCount;
      if (post.imageLink) delete post.imageLink;
      await getRepository(Post).delete(post);
      log.info(`user with the id ${userId} deleted the post ${postId}`);
      return true;
    }
    throw Error('youre not allowed to do that');
  }

  @Authorized()
  @Mutation(() => Post, { description: 'updates the content of a post' })
  public async editPost(@Ctx() ctx: MyContext, @Arg('input') { content, postId }: EditPostInput): Promise<Post> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }

    const user = await getRepository(User).findOne({
      where: {
        id: userId,
      },
    });
    const post = await getRepository(Post).findOne({ where: { id: postId }, relations: ['user', 'tags'] });
    if (!post) return null;
    if (post.user.id === userId) {
      delete post.likesCount;
      delete post.commentCount;
      post.text = content;
      post.edited = true;
      const savedPost = await getManager().transaction(async (transactionManager) => {
        const foundTagNames = extractTags(content);
        if (foundTagNames.length > 0) {
          const postTags = await createTags(user, foundTagNames, transactionManager);
          post.tags = [...postTags];
        }

        const savedPost = await transactionManager.save(Post, post);
        log.info(`user with the id ${userId} edited the post ${postId}`);
        return savedPost;
      });
      savedPost.liked = await checkLikeState(userId, postId);
      savedPost.likesCount = await countLikes(postId);
      savedPost.commentCount = await countComments(postId);
      await ctx.req.pubsub.publish(SUB_TOPICS.NEW_POST, { post: savedPost, userId: userId });
      return savedPost;
    }
    throw Error('youre not allowed to do that');
  }
}

/**
 * helper function to check if the user liked the post
 * @param userId string
 * @param postId string
 * @returns boolean
 */
const checkLikeState = async (userId: string, postId: string): Promise<boolean> => {
  const result = await getRepository(Like).findOne({ where: { user: userId, post: postId } });
  if (result) return true;
  return false;
};

/**
 * helper function to count all likes of a post
 * @param postId string
 * @returns number
 */
export const countLikes = async (postId: string): Promise<number> => {
  const { count } = await getRepository(Like)
    .createQueryBuilder('like')
    .where('like.post = :id', { id: postId })
    .select('COUNT(*)', 'count')
    .getRawOne();

  return count;
};

/**
 * helper function to count all comments
 * @param postId string
 * @returns number
 */
export const countComments = async (postId: string): Promise<number> => {
  const { count } = await getRepository(Comment)
    .createQueryBuilder('comment')
    .where('comment.post = :id', { id: postId })
    .select('COUNT(*)', 'count')
    .getRawOne();

  return count;
};

/**
 * extracts all tags from a given text
 * @param text string
 * @returns string[]
 */
const extractTags = (text: string): string[] => {
  let tags = text.match(/#[a-zA-ZäöüÄÖÜß]*/g);
  if (tags) {
    tags = tags?.map((tag) => tag.replace('#', ''));
    return tags;
  }
  return [];
};

/**
 *
 * creates all missing tags from the db and returns a list of all tags
 * @param user User
 * @param tags string[]
 * @param manager EntitiyManager
 * @returns Tag[]
 */
const createTags = async (user: User, tags: string[], manager: EntityManager): Promise<Tag[]> => {
  const postTags = [];
  const tagsFromDB = await getRepository(Tag).find({
    where: {
      name: In(tags),
    },
  });
  const tagNamesFromDb = tagsFromDB.map((tag) => tag.name);

  for await (const name of tags) {
    if (!tagNamesFromDb.includes(name)) {
      const tag = new Tag({ name: name, createdBy: user });
      tag.posts = [];
      const dbTag = await manager.save(Tag, tag);
      postTags.push(dbTag);
    } else {
      const tag = await getRepository(Tag).findOne({
        where: {
          name: name,
        },
        relations: ['posts'],
      });
      postTags.push(tag);
    }
  }

  return postTags;
};
