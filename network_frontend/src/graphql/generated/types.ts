export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  user: User;
  text: Scalars['String'];
  likes: Array<Like>;
  likesCount: Scalars['Float'];
};


export type Group = {
  __typename?: 'Group';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: GroupType;
  createdBy: User;
  posts: Array<Post>;
  members: Array<User>;
};

export enum GroupType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type JwtResponse = {
  __typename?: 'JwtResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteNotification: Scalars['Boolean'];
  addPost: Post;
  likePost: Post;
  unlikePost: Post;
  deletePost: Scalars['Boolean'];
  editPost: Post;
  addComment: Comment;
  likeComment: Comment;
  unlikeComment: Comment;
  createGroup: Group;
  joinGroup: Group;
  addRole: Role;
  removeRole: Scalars['Boolean'];
  assignRoleToUser: User;
  removeRoleFromUser: User;
  register: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  login: JwtResponse;
  uploadProfileImage: User;
  addFollower: User;
  removeFollower: User;
  setBio: User;
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['String'];
};


export type MutationAddPostArgs = {
  tags?: Maybe<Array<Scalars['String']>>;
  groupID?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['Upload']>;
  text: Scalars['String'];
};


export type MutationLikePostArgs = {
  postID: Scalars['String'];
};


export type MutationUnlikePostArgs = {
  postID: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationEditPostArgs = {
  text: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationAddCommentArgs = {
  postID: Scalars['String'];
  text: Scalars['String'];
};


export type MutationLikeCommentArgs = {
  commentID: Scalars['String'];
};


export type MutationUnlikeCommentArgs = {
  commentID: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  groupType: GroupType;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationJoinGroupArgs = {
  groupId: Scalars['String'];
};


export type MutationAddRoleArgs = {
  input: RoleValidator;
};


export type MutationRemoveRoleArgs = {
  name: Scalars['String'];
};


export type MutationAssignRoleToUserArgs = {
  email: Scalars['String'];
  roleName: Scalars['String'];
};


export type MutationRemoveRoleFromUserArgs = {
  email: Scalars['String'];
  roleName: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: UserValidator;
};


export type MutationLogoutArgs = {
  refreshToken: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationUploadProfileImageArgs = {
  file: Scalars['Upload'];
};


export type MutationAddFollowerArgs = {
  userID: Scalars['String'];
};


export type MutationRemoveFollowerArgs = {
  userID: Scalars['String'];
};


export type MutationSetBioArgs = {
  bio: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  type: NotificationType;
  message: Scalars['String'];
  fromUser: User;
  toUser: User;
};

export enum NotificationType {
  NewFollower = 'NEW_FOLLOWER',
  NewComment = 'NEW_COMMENT',
  PostLike = 'POST_LIKE'
}

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  user: User;
  group?: Maybe<Group>;
  text: Scalars['String'];
  comments: Array<Comment>;
  likes?: Maybe<Array<Like>>;
  tags: Array<Tag>;
  likesCount?: Maybe<Scalars['Float']>;
  commentCount?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Boolean']>;
  imageLink?: Maybe<Scalars['String']>;
  edited?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  getNotifications: Array<Notification>;
  /** getPosts returns all posts from a given userID */
  getPostsFromUser?: Maybe<Array<Post>>;
  /** all posts with filter options */
  browsePosts?: Maybe<Array<Post>>;
  /** getPosts returns all posts from a given groupID */
  getPostsFromGroup?: Maybe<Array<Post>>;
  getFeed: Array<Post>;
  postById: Post;
  groupById: Group;
  groups: Array<Group>;
  myGroups: Array<Group>;
  checkGroupAccess: Scalars['Boolean'];
  getRoles: Array<Role>;
  search: Search;
  getAllTags: Array<Tag>;
  getUsers: Array<User>;
  /** Me returns User info when logged in. */
  me?: Maybe<User>;
  userById: User;
  userByUsername: User;
  following: Array<User>;
  followers: Array<User>;
  userStats: UserStats;
};


export type QueryGetPostsFromUserArgs = {
  take: Scalars['Float'];
  skip: Scalars['Float'];
  userID: Scalars['String'];
};


export type QueryBrowsePostsArgs = {
  tags?: Maybe<Array<Scalars['String']>>;
  take: Scalars['Float'];
  skip: Scalars['Float'];
};


export type QueryGetPostsFromGroupArgs = {
  groupId: Scalars['String'];
};


export type QueryGetFeedArgs = {
  take: Scalars['Float'];
  skip: Scalars['Float'];
};


export type QueryPostByIdArgs = {
  postId: Scalars['String'];
};


export type QueryGroupByIdArgs = {
  groupId: Scalars['String'];
};


export type QueryGroupsArgs = {
  take: Scalars['Float'];
  skip: Scalars['Float'];
};


export type QueryCheckGroupAccessArgs = {
  groupId: Scalars['String'];
};


export type QuerySearchArgs = {
  searchString: Scalars['String'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryFollowingArgs = {
  take: Scalars['Float'];
  skip: Scalars['Float'];
  userId: Scalars['String'];
};


export type QueryFollowersArgs = {
  take: Scalars['Float'];
  skip: Scalars['Float'];
  userId: Scalars['String'];
};


export type QueryUserStatsArgs = {
  userId: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  users: Array<User>;
};

export type RoleValidator = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Search = {
  __typename?: 'Search';
  users: Array<User>;
  groups: Array<Group>;
  tags: Array<Tag>;
};

export type Subscription = {
  __typename?: 'Subscription';
  notifications: Notification;
  newPost: Post;
};


export type SubscriptionNotificationsArgs = {
  userId: Scalars['String'];
};


export type SubscriptionNewPostArgs = {
  all: Scalars['Boolean'];
  userId: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  createdBy: User;
  posts: Array<Post>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  profilePicLink?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  roles: Array<Role>;
  posts: Array<Post>;
  followers: Array<User>;
  following: Array<User>;
  groups: Array<Group>;
  meFollowing: Scalars['Boolean'];
};

export type UserStats = {
  __typename?: 'UserStats';
  postCount: Scalars['Float'];
  followerCount: Scalars['Float'];
  followingCount: Scalars['Float'];
};

export type UserValidator = {
  firstName: Scalars['String'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AddFollowerMutationVariables = Exact<{
  userID: Scalars['String'];
}>;


export type AddFollowerMutation = (
  { __typename?: 'Mutation' }
  & { addFollower: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink' | 'username'>
  ) }
);

export type AddPostMutationVariables = Exact<{
  text: Scalars['String'];
  file?: Maybe<Scalars['Upload']>;
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  groupID?: Maybe<Scalars['String']>;
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'imageLink' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'firstname' | 'lastname' | 'profilePicLink' | 'username'>
    ) }
  ) }
);

export type AddCommentMutationVariables = Exact<{
  text: Scalars['String'];
  postID: Scalars['String'];
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & { addComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
  ) }
);

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String'];
  groupType: GroupType;
  description?: Maybe<Scalars['String']>;
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup: (
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
  ) }
);

