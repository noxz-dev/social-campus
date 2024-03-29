import { isUUID } from 'class-validator';
import { Arg, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root, Subscription } from 'type-graphql';
import { EntityManager, getConnection, getManager, getRepository, ILike, In, IsNull } from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { Group, GroupType } from '../entity/group.entity';
import { Like } from '../entity/like.entity';
import { Media, MediaType } from '../entity/media.entity';
import { NotificationType } from '../entity/notification.entity';
import { Post } from '../entity/post.entity';
import { Tag } from '../entity/tag.entity';
import { User } from '../entity/user.entity';
import { uploadFileGraphql } from '../utils/helpers/fileUpload';
import { queryWithRelations } from '../utils/helpers/utils';
import { MyContext } from '../utils/interfaces/interfaces';
import { log } from '../utils/services/logger';
import { AddPostInput } from '../validators/addPost.validator';
import { EditPostInput } from '../validators/editPost.validator';
import { isMemberOfGroup } from './group.resolver';
import { notify, SUB_TOPICS } from './notification.resolver';

export interface NewPostPayload {
  post?: Post;
}

/**
 * Resolver for the post type
 */
@Resolver(() => Post)
export class PostResolver {
  /**
   * query to get all posts from a user by id
   */
  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'getPosts returns all posts for a given userID',
  })
  public async getPostsFromUser(
    @Ctx() ctx: MyContext,
    @Arg('userID', () => String) userID: string,
    @Arg('offset', () => Number) offset: number,
    @Arg('limit', () => Number) limit: number,
  ): Promise<Post[] | null> {
    const userId = ctx.req.user.id;
    if (!userId) throw Error('auth error');

    const posts = await getRepository(Post).find({
      relations: ['comments', 'user', 'likes', 'likes.user'],
      where: { user: { id: userID }, group: null },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
    if (!posts) {
      return null;
    }

    return posts;
  }

  /**
   * discover posts query
   */
  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'returns all posts that are not associated with groups, allows to be filterd via tags',
  })
  public async browsePosts(
    @Ctx() ctx: MyContext,
    @Arg('skip', () => Number) skip: number,
    @Arg('take', () => Number) take: number,
    @Arg('tags', () => [String], { nullable: true }) tags: string[],
    @Arg('searchString', () => String, { nullable: true }) searchString: string,
  ): Promise<Post[]> {
    const userId = ctx.req.user.id;
    if (!userId) throw new Error('no user found');
    let posts: Post[];

    if (searchString && searchString.length > 0) {
      // search posts with fulltext search ... could be heavy and should maybe
      // be exhanged with something like elastic search
      //uses like operator because the ts_vector + query were not working properly
      posts = await getRepository(Post).find({
        where: {
          group: null,
          text: ILike(`%${searchString}%`),
        },
        order: {
          createdAt: 'DESC',
        },
        relations: ['user', 'tags'],
        skip: skip,
        take: take,
      });
    } else if (tags && tags.length > 0) {
      //find posts with tags
      posts = await getRepository(Post)
        .createQueryBuilder('posts')
        .where('posts.group is null')
        .leftJoinAndSelect('posts.media', 'media')
        .leftJoinAndSelect('posts.user', 'user')
        .leftJoinAndSelect('user.avatar', 'avatar')
        .leftJoinAndSelect('posts.tags', 'tags')
        .andWhere('lower(tags.name) IN (:...tags)', { tags: tags.map((t) => t.toLowerCase()) })
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
        .leftJoinAndSelect('post.media', 'media')
        .where('post.id = :id', { id: post.id })
        .getMany();

      post.tags = tagsFromPost;
    }

    log.info(`'User with the id: ${userId} called browsePosts'`);
    return posts;
  }

  /**
   * Get all posts from an group
   */
  @Authorized()
  @Query(() => [Post], {
    nullable: true,
    description: 'getPostsFromGroup returns all posts from a group',
  })
  public async getPostsFromGroup(
    @Ctx() ctx: MyContext,
    @Arg('offset', () => Number) offset: number,
    @Arg('limit', () => Number) limit: number,
    @Arg('groupId', () => String) groupId: string,
  ): Promise<Post[] | null> {
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
      take: limit,
      skip: offset,
      where: { group: { id: groupId } },
      order: { createdAt: 'DESC' },
    });
    if (!posts) {
      return null;
    }

    log.info(`'User with the id: ${userId} called getPostsFromGroup'`);
    return posts;
  }

  /**
   * Home - Feed query
   */
  @Authorized()
  @Query(() => [Post], { description: 'returns the post feed of user' })
  public async getFeed(
    @Ctx() ctx: MyContext,
    @Arg('offset', () => Number) offset: number,
    @Arg('limit', () => Number) limit: number,
  ): Promise<Post[] | null> {
    const userId = ctx.req.user.id;

    const repo = await getRepository(User);
    const user = await queryWithRelations(userId, repo, 'user', ['following', 'groups']);
    const following = user.following.map((user: User) => user.id);
    const userGroups = user.groups.map((group) => group.id);

    // push own user id to see also your own posts
    following.push(userId);

    //fetch all posts from the users you follow and groups
    const posts = await getRepository(Post).find({
      where: [
        { user: In(following), group: In(userGroups) },
        { user: In(following), group: IsNull() },
        { group: In(userGroups) },
      ],
      order: { createdAt: 'DESC' },
      relations: ['user', 'group', 'likes', 'likes.user'],
      skip: offset,
      take: limit,
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
    log.info(`'User with the id: ${userId} called getFeed'`);
    return feedPosts;
  }

  /**
   * Get a Post with theire comments
   */
  @Authorized()
  @Query(() => Post, { description: 'returns a specific post' })
  public async postById(@Ctx() ctx: MyContext, @Arg('postId', () => String) postId: string): Promise<Post | null> {
    const userId = ctx.req.user.id;

    if (!isUUID(postId, 4)) throw new Error('given postId ist not a valid uuid');

    const post = await getRepository(Post)
      .createQueryBuilder('post')
      .where('post.id = :id', { id: postId })
      .leftJoinAndSelect('post.media', 'media')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('post.group', 'group')
      .orderBy({
        'comments.createdAt': 'DESC',
      })
      .leftJoinAndSelect('comments.user', 'commentUser')
      .leftJoinAndSelect('commentUser.avatar', 'commentUserAvatar')
      .getOne();

    if (!post) throw new Error('Post not found!');

    //check if member of the group to restrict interaction
    if (post.group) {
      const isMember = await isMemberOfGroup(post.group.id, userId);
      if (!isMember && post.group.type === GroupType.PRIVATE) {
        throw new Error('youre not allowed to interact with this post');
      }
    }

    log.info(`'User with the id: ${userId} called postById'`);
    return post;
  }

  /**
   * create a new post
   */
  @Authorized()
  @Mutation(() => Post, { description: 'addPost creates a new Post and pushes updates to all followers' })
  public async addPost(@Ctx() ctx: MyContext, @Arg('input', () => AddPostInput) input: AddPostInput): Promise<Post> {
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
    if (input.groupId) {
      group = await getRepository(Group).findOne({ where: { id: input.groupId }, relations: ['members'] });

      //check if the user is allowed to post content for the group
      const user = group.members.find((member) => member.id === id);
      if (!user) throw Error('youre not allowed to create content for this group');
    }
    const post = new Post();
    post.text = input.content;
    post.user = user;
    post.likes = [];
    post.tags = [];
    post.group = group;
    user.posts.push(post);

    if (input.tags) {
      const postTags = await createTags(user, input.tags, getConnection().createEntityManager());
      post.tags = [...postTags];
    }

    if (input.image) {
      //upload file to s3
      const { filename, blurhash } = await uploadFileGraphql(input.image, 'images');

      const media = new Media();
      media.blurhash = blurhash;
      media.name = filename;
      media.type = MediaType.IMAGE;
      const savedMedia = await getRepository(Media).save(media);
      post.media = savedMedia;
    }

    if (input.file) {
      //upload file to s3
      const { filename } = await uploadFileGraphql(input.file, 'images');

      const media = new Media();
      media.name = filename;
      media.type = MediaType.FILE;
      const savedMedia = await getRepository(Media).save(media);
      post.media = savedMedia;
    }

    if (input.groupId && !group) {
      throw new Error('group does not exist');
    }

    const dbPost = await getRepository(Post).save(post);
    await getRepository(User).save(user);

    dbPost.likesCount = 0;
    dbPost.commentCount = 0;
    dbPost.liked = false;

    if (input.content.match(/@[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g) !== null) {
      for await (const mention of input.content.match(/@[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g)) {
        const toUser = await getRepository(User).findOne({ where: { username: mention.substring(1) } });
        if (group) {
          const foundUser = group.members.find((member) => member.id === toUser.id);
          if (!foundUser) continue;
        }
        if (!toUser) continue;

        //send notification
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

    post.user.posts = post.user.posts.filter((p) => p.id !== dbPost.id);

    //trigger subscription
    await ctx.req.pubsub.publish(SUB_TOPICS.NEW_POST, { post: dbPost, userId: id });
    log.info(`'User with the id: ${id} added a new post'`);
    return dbPost;
  }

  /**
   * new post subscription
   */
  @Subscription(() => Post, {
    topics: SUB_TOPICS.NEW_POST,
    description: 'subscribe to new posts',
    filter: async ({ payload, args, context }) => {
      if (args.all) return true;
      if (args.groupId) {
        const group = await getRepository(Group).findOne({ where: { id: args.groupId }, relations: ['members'] });
        const ids = group.members.map((m) => m.id);

        return ids.includes(context.user.id);
      }

      const user = await getRepository(User).findOne({
        where: {
          id: payload.userId,
        },
        relations: ['followers'],
      });

      //add user to auto update to also the same user on two devices
      user.followers.push(user);

      const ids = user.followers.map((u) => u.id);
      return ids.includes(context.user.id);
    },
  })
  public async newPost(
    @Ctx() ctx: MyContext,
    @Root() payload: NewPostPayload,
    @Arg('all', () => Boolean) all: boolean,
    @Arg('groupId', () => String, { nullable: true }) groupId: string,
  ): Promise<Post> {
    log.info('new post subscription fired');
    payload.post.createdAt = new Date(payload.post.createdAt);

    return payload.post;
  }

  /**
   * add an like to a post
   */
  @Authorized()
  @Mutation(() => Post, { description: 'likes an post' })
  public async likePost(@Ctx() ctx: MyContext, @Arg('postID', () => String) postID: string): Promise<Post | null> {
    const userId = ctx.req.user.id;
    if (!userId) throw new Error('youre not authenticated');

    const user = await getRepository(User).findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found!');

    const post = await getRepository(Post).findOne({
      relations: [
        'comments',
        'user',
        'likes',
        'likes.user',
        'comments.user',
        'comments.likes',
        'comments.likes.user',
        'group',
      ],
      where: { id: postID },
    });
    if (!post) throw new Error('Post not found!');

    //check if the post is associated with a group and enforce permission check
    if (post.group && !(await isMemberOfGroup(post.group.id, userId))) {
      throw new Error('youre not allowed to interact with this content');
    }

    for (const like of post.likes) {
      if (userId === like.user.id) throw new Error('you already liked this post');
    }

    const like = new Like();
    like.user = user;

    post.likes.push(like);
    await getRepository(Like).save(like);
    await getRepository(Post).save(post);

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

  /**
   * remove a like from a post
   */
  @Authorized()
  @Mutation(() => Post, { description: 'unlikes an post' })
  public async unlikePost(@Ctx() ctx: MyContext, @Arg('postID', () => String) postID: string): Promise<Post | null> {
    const userId = ctx.req.user.id;
    if (!userId) throw new Error('youre not authenticated');

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
        'group',
      ],
      where: { id: postID },
    });
    if (!post) throw new Error('Post not found!');

    if (post.group && !(await isMemberOfGroup(post.group.id, userId))) {
      throw new Error('youre not allowed to interact with this content');
    }

    post.likes = post.likes.filter((like) => like.user.id !== userId);
    const like = await getRepository(Like).findOne({ where: { post: postID, user: userId } });
    await getRepository(Like).delete(like);
    await getRepository(Post).save(post);

    log.info(`user with the id ${userId} unliked the post ${postID}`);
    post.likesCount = await countLikes(post.id);
    return post;
  }

  /**
   * delete a post
   */
  @Authorized()
  @Mutation(() => Boolean, { description: 'deletes an post' })
  public async deletePost(@Ctx() ctx: MyContext, @Arg('postId', () => String) postId: string): Promise<boolean | null> {
    const userId = ctx.req.user.id;
    if (!userId) {
      return null;
    }
    const post = await getRepository(Post).findOne({ where: { id: postId }, relations: ['user'] });
    if (!post) throw Error('post not found');
    if (post.user.id === userId) {
      delete post.likesCount;
      delete post.commentCount;
      await getRepository(Post).delete(post);
      log.info(`user with the id ${userId} deleted the post ${postId}`);
      return true;
    }
    throw Error('youre not allowed to do that');
  }

  /**
   * edit the post text
   */
  @Authorized()
  @Mutation(() => Post, { description: 'updates the content of a post' })
  public async editPost(
    @Ctx() ctx: MyContext,
    @Arg('input', () => EditPostInput) { content, postId }: EditPostInput,
  ): Promise<Post> {
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
      savedPost.likesCount = await countLikes(postId);
      savedPost.commentCount = await countComments(postId);
      await ctx.req.pubsub.publish(SUB_TOPICS.NEW_POST, { post: savedPost, userId: userId });
      return savedPost;
    }
    throw Error('youre not allowed to do that');
  }

  //FIELD RESOLVERS

  @FieldResolver()
  async liked(@Ctx() ctx: MyContext, @Root() post: Post): Promise<boolean> {
    if (!ctx.req?.user) return false;
    const userId = ctx.req.user.id;
    return await checkLikeState(userId, post.id);
  }

  @FieldResolver()
  async user(@Root() post: Post): Promise<User> {
    const p = await getRepository(Post).findOne({ where: { id: post.id }, relations: ['user'] });
    return p.user;
  }

  @FieldResolver()
  async likesCount(@Root() post: Post): Promise<number> {
    return await countLikes(post.id);
  }

  @FieldResolver()
  async commentCount(@Root() post: Post): Promise<number> {
    return await countComments(post.id);
  }

  @FieldResolver()
  async group(@Root() post: Post): Promise<Group> {
    if (post.group) return post.group;
    const p = await getRepository(Post).findOne({ where: { id: post.id }, relations: ['group'] });
    return p.group;
  }

  @FieldResolver()
  async media(@Root() post: Post): Promise<Media> {
    const p = await getRepository(Post).findOne({ where: { id: post.id }, relations: ['media'] });
    return p.media;
  }

  @FieldResolver()
  async tags(@Root() post: Post): Promise<Tag[]> {
    const p = await getRepository(Post).findOne({ where: { id: post.id }, relations: ['tags'] });
    return p.tags;
  }

  @FieldResolver()
  async comments(@Root() post: Post): Promise<Comment[]> {
    const p = await getRepository(Post).findOne({ where: { id: post.id }, relations: ['comments'] });
    return p.comments.sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0));
  }

  @FieldResolver()
  async likes(@Root() post: Post): Promise<Like[]> {
    const p = await getRepository(Post).findOne({ where: { id: post.id }, relations: ['likes'] });
    return p.likes;
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
  let tags = text.match(/#[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g);
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
 * @returns Tag array
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
