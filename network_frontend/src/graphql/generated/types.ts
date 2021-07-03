import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
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

export type AddPostInput = {
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['Upload']>;
  file?: Maybe<Scalars['Upload']>;
  groupId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  members: Array<User>;
  messages: Array<ChatMessage>;
  lastMessage?: Maybe<ChatMessage>;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  sendBy: User;
  chat: Chat;
  content: Scalars['String'];
  media?: Maybe<Media>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  user: User;
  text: Scalars['String'];
  likes: Array<Like>;
  post: Post;
  likesCount: Scalars['Float'];
};


export type EditPostInput = {
  postId: Scalars['String'];
  content: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: GroupType;
  about: Scalars['String'];
  createdBy: User;
  posts: Array<Post>;
  members: Array<GroupMember>;
  numberOfPosts?: Maybe<Scalars['Float']>;
  numberOfMembers?: Maybe<Scalars['Float']>;
};

export type GroupAccess = {
  __typename?: 'GroupAccess';
  id: Scalars['String'];
  type: GroupType;
  isMember: Scalars['Boolean'];
};

export type GroupMedia = {
  __typename?: 'GroupMedia';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  type: MediaType;
  name: Scalars['String'];
  blurhash?: Maybe<Scalars['String']>;
  createdByName: Scalars['String'];
};

export type GroupMember = {
  __typename?: 'GroupMember';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  activated: Scalars['Boolean'];
  email: Scalars['String'];
  avatar?: Maybe<Media>;
  bio?: Maybe<Scalars['String']>;
  faculty?: Maybe<Scalars['String']>;
  studyCourse?: Maybe<Scalars['String']>;
  interests?: Maybe<Scalars['String']>;
  roles: Array<Role>;
  posts: Array<Post>;
  followers: Array<User>;
  following: Array<User>;
  groups: Array<Group>;
  meFollowing: Scalars['Boolean'];
  onlineStatus: Scalars['Boolean'];
  groupRole?: Maybe<GroupRoles>;
};

export type GroupRoleAccess = {
  __typename?: 'GroupRoleAccess';
  isAllowed: Scalars['Boolean'];
};

export enum GroupRoles {
  Member = 'MEMBER',
  Admin = 'ADMIN'
}

export enum GroupType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type JwtResponse = {
  __typename?: 'JwtResponse';
  accessToken: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  user: User;
};

export type Media = {
  __typename?: 'Media';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  type: MediaType;
  name: Scalars['String'];
  blurhash?: Maybe<Scalars['String']>;
};

export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO',
  File = 'FILE'
}

export type Mutation = {
  __typename?: 'Mutation';
  deleteNotification: Scalars['Boolean'];
  sendMessage: ChatMessage;
  createChat: Chat;
  deleteChatMessage: Scalars['Boolean'];
  createGroup: PreviewGroup;
  joinGroup: Group;
  updateAboutGroup: Group;
  updateGroupRole: Group;
  updateGroup: Group;
  leaveGroup: Scalars['Boolean'];
  /** Creates a new comment and adds it to a post */
  addComment: Comment;
  likeComment: Comment;
  unlikeComment: Comment;
  deleteComment: Comment;
  /** addPost creates a new Post and pushes updates to all followers */
  addPost: Post;
  /** likes an post */
  likePost: Post;
  /** unlikes an post */
  unlikePost: Post;
  /** deletes an post */
  deletePost: Scalars['Boolean'];
  /** updates the content of a post */
  editPost: Post;
  addRole: Role;
  removeRole: Scalars['Boolean'];
  assignRoleToUser: User;
  removeRoleFromUser: User;
  /** creates a new user */
  register: Scalars['Boolean'];
  /** logout an user to invalidate the access token */
  logout: Scalars['Boolean'];
  /** login to get a new auth token */
  login: JwtResponse;
  /** follow a user */
  addFollower: User;
  /** unfollow a user */
  removeFollower: User;
  /** update the profile information of the loggedIn user */
  updateProfile: User;
  /** updates the password */
  updatePassword: User;
};


export type MutationDeleteNotificationArgs = {
  notificationId: Scalars['String'];
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationCreateChatArgs = {
  memberId: Scalars['String'];
};


export type MutationDeleteChatMessageArgs = {
  messageId: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  password?: Maybe<Scalars['String']>;
  groupType: GroupType;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationJoinGroupArgs = {
  password?: Maybe<Scalars['String']>;
  groupId: Scalars['String'];
};


export type MutationUpdateAboutGroupArgs = {
  aboutContent: Scalars['String'];
  groupId: Scalars['String'];
};


export type MutationUpdateGroupRoleArgs = {
  groupRole: GroupRoles;
  groupId: Scalars['String'];
  memberId: Scalars['String'];
};


export type MutationUpdateGroupArgs = {
  input: UpdateGroupInput;
};


export type MutationLeaveGroupArgs = {
  groupId: Scalars['String'];
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


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationAddPostArgs = {
  input: AddPostInput;
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
  input: EditPostInput;
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
  access: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddFollowerArgs = {
  userID: Scalars['String'];
};


export type MutationRemoveFollowerArgs = {
  userID: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  type: NotificationType;
  message: Scalars['String'];
  fromUser: User;
  toUser: User;
  post?: Maybe<Post>;
  chat?: Maybe<Chat>;
  chatMessage?: Maybe<ChatMessage>;
};

export enum NotificationType {
  NewFollower = 'NEW_FOLLOWER',
  NewComment = 'NEW_COMMENT',
  PostLike = 'POST_LIKE',
  Mention = 'MENTION',
  NewChatMessage = 'NEW_CHAT_MESSAGE'
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
  media?: Maybe<Media>;
  edited?: Maybe<Scalars['Boolean']>;
};

export type PreviewGroup = {
  __typename?: 'PreviewGroup';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  type: GroupType;
  numberOfMembers?: Maybe<Scalars['Float']>;
  previewAvatars?: Maybe<Array<Media>>;
};

export type Query = {
  __typename?: 'Query';
  getNotifications: Array<Notification>;
  myChats: Array<Chat>;
  chatById: Chat;
  groupById: Group;
  groupByIdPreview: PreviewGroup;
  groups: Array<PreviewGroup>;
  myGroups: Array<PreviewGroup>;
  followingGroups: Array<PreviewGroup>;
  checkGroupAccess: GroupAccess;
  checkGroupRoleAccess: GroupRoleAccess;
  /** getPosts returns all posts for a given userID */
  getPostsFromUser?: Maybe<Array<Post>>;
  /** returns all posts that are not associated with groups, allows to be filterd via tags */
  browsePosts?: Maybe<Array<Post>>;
  /** getPostsFromGroup returns all posts from a group */
  getPostsFromGroup?: Maybe<Array<Post>>;
  /** returns the post feed of user */
  getFeed: Array<Post>;
  /** returns a specific post */
  postById: Post;
  getRoles: Array<Role>;
  search: Search;
  getAllTags: Array<Tag>;
  getUsers: Array<User>;
  /** Me returns User info when logged in. */
  me?: Maybe<User>;
  /** UserById returns a user based on the given id */
  userById: User;
  /** UserByUsername returns a user based on the given user handle */
  userByUsername: User;
  /** returns all users that the logged in user is following */
  getFollowing: Array<User>;
  /** returns all followers of the user */
  getFollowers: Array<User>;
  /** UserStats are some stats like follower count, post count ... */
  userStats: UserStats;
  /** recommeding users based on Faculty */
  recommendedUsersFaculty: Array<User>;
  /** recommeding users based on interests */
  recommendedUsersInterests: Array<User>;
  mediaFromGroup: Array<GroupMedia>;
};


export type QueryChatByIdArgs = {
  chatId: Scalars['String'];
};


export type QueryGroupByIdArgs = {
  groupId: Scalars['String'];
};


export type QueryGroupByIdPreviewArgs = {
  groupId: Scalars['String'];
};


export type QueryGroupsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};


export type QueryMyGroupsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};


export type QueryFollowingGroupsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};


export type QueryCheckGroupAccessArgs = {
  groupId: Scalars['String'];
};


export type QueryCheckGroupRoleAccessArgs = {
  groupRole: GroupRoles;
  groupId: Scalars['String'];
};


export type QueryGetPostsFromUserArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  userID: Scalars['String'];
};