export type DeleteNotificationMutationVariables = Exact<{
  notificationId: Scalars['String'];
}>;


export type DeleteNotificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteNotification'>
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type EditPostMutationVariables = Exact<{
  postId: Scalars['String'];
  text: Scalars['String'];
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & { editPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'imageLink' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'firstname' | 'lastname' | 'profilePicLink' | 'username'>
    ) }
  ) }
);

export type JoinGroupMutationVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type JoinGroupMutation = (
  { __typename?: 'Mutation' }
  & { joinGroup: (
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
  ) }
);

export type LikePostMutationVariables = Exact<{
  postID: Scalars['String'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & { likePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'imageLink' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'JwtResponse' }
    & Pick<JwtResponse, 'accessToken' | 'refreshToken'>
  ) }
);

export type RemoveFollowerMutationVariables = Exact<{
  userID: Scalars['String'];
}>;


export type RemoveFollowerMutation = (
  { __typename?: 'Mutation' }
  & { removeFollower: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink' | 'username'>
  ) }
);

export type UnlikePostMutationVariables = Exact<{
  postID: Scalars['String'];
}>;


export type UnlikePostMutation = (
  { __typename?: 'Mutation' }
  & { unlikePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'imageLink' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
    ) }
  ) }
);

export type BrowsePostsQueryVariables = Exact<{
  take: Scalars['Float'];
  skip: Scalars['Float'];
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type BrowsePostsQuery = (
  { __typename?: 'Query' }
  & { browsePosts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'imageLink' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
    ), tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name'>
    )> }
  )>> }
);

export type CheckGroupAccessQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type CheckGroupAccessQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'checkGroupAccess'>
);

export type FollowersQueryVariables = Exact<{
  userId: Scalars['String'];
  take: Scalars['Float'];
  skip: Scalars['Float'];
}>;


export type FollowersQuery = (
  { __typename?: 'Query' }
  & { followers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
  )> }
);

export type FollowingQueryVariables = Exact<{
  userId: Scalars['String'];
  take: Scalars['Float'];
  skip: Scalars['Float'];
}>;


export type FollowingQuery = (
  { __typename?: 'Query' }
  & { following: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
  )> }
);

export type GetFeedQueryVariables = Exact<{
  take: Scalars['Float'];
  skip: Scalars['Float'];
}>;


export type GetFeedQuery = (
  { __typename?: 'Query' }
  & { getFeed: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'imageLink' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
    ) }
  )> }
);

export type GetPostsFromGroupQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GetPostsFromGroupQuery = (
  { __typename?: 'Query' }
  & { getPostsFromGroup?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'imageLink' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
    ) }
  )>> }
);

export type GroupByIdQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupByIdQuery = (
  { __typename?: 'Query' }
  & { groupById: (
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name' | 'description'>
  ) }
);

export type GroupsQueryVariables = Exact<{
  take: Scalars['Float'];
  skip: Scalars['Float'];
}>;


export type GroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name' | 'description'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'profilePicLink' | 'firstname' | 'lastname' | 'username'>
  )> }
);

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = (
  { __typename?: 'Query' }
  & { getNotifications: Array<(
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'type' | 'message' | 'createdAt'>
    & { toUser: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profilePicLink' | 'username'>
    ), fromUser: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'profilePicLink' | 'username'>
    ) }
  )> }
);

export type PostByIdQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostByIdQuery = (
  { __typename?: 'Query' }
  & { postById: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'imageLink' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
      ) }
    )> }
  ) }
);

export type GetPostsFromUserQueryVariables = Exact<{
  userID: Scalars['String'];
  take: Scalars['Float'];
  skip: Scalars['Float'];
}>;


export type GetPostsFromUserQuery = (
  { __typename?: 'Query' }
  & { getPostsFromUser?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'imageLink' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
    ) }
  )>> }
);

export type SearchQueryVariables = Exact<{
  searchString: Scalars['String'];
}>;


export type SearchQuery = (
  { __typename?: 'Query' }
  & { search: (
    { __typename?: 'Search' }
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'profilePicLink'>
    )>, groups: Array<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )>, tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name'>
    )> }
  ) }
);

export type UserByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink' | 'username'>
    & { followers: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink'>
    )>, following: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink'>
    )> }
  ) }
);

export type UserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserByUsernameQuery = (
  { __typename?: 'Query' }
  & { userByUsername: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'bio' | 'firstname' | 'lastname' | 'profilePicLink' | 'username' | 'meFollowing'>
  ) }
);

export type UserStatsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserStatsQuery = (
  { __typename?: 'Query' }
  & { userStats: (
    { __typename?: 'UserStats' }
    & Pick<UserStats, 'postCount' | 'followerCount' | 'followingCount'>
  ) }
);

export type NotificationsSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type NotificationsSubscription = (
  { __typename?: 'Subscription' }
  & { notifications: (
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'type' | 'message' | 'createdAt'>
    & { fromUser: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'profilePicLink'>
    ), toUser: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  ) }
);