export type QueryBrowsePostsArgs = {
  searchString?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  take: Scalars['Float'];
  skip: Scalars['Float'];
};


export type QueryGetPostsFromGroupArgs = {
  groupId: Scalars['String'];
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};


export type QueryGetFeedArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};


export type QueryPostByIdArgs = {
  postId: Scalars['String'];
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


export type QueryGetFollowingArgs = {
  take: Scalars['Float'];
  skip: Scalars['Float'];
  userId: Scalars['String'];
};


export type QueryGetFollowersArgs = {
  take: Scalars['Float'];
  skip: Scalars['Float'];
  userId: Scalars['String'];
};


export type QueryUserStatsArgs = {
  userId: Scalars['String'];
};


export type QueryMediaFromGroupArgs = {
  groupId: Scalars['String'];
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

export type SendMessageInput = {
  chatId: Scalars['String'];
  message: Scalars['String'];
  file?: Maybe<Scalars['Upload']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  notifications: Notification;
  newMessage: ChatMessage;
  /** subscribe to new posts */
  newPost: Post;
};


export type SubscriptionNotificationsArgs = {
  userId: Scalars['String'];
};


export type SubscriptionNewMessageArgs = {
  chatId: Scalars['String'];
};


export type SubscriptionNewPostArgs = {
  groupId?: Maybe<Scalars['String']>;
  all: Scalars['Boolean'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  createdBy: User;
  posts: Array<Post>;
};

export type UpdateGroupInput = {
  groupId: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<GroupType>;
  password?: Maybe<Scalars['String']>;
};

export type UpdatePasswordInput = {
  password: Scalars['String'];
};

export type UpdateProfileInput = {
  bio: Scalars['String'];
  interests?: Maybe<Scalars['String']>;
  faculty?: Maybe<Scalars['String']>;
  studyCourse?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['Upload']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  activated: Scalars['Boolean'];
  email: Scalars['String'];
  avatar?: Maybe<Media>;
  bio?: Maybe<Scalars['String']>;
  faculty?: Maybe<Scalars['String']>;
  studyCourse?: Maybe<Scalars['String']>;
  interests?: Maybe<Scalars['String']>;
  roles: Array<Role>;
  posts: Array<Post>;
  followers: Array<User>;
  following: Array<User>;
  groups: Array<Group>;
  meFollowing: Scalars['Boolean'];
  onlineStatus: Scalars['Boolean'];
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
    & Pick<User, 'id' | 'bio' | 'studyCourse' | 'faculty' | 'interests' | 'firstname' | 'lastname' | 'username' | 'meFollowing'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash'>
    )> }
  ) }
);

export type AddPostMutationVariables = Exact<{
  input: AddPostInput;
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), group?: Maybe<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )> }
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

export type CreateChatMutationVariables = Exact<{
  memberId: Scalars['String'];
}>;


export type CreateChatMutation = (
  { __typename?: 'Mutation' }
  & { createChat: (
    { __typename?: 'Chat' }
    & Pick<Chat, 'id'>
  ) }
);

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String'];
  groupType: GroupType;
  description?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup: (
    { __typename?: 'PreviewGroup' }
    & Pick<PreviewGroup, 'id' | 'name' | 'description' | 'numberOfMembers' | 'type'>
    & { previewAvatars?: Maybe<Array<(
      { __typename?: 'Media' }
      & Pick<Media, 'name' | 'blurhash'>
    )>> }
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteComment: (
    { __typename?: 'Comment' }
    & { post: (
      { __typename?: 'Post' }
      & Pick<Post, 'id'>
    ) }
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
  input: EditPostInput;
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & { editPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), group?: Maybe<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )> }
  ) }
);

export type JoinGroupMutationVariables = Exact<{
  groupId: Scalars['String'];
  password?: Maybe<Scalars['String']>;
}>;


export type JoinGroupMutation = (
  { __typename?: 'Mutation' }
  & { joinGroup: (
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'name'>
  ) }
);

export type LeaveGroupMutationVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type LeaveGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveGroup'>
);

export type LikePostMutationVariables = Exact<{
  postID: Scalars['String'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & { likePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), group?: Maybe<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )> }
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
    & Pick<JwtResponse, 'accessToken'>
  ) }
);

export type LogoutMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RemoveFollowerMutationVariables = Exact<{
  userID: Scalars['String'];
}>;


export type RemoveFollowerMutation = (
  { __typename?: 'Mutation' }
  & { removeFollower: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'bio' | 'studyCourse' | 'faculty' | 'interests' | 'firstname' | 'lastname' | 'username' | 'meFollowing'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash'>
    )> }
  ) }
);

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'ChatMessage' }
    & Pick<ChatMessage, 'id' | 'content' | 'createdAt'>
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
    )>, sendBy: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type SignupMutationVariables = Exact<{
  input: UserValidator;
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UnlikePostMutationVariables = Exact<{
  postID: Scalars['String'];
}>;


export type UnlikePostMutation = (
  { __typename?: 'Mutation' }
  & { unlikePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), group?: Maybe<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )> }
  ) }
);

export type UpdateGroupMutationVariables = Exact<{
  input: UpdateGroupInput;
}>;


export type UpdateGroupMutation = (
  { __typename?: 'Mutation' }
  & { updateGroup: (
    { __typename?: 'Group' }
    & Pick<Group, 'type' | 'id' | 'name' | 'description'>
  ) }
);

export type UpdateAboutGroupMutationVariables = Exact<{
  groupId: Scalars['String'];
  aboutContent: Scalars['String'];
}>;


export type UpdateAboutGroupMutation = (
  { __typename?: 'Mutation' }
  & { updateAboutGroup: (
    { __typename?: 'Group' }
    & Pick<Group, 'type' | 'id' | 'name' | 'description' | 'numberOfPosts' | 'numberOfMembers'>
  ) }
);

export type UpdateGroupRoleMutationVariables = Exact<{
  groupId: Scalars['String'];
  memberId: Scalars['String'];
  groupRole: GroupRoles;
}>;


export type UpdateGroupRoleMutation = (
  { __typename?: 'Mutation' }
  & { updateGroupRole: (
    { __typename?: 'Group' }
    & Pick<Group, 'id'>
  ) }
);

export type UpdatePasswordMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & { updatePassword: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'bio' | 'studyCourse' | 'faculty' | 'interests' | 'firstname' | 'lastname' | 'username' | 'meFollowing'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash'>
    )> }
  ) }
);

export type BrowsePostsQueryVariables = Exact<{
  take: Scalars['Float'];
  skip: Scalars['Float'];
  tags?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  searchString?: Maybe<Scalars['String']>;
}>;


export type BrowsePostsQuery = (
  { __typename?: 'Query' }
  & { browsePosts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name'>
    )> }
  )>> }
);

export type ChatByIdQueryVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type ChatByIdQuery = (
  { __typename?: 'Query' }
  & { chatById: (
    { __typename?: 'Chat' }
    & Pick<Chat, 'id'>
    & { messages: Array<(
      { __typename?: 'ChatMessage' }
      & Pick<ChatMessage, 'id' | 'content' | 'createdAt'>
      & { sendBy: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ), media?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
      )> }
    )> }
  ) }
);

export type CheckGroupAccessQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type CheckGroupAccessQuery = (
  { __typename?: 'Query' }
  & { checkGroupAccess: (
    { __typename?: 'GroupAccess' }
    & Pick<GroupAccess, 'id' | 'type' | 'isMember'>
  ) }
);

export type CheckGroupRoleAccessQueryVariables = Exact<{
  groupId: Scalars['String'];
  groupRole: GroupRoles;
}>;


export type CheckGroupRoleAccessQuery = (
  { __typename?: 'Query' }
  & { checkGroupRoleAccess: (
    { __typename?: 'GroupRoleAccess' }
    & Pick<GroupRoleAccess, 'isAllowed'>
  ) }
);

export type GetFollowersQueryVariables = Exact<{
  userId: Scalars['String'];
  take: Scalars['Float'];
  skip: Scalars['Float'];
}>;


export type GetFollowersQuery = (
  { __typename?: 'Query' }
  & { getFollowers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'meFollowing'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash'>
    )> }
  )> }
);

export type GetFollowingQueryVariables = Exact<{
  userId: Scalars['String'];
  take: Scalars['Float'];
  skip: Scalars['Float'];
}>;


export type GetFollowingQuery = (
  { __typename?: 'Query' }
  & { getFollowing: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'meFollowing'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash'>
    )> }
  )> }
);

export type FollowingGroupsQueryVariables = Exact<{
  limit: Scalars['Float'];
  offset: Scalars['Float'];
}>;


export type FollowingGroupsQuery = (
  { __typename?: 'Query' }
  & { followingGroups: Array<(
    { __typename?: 'PreviewGroup' }
    & Pick<PreviewGroup, 'id' | 'name' | 'description' | 'type' | 'numberOfMembers'>
    & { previewAvatars?: Maybe<Array<(
      { __typename?: 'Media' }
      & Pick<Media, 'name' | 'blurhash'>
    )>> }
  )> }
);

export type GetFeedQueryVariables = Exact<{
  limit: Scalars['Float'];
  offset: Scalars['Float'];
}>;


export type GetFeedQuery = (
  { __typename?: 'Query' }
  & { getFeed: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), group?: Maybe<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )> }
  )> }
);

export type GetPostsFromGroupQueryVariables = Exact<{
  groupId: Scalars['String'];
  limit: Scalars['Float'];
  offset: Scalars['Float'];
}>;


export type GetPostsFromGroupQuery = (
  { __typename?: 'Query' }
  & { getPostsFromGroup?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ) }
  )>> }
);

export type GroupAboutQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupAboutQuery = (
  { __typename?: 'Query' }
  & { groupById: (
    { __typename?: 'Group' }
    & Pick<Group, 'id' | 'about'>
    & { createdBy: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type GroupByIdQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupByIdQuery = (
  { __typename?: 'Query' }
  & { groupById: (
    { __typename?: 'Group' }
    & Pick<Group, 'type' | 'id' | 'name' | 'description' | 'numberOfPosts' | 'numberOfMembers'>
  ) }
);

export type GroupByIdPreviewQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupByIdPreviewQuery = (
  { __typename?: 'Query' }
  & { groupByIdPreview: (
    { __typename?: 'PreviewGroup' }
    & Pick<PreviewGroup, 'type' | 'id' | 'name' | 'description' | 'numberOfMembers'>
  ) }
);

export type GroupMembersQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type GroupMembersQuery = (
  { __typename?: 'Query' }
  & { groupById: (
    { __typename?: 'Group' }
    & Pick<Group, 'id'>
    & { createdBy: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'onlineStatus'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), members: Array<(
      { __typename?: 'GroupMember' }
      & Pick<GroupMember, 'id' | 'firstname' | 'lastname' | 'username' | 'onlineStatus' | 'groupRole'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    )> }
  ) }
);

export type GroupsQueryVariables = Exact<{
  limit: Scalars['Float'];
  offset: Scalars['Float'];
}>;


export type GroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'PreviewGroup' }
    & Pick<PreviewGroup, 'id' | 'name' | 'description' | 'numberOfMembers' | 'type'>
    & { previewAvatars?: Maybe<Array<(
      { __typename?: 'Media' }
      & Pick<Media, 'name' | 'blurhash'>
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash'>
    )>, roles: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name'>
    )> }
  )> }
);

export type MediaFromGroupQueryVariables = Exact<{
  groupId: Scalars['String'];
}>;


export type MediaFromGroupQuery = (
  { __typename?: 'Query' }
  & { mediaFromGroup: Array<(
    { __typename?: 'GroupMedia' }
    & Pick<GroupMedia, 'id' | 'type' | 'name' | 'blurhash' | 'createdAt' | 'createdByName'>
  )> }
);

export type MyChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyChatsQuery = (
  { __typename?: 'Query' }
  & { myChats: Array<(
    { __typename?: 'Chat' }
    & Pick<Chat, 'id'>
    & { lastMessage?: Maybe<(
      { __typename?: 'ChatMessage' }
      & Pick<ChatMessage, 'id' | 'content' | 'createdAt'>
    )>, members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    )> }
  )> }
);

export type MyGroupsQueryVariables = Exact<{
  limit: Scalars['Float'];
  offset: Scalars['Float'];
}>;


export type MyGroupsQuery = (
  { __typename?: 'Query' }
  & { myGroups: Array<(
    { __typename?: 'PreviewGroup' }
    & Pick<PreviewGroup, 'id' | 'name' | 'description' | 'numberOfMembers' | 'type'>
    & { previewAvatars?: Maybe<Array<(
      { __typename?: 'Media' }
      & Pick<Media, 'name' | 'blurhash'>
    )>> }
  )> }
);

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = (
  { __typename?: 'Query' }
  & { getNotifications: Array<(
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'type' | 'message' | 'createdAt'>
    & { chatMessage?: Maybe<(
      { __typename?: 'ChatMessage' }
      & Pick<ChatMessage, 'content'>
    )>, toUser: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), fromUser: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id'>
    )>, chat?: Maybe<(
      { __typename?: 'Chat' }
      & Pick<Chat, 'id'>
    )> }
  )> }
);

export type PostByIdQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostByIdQuery = (
  { __typename?: 'Query' }
  & { postById: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'text' | 'createdAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
        & { avatar?: Maybe<(
          { __typename?: 'Media' }
          & Pick<Media, 'id' | 'name' | 'blurhash'>
        )> }
      ) }
    )>, group?: Maybe<(
      { __typename?: 'Group' }
      & Pick<Group, 'id' | 'name'>
    )> }
  ) }
);

export type GetPostsFromUserQueryVariables = Exact<{
  userID: Scalars['String'];
  limit: Scalars['Float'];
  offset: Scalars['Float'];
}>;


export type GetPostsFromUserQuery = (
  { __typename?: 'Query' }
  & { getPostsFromUser?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'commentCount' | 'createdAt' | 'edited'>
    & { media?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash' | 'type'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ) }
  )>> }
);

export type RecommendedUsersInterestsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendedUsersInterestsQuery = (
  { __typename?: 'Query' }
  & { recommendedUsersInterests: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'meFollowing'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash'>
    )> }
  )> }
);

export type RecommendedUsersFacultyQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendedUsersFacultyQuery = (
  { __typename?: 'Query' }
  & { recommendedUsersFaculty: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'username' | 'meFollowing'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash'>
    )> }
  )> }
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
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
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
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'username'>
    & { avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash'>
    )>, followers: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    )>, following: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
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
    & Pick<User, 'id' | 'bio' | 'studyCourse' | 'faculty' | 'interests' | 'firstname' | 'lastname' | 'username' | 'meFollowing'>
    & { roles: Array<(
      { __typename?: 'Role' }
      & Pick<Role, 'id' | 'name'>
    )>, avatar?: Maybe<(
      { __typename?: 'Media' }
      & Pick<Media, 'id' | 'name' | 'blurhash'>
    )> }
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
    & { chatMessage?: Maybe<(
      { __typename?: 'ChatMessage' }
      & Pick<ChatMessage, 'content'>
    )>, fromUser: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
      & { avatar?: Maybe<(
        { __typename?: 'Media' }
        & Pick<Media, 'id' | 'name' | 'blurhash'>
      )> }
    ), toUser: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id'>
    )>, chat?: Maybe<(
      { __typename?: 'Chat' }
      & Pick<Chat, 'id'>
    )> }
  ) }
);


export const AddFollowerDocument = gql`
    mutation addFollower($userID: String!) {
  addFollower(userID: $userID) {
    id
    bio
    studyCourse
    faculty
    interests
    firstname
    lastname
    avatar {
      id
      name
      blurhash
    }
    username
    meFollowing
  }
}
    `;

/**
 * __useAddFollowerMutation__
 *
 * To run a mutation, you first call `useAddFollowerMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddFollowerMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddFollowerMutation({
 *   variables: {
 *     userID: // value for 'userID'
 *   },
 * });
 */
export function useAddFollowerMutation(options: VueApolloComposable.UseMutationOptions<AddFollowerMutation, AddFollowerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AddFollowerMutation, AddFollowerMutationVariables>>) {
  return VueApolloComposable.useMutation<AddFollowerMutation, AddFollowerMutationVariables>(AddFollowerDocument, options);
}
export type AddFollowerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AddFollowerMutation, AddFollowerMutationVariables>;
export const AddPostDocument = gql`
    mutation addPost($input: AddPostInput!) {
  addPost(input: $input) {
    id
    liked
    media {
      id
      name
      blurhash
      type
    }
    user {
      firstname
      lastname
      avatar {
        id
        name
        blurhash
      }
      username
    }
    text
    likesCount
    commentCount
    createdAt
    edited
    group {
      id
      name
    }
  }
}
    `;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddPostMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useAddPostMutation(options: VueApolloComposable.UseMutationOptions<AddPostMutation, AddPostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AddPostMutation, AddPostMutationVariables>>) {
  return VueApolloComposable.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
}
export type AddPostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AddPostMutation, AddPostMutationVariables>;
export const AddCommentDocument = gql`
    mutation addComment($text: String!, $postID: String!) {
  addComment(text: $text, postID: $postID) {
    id
  }
}
    `;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddCommentMutation({
 *   variables: {
 *     text: // value for 'text'
 *     postID: // value for 'postID'
 *   },
 * });
 */
export function useAddCommentMutation(options: VueApolloComposable.UseMutationOptions<AddCommentMutation, AddCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AddCommentMutation, AddCommentMutationVariables>>) {
  return VueApolloComposable.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
}
export type AddCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AddCommentMutation, AddCommentMutationVariables>;
export const CreateChatDocument = gql`
    mutation createChat($memberId: String!) {
  createChat(memberId: $memberId) {
    id
  }
}
    `;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateChatMutation({
 *   variables: {
 *     memberId: // value for 'memberId'
 *   },
 * });
 */
export function useCreateChatMutation(options: VueApolloComposable.UseMutationOptions<CreateChatMutation, CreateChatMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateChatMutation, CreateChatMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
}
export type CreateChatMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateChatMutation, CreateChatMutationVariables>;
export const CreateGroupDocument = gql`
    mutation createGroup($name: String!, $groupType: GroupType!, $description: String, $password: String) {
  createGroup(
    name: $name
    groupType: $groupType
    description: $description
    password: $password
  ) {
    id
    name
    description
    numberOfMembers
    type
    previewAvatars {
      name
      blurhash
    }
  }
}
    `;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateGroupMutation({
 *   variables: {
 *     name: // value for 'name'
 *     groupType: // value for 'groupType'
 *     description: // value for 'description'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useCreateGroupMutation(options: VueApolloComposable.UseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
}
export type CreateGroupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateGroupMutation, CreateGroupMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($commentId: String!) {
  deleteComment(commentId: $commentId) {
    post {
      id
    }
  }
}
    `;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteCommentMutation({
 *   variables: {
 *     commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(options: VueApolloComposable.UseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>>) {
  return VueApolloComposable.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
}
export type DeleteCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation deleteNotification($notificationId: String!) {
  deleteNotification(notificationId: $notificationId)
}
    `;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeleteNotificationMutation({
 *   variables: {
 *     notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useDeleteNotificationMutation(options: VueApolloComposable.UseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>>) {
  return VueApolloComposable.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
}
export type DeleteNotificationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($postId: String!) {
  deletePost(postId: $postId)
}
    `;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDeletePostMutation({
 *   variables: {
 *     postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(options: VueApolloComposable.UseMutationOptions<DeletePostMutation, DeletePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeletePostMutation, DeletePostMutationVariables>>) {
  return VueApolloComposable.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
}
export type DeletePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DeletePostMutation, DeletePostMutationVariables>;
export const EditPostDocument = gql`
    mutation editPost($input: EditPostInput!) {
  editPost(input: $input) {
    id
    liked
    media {
      id
      name
      blurhash
      type
    }
    user {
      firstname
      lastname
      avatar {
        id
        name
        blurhash
      }
      username
    }
    text
    likesCount
    commentCount
    createdAt
    edited
    group {
      id
      name
    }
  }
}
    `;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useEditPostMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useEditPostMutation(options: VueApolloComposable.UseMutationOptions<EditPostMutation, EditPostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<EditPostMutation, EditPostMutationVariables>>) {
  return VueApolloComposable.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
}
export type EditPostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<EditPostMutation, EditPostMutationVariables>;
export const JoinGroupDocument = gql`
    mutation joinGroup($groupId: String!, $password: String) {
  joinGroup(groupId: $groupId, password: $password) {
    id
    name
  }
}
    `;

/**
 * __useJoinGroupMutation__
 *
 * To run a mutation, you first call `useJoinGroupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useJoinGroupMutation({
 *   variables: {
 *     groupId: // value for 'groupId'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useJoinGroupMutation(options: VueApolloComposable.UseMutationOptions<JoinGroupMutation, JoinGroupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<JoinGroupMutation, JoinGroupMutationVariables>>) {
  return VueApolloComposable.useMutation<JoinGroupMutation, JoinGroupMutationVariables>(JoinGroupDocument, options);
}
export type JoinGroupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<JoinGroupMutation, JoinGroupMutationVariables>;
export const LeaveGroupDocument = gql`
    mutation leaveGroup($groupId: String!) {
  leaveGroup(groupId: $groupId)
}
    `;

/**
 * __useLeaveGroupMutation__
 *
 * To run a mutation, you first call `useLeaveGroupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGroupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLeaveGroupMutation({
 *   variables: {
 *     groupId: // value for 'groupId'
 *   },
 * });
 */
export function useLeaveGroupMutation(options: VueApolloComposable.UseMutationOptions<LeaveGroupMutation, LeaveGroupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LeaveGroupMutation, LeaveGroupMutationVariables>>) {
  return VueApolloComposable.useMutation<LeaveGroupMutation, LeaveGroupMutationVariables>(LeaveGroupDocument, options);
}
export type LeaveGroupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LeaveGroupMutation, LeaveGroupMutationVariables>;
export const LikePostDocument = gql`
    mutation likePost($postID: String!) {
  likePost(postID: $postID) {
    id
    liked
    media {
      id
      name
      blurhash
      type
    }
    user {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
    }
    text
    likesCount
    commentCount
    createdAt
    edited
    group {
      id
      name
    }
  }
}
    `;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLikePostMutation({
 *   variables: {
 *     postID: // value for 'postID'
 *   },
 * });
 */
export function useLikePostMutation(options: VueApolloComposable.UseMutationOptions<LikePostMutation, LikePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LikePostMutation, LikePostMutationVariables>>) {
  return VueApolloComposable.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
}
export type LikePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LikePostMutation, LikePostMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>>) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout($token: String!) {
  logout(access: $token)
}
    `;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation({
 *   variables: {
 *     token: // value for 'token'
 *   },
 * });
 */
export function useLogoutMutation(options: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>>) {
  return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>;
export const RemoveFollowerDocument = gql`
    mutation removeFollower($userID: String!) {
  removeFollower(userID: $userID) {
    id
    bio
    studyCourse
    faculty
    interests
    firstname
    lastname
    avatar {
      id
      name
      blurhash
    }
    username
    meFollowing
  }
}
    `;

/**
 * __useRemoveFollowerMutation__
 *
 * To run a mutation, you first call `useRemoveFollowerMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFollowerMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveFollowerMutation({
 *   variables: {
 *     userID: // value for 'userID'
 *   },
 * });
 */
export function useRemoveFollowerMutation(options: VueApolloComposable.UseMutationOptions<RemoveFollowerMutation, RemoveFollowerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveFollowerMutation, RemoveFollowerMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveFollowerMutation, RemoveFollowerMutationVariables>(RemoveFollowerDocument, options);
}
export type RemoveFollowerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveFollowerMutation, RemoveFollowerMutationVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($input: SendMessageInput!) {
  sendMessage(input: $input) {
    id
    content
    media {
      id
      name
      blurhash
      type
    }
    createdAt
    sendBy {
      id
    }
  }
}
    `;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSendMessageMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(options: VueApolloComposable.UseMutationOptions<SendMessageMutation, SendMessageMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SendMessageMutation, SendMessageMutationVariables>>) {
  return VueApolloComposable.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
}
export type SendMessageMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SendMessageMutation, SendMessageMutationVariables>;
export const SignupDocument = gql`
    mutation signup($input: UserValidator!) {
  register(input: $input)
}
    `;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignupMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(options: VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables>>) {
  return VueApolloComposable.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignupMutation, SignupMutationVariables>;
export const UnlikePostDocument = gql`
    mutation unlikePost($postID: String!) {
  unlikePost(postID: $postID) {
    id
    liked
    media {
      id
      name
      blurhash
      type
    }
    user {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
    }
    text
    likesCount
    commentCount
    createdAt
    edited
    group {
      id
      name
    }
  }
}
    `;

/**
 * __useUnlikePostMutation__
 *
 * To run a mutation, you first call `useUnlikePostMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUnlikePostMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUnlikePostMutation({
 *   variables: {
 *     postID: // value for 'postID'
 *   },
 * });
 */
export function useUnlikePostMutation(options: VueApolloComposable.UseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables>>) {
  return VueApolloComposable.useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument, options);
}
export type UnlikePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UnlikePostMutation, UnlikePostMutationVariables>;
export const UpdateGroupDocument = gql`
    mutation updateGroup($input: UpdateGroupInput!) {
  updateGroup(input: $input) {
    type
    id
    name
    description
  }
}
    `;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateGroupMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGroupMutation(options: VueApolloComposable.UseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
}
export type UpdateGroupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const UpdateAboutGroupDocument = gql`
    mutation updateAboutGroup($groupId: String!, $aboutContent: String!) {
  updateAboutGroup(groupId: $groupId, aboutContent: $aboutContent) {
    type
    id
    name
    description
    numberOfPosts
    numberOfMembers
  }
}
    `;

/**
 * __useUpdateAboutGroupMutation__
 *
 * To run a mutation, you first call `useUpdateAboutGroupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAboutGroupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateAboutGroupMutation({
 *   variables: {
 *     groupId: // value for 'groupId'
 *     aboutContent: // value for 'aboutContent'
 *   },
 * });
 */
export function useUpdateAboutGroupMutation(options: VueApolloComposable.UseMutationOptions<UpdateAboutGroupMutation, UpdateAboutGroupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateAboutGroupMutation, UpdateAboutGroupMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateAboutGroupMutation, UpdateAboutGroupMutationVariables>(UpdateAboutGroupDocument, options);
}
export type UpdateAboutGroupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateAboutGroupMutation, UpdateAboutGroupMutationVariables>;
export const UpdateGroupRoleDocument = gql`
    mutation updateGroupRole($groupId: String!, $memberId: String!, $groupRole: GroupRoles!) {
  updateGroupRole(groupId: $groupId, memberId: $memberId, groupRole: $groupRole) {
    id
  }
}
    `;

/**
 * __useUpdateGroupRoleMutation__
 *
 * To run a mutation, you first call `useUpdateGroupRoleMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupRoleMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateGroupRoleMutation({
 *   variables: {
 *     groupId: // value for 'groupId'
 *     memberId: // value for 'memberId'
 *     groupRole: // value for 'groupRole'
 *   },
 * });
 */
export function useUpdateGroupRoleMutation(options: VueApolloComposable.UseMutationOptions<UpdateGroupRoleMutation, UpdateGroupRoleMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateGroupRoleMutation, UpdateGroupRoleMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateGroupRoleMutation, UpdateGroupRoleMutationVariables>(UpdateGroupRoleDocument, options);
}
export type UpdateGroupRoleMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateGroupRoleMutation, UpdateGroupRoleMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation updatePassword($input: UpdatePasswordInput!) {
  updatePassword(input: $input) {
    id
  }
}
    `;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdatePasswordMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePasswordMutation(options: VueApolloComposable.UseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
}
export type UpdatePasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    bio
    studyCourse
    faculty
    interests
    firstname
    lastname
    avatar {
      id
      name
      blurhash
    }
    username
    meFollowing
  }
}
    `;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateProfileMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(options: VueApolloComposable.UseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
}
export type UpdateProfileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const BrowsePostsDocument = gql`
    query browsePosts($take: Float!, $skip: Float!, $tags: [String!], $searchString: String) {
  browsePosts(take: $take, skip: $skip, tags: $tags, searchString: $searchString) {
    id
    liked
    media {
      id
      name
      blurhash
      type
    }
    user {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
    }
    text
    likesCount
    commentCount
    createdAt
    edited
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useBrowsePostsQuery__
 *
 * To run a query within a Vue component, call `useBrowsePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrowsePostsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useBrowsePostsQuery({
 *   take: // value for 'take'
 *   skip: // value for 'skip'
 *   tags: // value for 'tags'
 *   searchString: // value for 'searchString'
 * });
 */
export function useBrowsePostsQuery(variables: BrowsePostsQueryVariables | VueCompositionApi.Ref<BrowsePostsQueryVariables> | ReactiveFunction<BrowsePostsQueryVariables>, options: VueApolloComposable.UseQueryOptions<BrowsePostsQuery, BrowsePostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<BrowsePostsQuery, BrowsePostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<BrowsePostsQuery, BrowsePostsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<BrowsePostsQuery, BrowsePostsQueryVariables>(BrowsePostsDocument, variables, options);
}
export type BrowsePostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<BrowsePostsQuery, BrowsePostsQueryVariables>;
export const ChatByIdDocument = gql`
    query chatById($chatId: String!) {
  chatById(chatId: $chatId) {
    id
    messages {
      id
      content
      createdAt
      sendBy {
        id
      }
      media {
        id
        name
        blurhash
        type
      }
    }
  }
}
    `;

/**
 * __useChatByIdQuery__
 *
 * To run a query within a Vue component, call `useChatByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatByIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useChatByIdQuery({
 *   chatId: // value for 'chatId'
 * });
 */
export function useChatByIdQuery(variables: ChatByIdQueryVariables | VueCompositionApi.Ref<ChatByIdQueryVariables> | ReactiveFunction<ChatByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<ChatByIdQuery, ChatByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ChatByIdQuery, ChatByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ChatByIdQuery, ChatByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ChatByIdQuery, ChatByIdQueryVariables>(ChatByIdDocument, variables, options);
}
export type ChatByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ChatByIdQuery, ChatByIdQueryVariables>;
export const CheckGroupAccessDocument = gql`
    query checkGroupAccess($groupId: String!) {
  checkGroupAccess(groupId: $groupId) {
    id
    type
    isMember
  }
}
    `;

/**
 * __useCheckGroupAccessQuery__
 *
 * To run a query within a Vue component, call `useCheckGroupAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckGroupAccessQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCheckGroupAccessQuery({
 *   groupId: // value for 'groupId'
 * });
 */
export function useCheckGroupAccessQuery(variables: CheckGroupAccessQueryVariables | VueCompositionApi.Ref<CheckGroupAccessQueryVariables> | ReactiveFunction<CheckGroupAccessQueryVariables>, options: VueApolloComposable.UseQueryOptions<CheckGroupAccessQuery, CheckGroupAccessQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CheckGroupAccessQuery, CheckGroupAccessQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CheckGroupAccessQuery, CheckGroupAccessQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CheckGroupAccessQuery, CheckGroupAccessQueryVariables>(CheckGroupAccessDocument, variables, options);
}
export type CheckGroupAccessQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CheckGroupAccessQuery, CheckGroupAccessQueryVariables>;
export const CheckGroupRoleAccessDocument = gql`
    query checkGroupRoleAccess($groupId: String!, $groupRole: GroupRoles!) {
  checkGroupRoleAccess(groupId: $groupId, groupRole: $groupRole) {
    isAllowed
  }
}
    `;

/**
 * __useCheckGroupRoleAccessQuery__
 *
 * To run a query within a Vue component, call `useCheckGroupRoleAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckGroupRoleAccessQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCheckGroupRoleAccessQuery({
 *   groupId: // value for 'groupId'
 *   groupRole: // value for 'groupRole'
 * });
 */
export function useCheckGroupRoleAccessQuery(variables: CheckGroupRoleAccessQueryVariables | VueCompositionApi.Ref<CheckGroupRoleAccessQueryVariables> | ReactiveFunction<CheckGroupRoleAccessQueryVariables>, options: VueApolloComposable.UseQueryOptions<CheckGroupRoleAccessQuery, CheckGroupRoleAccessQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CheckGroupRoleAccessQuery, CheckGroupRoleAccessQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CheckGroupRoleAccessQuery, CheckGroupRoleAccessQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CheckGroupRoleAccessQuery, CheckGroupRoleAccessQueryVariables>(CheckGroupRoleAccessDocument, variables, options);
}
export type CheckGroupRoleAccessQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CheckGroupRoleAccessQuery, CheckGroupRoleAccessQueryVariables>;
export const GetFollowersDocument = gql`
    query getFollowers($userId: String!, $take: Float!, $skip: Float!) {
  getFollowers(userId: $userId, take: $take, skip: $skip) {
    id
    firstname
    lastname
    username
    meFollowing
    avatar {
      id
      name
      blurhash
    }
  }
}
    `;

/**
 * __useGetFollowersQuery__
 *
 * To run a query within a Vue component, call `useGetFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetFollowersQuery({
 *   userId: // value for 'userId'
 *   take: // value for 'take'
 *   skip: // value for 'skip'
 * });
 */
export function useGetFollowersQuery(variables: GetFollowersQueryVariables | VueCompositionApi.Ref<GetFollowersQueryVariables> | ReactiveFunction<GetFollowersQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetFollowersQuery, GetFollowersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFollowersQuery, GetFollowersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFollowersQuery, GetFollowersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetFollowersQuery, GetFollowersQueryVariables>(GetFollowersDocument, variables, options);
}
export type GetFollowersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetFollowersQuery, GetFollowersQueryVariables>;
export const GetFollowingDocument = gql`
    query getFollowing($userId: String!, $take: Float!, $skip: Float!) {
  getFollowing(userId: $userId, take: $take, skip: $skip) {
    id
    firstname
    lastname
    username
    meFollowing
    avatar {
      id
      name
      blurhash
    }
  }
}
    `;

/**
 * __useGetFollowingQuery__
 *
 * To run a query within a Vue component, call `useGetFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetFollowingQuery({
 *   userId: // value for 'userId'
 *   take: // value for 'take'
 *   skip: // value for 'skip'
 * });
 */
export function useGetFollowingQuery(variables: GetFollowingQueryVariables | VueCompositionApi.Ref<GetFollowingQueryVariables> | ReactiveFunction<GetFollowingQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetFollowingQuery, GetFollowingQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFollowingQuery, GetFollowingQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFollowingQuery, GetFollowingQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetFollowingQuery, GetFollowingQueryVariables>(GetFollowingDocument, variables, options);
}
export type GetFollowingQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetFollowingQuery, GetFollowingQueryVariables>;
export const FollowingGroupsDocument = gql`
    query followingGroups($limit: Float!, $offset: Float!) {
  followingGroups(limit: $limit, offset: $offset) {
    id
    name
    description
    type
    numberOfMembers
    previewAvatars {
      name
      blurhash
    }
  }
}
    `;

/**
 * __useFollowingGroupsQuery__
 *
 * To run a query within a Vue component, call `useFollowingGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingGroupsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFollowingGroupsQuery({
 *   limit: // value for 'limit'
 *   offset: // value for 'offset'
 * });
 */
export function useFollowingGroupsQuery(variables: FollowingGroupsQueryVariables | VueCompositionApi.Ref<FollowingGroupsQueryVariables> | ReactiveFunction<FollowingGroupsQueryVariables>, options: VueApolloComposable.UseQueryOptions<FollowingGroupsQuery, FollowingGroupsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FollowingGroupsQuery, FollowingGroupsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FollowingGroupsQuery, FollowingGroupsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FollowingGroupsQuery, FollowingGroupsQueryVariables>(FollowingGroupsDocument, variables, options);
}
export type FollowingGroupsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FollowingGroupsQuery, FollowingGroupsQueryVariables>;
export const GetFeedDocument = gql`
    query getFeed($limit: Float!, $offset: Float!) {
  getFeed(limit: $limit, offset: $offset) {
    id
    liked
    media {
      id
      name
      blurhash
      type
    }
    user {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
    }
    text
    likesCount
    commentCount
    createdAt
    edited
    group {
      id
      name
    }
  }
}
    `;

/**
 * __useGetFeedQuery__
 *
 * To run a query within a Vue component, call `useGetFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetFeedQuery({
 *   limit: // value for 'limit'
 *   offset: // value for 'offset'
 * });
 */
export function useGetFeedQuery(variables: GetFeedQueryVariables | VueCompositionApi.Ref<GetFeedQueryVariables> | ReactiveFunction<GetFeedQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetFeedQuery, GetFeedQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFeedQuery, GetFeedQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFeedQuery, GetFeedQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, variables, options);
}
export type GetFeedQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetFeedQuery, GetFeedQueryVariables>;
export const GetPostsFromGroupDocument = gql`
    query getPostsFromGroup($groupId: String!, $limit: Float!, $offset: Float!) {
  getPostsFromGroup(groupId: $groupId, limit: $limit, offset: $offset) {
    id
    liked
    media {
      id
      name
      blurhash
      type
    }
    user {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
    }
    text
    likesCount
    commentCount
    createdAt
    edited
  }
}
    `;

/**
 * __useGetPostsFromGroupQuery__
 *
 * To run a query within a Vue component, call `useGetPostsFromGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsFromGroupQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetPostsFromGroupQuery({
 *   groupId: // value for 'groupId'
 *   limit: // value for 'limit'
 *   offset: // value for 'offset'
 * });
 */
export function useGetPostsFromGroupQuery(variables: GetPostsFromGroupQueryVariables | VueCompositionApi.Ref<GetPostsFromGroupQueryVariables> | ReactiveFunction<GetPostsFromGroupQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetPostsFromGroupQuery, GetPostsFromGroupQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPostsFromGroupQuery, GetPostsFromGroupQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPostsFromGroupQuery, GetPostsFromGroupQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetPostsFromGroupQuery, GetPostsFromGroupQueryVariables>(GetPostsFromGroupDocument, variables, options);
}
export type GetPostsFromGroupQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetPostsFromGroupQuery, GetPostsFromGroupQueryVariables>;
export const GroupAboutDocument = gql`
    query groupAbout($groupId: String!) {
  groupById(groupId: $groupId) {
    id
    about
    createdBy {
      id
    }
  }
}
    `;

/**
 * __useGroupAboutQuery__
 *
 * To run a query within a Vue component, call `useGroupAboutQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupAboutQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGroupAboutQuery({
 *   groupId: // value for 'groupId'
 * });
 */
export function useGroupAboutQuery(variables: GroupAboutQueryVariables | VueCompositionApi.Ref<GroupAboutQueryVariables> | ReactiveFunction<GroupAboutQueryVariables>, options: VueApolloComposable.UseQueryOptions<GroupAboutQuery, GroupAboutQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GroupAboutQuery, GroupAboutQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GroupAboutQuery, GroupAboutQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GroupAboutQuery, GroupAboutQueryVariables>(GroupAboutDocument, variables, options);
}
export type GroupAboutQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GroupAboutQuery, GroupAboutQueryVariables>;
export const GroupByIdDocument = gql`
    query groupById($groupId: String!) {
  groupById(groupId: $groupId) {
    type
    id
    name
    description
    numberOfPosts
    numberOfMembers
  }
}
    `;

/**
 * __useGroupByIdQuery__
 *
 * To run a query within a Vue component, call `useGroupByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupByIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGroupByIdQuery({
 *   groupId: // value for 'groupId'
 * });
 */
export function useGroupByIdQuery(variables: GroupByIdQueryVariables | VueCompositionApi.Ref<GroupByIdQueryVariables> | ReactiveFunction<GroupByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<GroupByIdQuery, GroupByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GroupByIdQuery, GroupByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GroupByIdQuery, GroupByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GroupByIdQuery, GroupByIdQueryVariables>(GroupByIdDocument, variables, options);
}
export type GroupByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GroupByIdQuery, GroupByIdQueryVariables>;
export const GroupByIdPreviewDocument = gql`
    query groupByIdPreview($groupId: String!) {
  groupByIdPreview(groupId: $groupId) {
    type
    id
    name
    description
    numberOfMembers
  }
}
    `;

/**
 * __useGroupByIdPreviewQuery__
 *
 * To run a query within a Vue component, call `useGroupByIdPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupByIdPreviewQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGroupByIdPreviewQuery({
 *   groupId: // value for 'groupId'
 * });
 */
export function useGroupByIdPreviewQuery(variables: GroupByIdPreviewQueryVariables | VueCompositionApi.Ref<GroupByIdPreviewQueryVariables> | ReactiveFunction<GroupByIdPreviewQueryVariables>, options: VueApolloComposable.UseQueryOptions<GroupByIdPreviewQuery, GroupByIdPreviewQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GroupByIdPreviewQuery, GroupByIdPreviewQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GroupByIdPreviewQuery, GroupByIdPreviewQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GroupByIdPreviewQuery, GroupByIdPreviewQueryVariables>(GroupByIdPreviewDocument, variables, options);
}
export type GroupByIdPreviewQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GroupByIdPreviewQuery, GroupByIdPreviewQueryVariables>;
export const GroupMembersDocument = gql`
    query groupMembers($groupId: String!) {
  groupById(groupId: $groupId) {
    id
    createdBy {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
      onlineStatus
    }
    members {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
      onlineStatus
      groupRole
    }
  }
}
    `;

/**
 * __useGroupMembersQuery__
 *
 * To run a query within a Vue component, call `useGroupMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupMembersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGroupMembersQuery({
 *   groupId: // value for 'groupId'
 * });
 */
export function useGroupMembersQuery(variables: GroupMembersQueryVariables | VueCompositionApi.Ref<GroupMembersQueryVariables> | ReactiveFunction<GroupMembersQueryVariables>, options: VueApolloComposable.UseQueryOptions<GroupMembersQuery, GroupMembersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GroupMembersQuery, GroupMembersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GroupMembersQuery, GroupMembersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GroupMembersQuery, GroupMembersQueryVariables>(GroupMembersDocument, variables, options);
}
export type GroupMembersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GroupMembersQuery, GroupMembersQueryVariables>;
export const GroupsDocument = gql`
    query groups($limit: Float!, $offset: Float!) {
  groups(limit: $limit, offset: $offset) {
    id
    name
    description
    numberOfMembers
    type
    previewAvatars {
      name
      blurhash
    }
  }
}
    `;

/**
 * __useGroupsQuery__
 *
 * To run a query within a Vue component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGroupsQuery({
 *   limit: // value for 'limit'
 *   offset: // value for 'offset'
 * });
 */
export function useGroupsQuery(variables: GroupsQueryVariables | VueCompositionApi.Ref<GroupsQueryVariables> | ReactiveFunction<GroupsQueryVariables>, options: VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, variables, options);
}
export type GroupsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GroupsQuery, GroupsQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    avatar {
      id
      name
      blurhash
    }
    firstname
    lastname
    username
    roles {
      id
      name
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;
export const MediaFromGroupDocument = gql`
    query mediaFromGroup($groupId: String!) {
  mediaFromGroup(groupId: $groupId) {
    id
    type
    name
    blurhash
    createdAt
    createdByName
  }
}
    `;

/**
 * __useMediaFromGroupQuery__
 *
 * To run a query within a Vue component, call `useMediaFromGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useMediaFromGroupQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMediaFromGroupQuery({
 *   groupId: // value for 'groupId'
 * });
 */
export function useMediaFromGroupQuery(variables: MediaFromGroupQueryVariables | VueCompositionApi.Ref<MediaFromGroupQueryVariables> | ReactiveFunction<MediaFromGroupQueryVariables>, options: VueApolloComposable.UseQueryOptions<MediaFromGroupQuery, MediaFromGroupQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MediaFromGroupQuery, MediaFromGroupQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MediaFromGroupQuery, MediaFromGroupQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MediaFromGroupQuery, MediaFromGroupQueryVariables>(MediaFromGroupDocument, variables, options);
}
export type MediaFromGroupQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MediaFromGroupQuery, MediaFromGroupQueryVariables>;
export const MyChatsDocument = gql`
    query myChats {
  myChats {
    id
    lastMessage {
      id
      content
      createdAt
    }
    members {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
    }
  }
}
    `;

/**
 * __useMyChatsQuery__
 *
 * To run a query within a Vue component, call `useMyChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyChatsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMyChatsQuery();
 */
export function useMyChatsQuery(options: VueApolloComposable.UseQueryOptions<MyChatsQuery, MyChatsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MyChatsQuery, MyChatsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MyChatsQuery, MyChatsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MyChatsQuery, MyChatsQueryVariables>(MyChatsDocument, {}, options);
}
export type MyChatsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MyChatsQuery, MyChatsQueryVariables>;
export const MyGroupsDocument = gql`
    query myGroups($limit: Float!, $offset: Float!) {
  myGroups(limit: $limit, offset: $offset) {
    id
    name
    description
    numberOfMembers
    type
    previewAvatars {
      name
      blurhash
    }
  }
}
    `;

/**
 * __useMyGroupsQuery__
 *
 * To run a query within a Vue component, call `useMyGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyGroupsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMyGroupsQuery({
 *   limit: // value for 'limit'
 *   offset: // value for 'offset'
 * });
 */
export function useMyGroupsQuery(variables: MyGroupsQueryVariables | VueCompositionApi.Ref<MyGroupsQueryVariables> | ReactiveFunction<MyGroupsQueryVariables>, options: VueApolloComposable.UseQueryOptions<MyGroupsQuery, MyGroupsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MyGroupsQuery, MyGroupsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MyGroupsQuery, MyGroupsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MyGroupsQuery, MyGroupsQueryVariables>(MyGroupsDocument, variables, options);
}
export type MyGroupsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MyGroupsQuery, MyGroupsQueryVariables>;
export const GetNotificationsDocument = gql`
    query getNotifications {
  getNotifications {
    id
    type
    message
    createdAt
    chatMessage {
      content
    }
    toUser {
      id
      avatar {
        id
        name
        blurhash
      }
      username
    }
    fromUser {
      id
      avatar {
        id
        name
        blurhash
      }
      username
    }
    post {
      id
    }
    chat {
      id
    }
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a Vue component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetNotificationsQuery();
 */
export function useGetNotificationsQuery(options: VueApolloComposable.UseQueryOptions<GetNotificationsQuery, GetNotificationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetNotificationsQuery, GetNotificationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetNotificationsQuery, GetNotificationsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, {}, options);
}
export type GetNotificationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const PostByIdDocument = gql`
    query postById($postId: String!) {
  postById(postId: $postId) {
    id
    liked
    media {
      id
      name
      blurhash
      type
    }
    text
    likesCount
    commentCount
    createdAt
    edited
    user {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
    }
    comments {
      id
      text
      createdAt
      user {
        id
        firstname
        lastname
        username
        avatar {
          id
          name
          blurhash
        }
      }
    }
    group {
      id
      name
    }
  }
}
    `;

/**
 * __usePostByIdQuery__
 *
 * To run a query within a Vue component, call `usePostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostByIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePostByIdQuery({
 *   postId: // value for 'postId'
 * });
 */
export function usePostByIdQuery(variables: PostByIdQueryVariables | VueCompositionApi.Ref<PostByIdQueryVariables> | ReactiveFunction<PostByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<PostByIdQuery, PostByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PostByIdQuery, PostByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PostByIdQuery, PostByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<PostByIdQuery, PostByIdQueryVariables>(PostByIdDocument, variables, options);
}
export type PostByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PostByIdQuery, PostByIdQueryVariables>;
export const GetPostsFromUserDocument = gql`
    query getPostsFromUser($userID: String!, $limit: Float!, $offset: Float!) {
  getPostsFromUser(userID: $userID, limit: $limit, offset: $offset) {
    id
    liked
    media {
      id
      name
      blurhash
      type
    }
    user {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
    }
    text
    likesCount
    commentCount
    createdAt
    edited
  }
}
    `;

/**
 * __useGetPostsFromUserQuery__
 *
 * To run a query within a Vue component, call `useGetPostsFromUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsFromUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetPostsFromUserQuery({
 *   userID: // value for 'userID'
 *   limit: // value for 'limit'
 *   offset: // value for 'offset'
 * });
 */
export function useGetPostsFromUserQuery(variables: GetPostsFromUserQueryVariables | VueCompositionApi.Ref<GetPostsFromUserQueryVariables> | ReactiveFunction<GetPostsFromUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetPostsFromUserQuery, GetPostsFromUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>(GetPostsFromUserDocument, variables, options);
}
export type GetPostsFromUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>;
export const RecommendedUsersInterestsDocument = gql`
    query recommendedUsersInterests {
  recommendedUsersInterests {
    id
    firstname
    lastname
    username
    meFollowing
    avatar {
      id
      name
      blurhash
    }
  }
}
    `;

/**
 * __useRecommendedUsersInterestsQuery__
 *
 * To run a query within a Vue component, call `useRecommendedUsersInterestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendedUsersInterestsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRecommendedUsersInterestsQuery();
 */
export function useRecommendedUsersInterestsQuery(options: VueApolloComposable.UseQueryOptions<RecommendedUsersInterestsQuery, RecommendedUsersInterestsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RecommendedUsersInterestsQuery, RecommendedUsersInterestsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RecommendedUsersInterestsQuery, RecommendedUsersInterestsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RecommendedUsersInterestsQuery, RecommendedUsersInterestsQueryVariables>(RecommendedUsersInterestsDocument, {}, options);
}
export type RecommendedUsersInterestsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RecommendedUsersInterestsQuery, RecommendedUsersInterestsQueryVariables>;
export const RecommendedUsersFacultyDocument = gql`
    query recommendedUsersFaculty {
  recommendedUsersFaculty {
    id
    firstname
    lastname
    username
    meFollowing
    avatar {
      id
      name
      blurhash
    }
  }
}
    `;

/**
 * __useRecommendedUsersFacultyQuery__
 *
 * To run a query within a Vue component, call `useRecommendedUsersFacultyQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendedUsersFacultyQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRecommendedUsersFacultyQuery();
 */
export function useRecommendedUsersFacultyQuery(options: VueApolloComposable.UseQueryOptions<RecommendedUsersFacultyQuery, RecommendedUsersFacultyQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RecommendedUsersFacultyQuery, RecommendedUsersFacultyQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RecommendedUsersFacultyQuery, RecommendedUsersFacultyQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RecommendedUsersFacultyQuery, RecommendedUsersFacultyQueryVariables>(RecommendedUsersFacultyDocument, {}, options);
}
export type RecommendedUsersFacultyQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RecommendedUsersFacultyQuery, RecommendedUsersFacultyQueryVariables>;
export const SearchDocument = gql`
    query search($searchString: String!) {
  search(searchString: $searchString) {
    users {
      id
      firstname
      lastname
      username
      avatar {
        id
        name
        blurhash
      }
    }
    groups {
      id
      name
    }
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a Vue component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSearchQuery({
 *   searchString: // value for 'searchString'
 * });
 */
export function useSearchQuery(variables: SearchQueryVariables | VueCompositionApi.Ref<SearchQueryVariables> | ReactiveFunction<SearchQueryVariables>, options: VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, variables, options);
}
export type SearchQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SearchQuery, SearchQueryVariables>;
export const UserByIdDocument = gql`
    query userById($userId: String!) {
  userById(userId: $userId) {
    id
    firstname
    lastname
    avatar {
      id
      name
      blurhash
    }
    username
    followers {
      id
      firstname
      lastname
      avatar {
        id
        name
        blurhash
      }
    }
    following {
      id
      firstname
      lastname
      avatar {
        id
        name
        blurhash
      }
    }
  }
}
    `;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a Vue component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserByIdQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useUserByIdQuery(variables: UserByIdQueryVariables | VueCompositionApi.Ref<UserByIdQueryVariables> | ReactiveFunction<UserByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserByIdQuery, UserByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserByIdQuery, UserByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserByIdQuery, UserByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, variables, options);
}
export type UserByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserByIdQuery, UserByIdQueryVariables>;
export const UserByUsernameDocument = gql`
    query userByUsername($username: String!) {
  userByUsername(username: $username) {
    id
    bio
    studyCourse
    faculty
    interests
    firstname
    lastname
    roles {
      id
      name
    }
    avatar {
      id
      name
      blurhash
    }
    username
    meFollowing
  }
}
    `;

/**
 * __useUserByUsernameQuery__
 *
 * To run a query within a Vue component, call `useUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByUsernameQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserByUsernameQuery({
 *   username: // value for 'username'
 * });
 */
export function useUserByUsernameQuery(variables: UserByUsernameQueryVariables | VueCompositionApi.Ref<UserByUsernameQueryVariables> | ReactiveFunction<UserByUsernameQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserByUsernameQuery, UserByUsernameQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserByUsernameQuery, UserByUsernameQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserByUsernameQuery, UserByUsernameQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserByUsernameQuery, UserByUsernameQueryVariables>(UserByUsernameDocument, variables, options);
}
export type UserByUsernameQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserByUsernameQuery, UserByUsernameQueryVariables>;
export const UserStatsDocument = gql`
    query userStats($userId: String!) {
  userStats(userId: $userId) {
    postCount
    followerCount
    followingCount
  }
}
    `;

/**
 * __useUserStatsQuery__
 *
 * To run a query within a Vue component, call `useUserStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStatsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserStatsQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useUserStatsQuery(variables: UserStatsQueryVariables | VueCompositionApi.Ref<UserStatsQueryVariables> | ReactiveFunction<UserStatsQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserStatsQuery, UserStatsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserStatsQuery, UserStatsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserStatsQuery, UserStatsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, variables, options);
}
export type UserStatsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserStatsQuery, UserStatsQueryVariables>;
export const NotificationsDocument = gql`
    subscription notifications($userId: String!) {
  notifications(userId: $userId) {
    id
    type
    message
    createdAt
    chatMessage {
      content
    }
    fromUser {
      id
      username
      avatar {
        id
        name
        blurhash
      }
    }
    toUser {
      id
      username
    }
    post {
      id
    }
    chat {
      id
    }
  }
}
    `;

/**
 * __useNotificationsSubscription__
 *
 * To run a query within a Vue component, call `useNotificationsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useNotificationsSubscription({
 *   userId: // value for 'userId'
 * });
 */
export function useNotificationsSubscription(variables: NotificationsSubscriptionVariables | VueCompositionApi.Ref<NotificationsSubscriptionVariables> | ReactiveFunction<NotificationsSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<NotificationsSubscription, NotificationsSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<NotificationsSubscription, NotificationsSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<NotificationsSubscription, NotificationsSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<NotificationsSubscription, NotificationsSubscriptionVariables>(NotificationsDocument, variables, options);
}
export type NotificationsSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<NotificationsSubscription, NotificationsSubscriptionVariables>;