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

export type Query = {
  __typename?: 'Query';
  /** getPosts returns all posts from a given userID */
  getPostsFromUser?: Maybe<Array<Post>>;
  /** getPosts returns all posts from a given groupID */
  getPostsFromGroup?: Maybe<Array<Post>>;
  getFeed: Array<Post>;
  postById: Post;
  getRoles: Array<Role>;
  getUsers: Array<User>;
  /** Me returns User info when logged in. */
  me?: Maybe<User>;
  userById: User;
};


export type QueryGetPostsFromUserArgs = {
  userID: Scalars['String'];
};


export type QueryGetPostsFromGroupArgs = {
  groupID: Scalars['String'];
};


export type QueryPostByIdArgs = {
  postId: Scalars['String'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  user: User;
  group?: Maybe<Group>;
  text: Scalars['String'];
  comments: Array<Comment>;
  likes: Array<Like>;
  likesCount: Scalars['Float'];
  liked: Scalars['Boolean'];
  imageLink?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  profilePicLink?: Maybe<Scalars['String']>;
  bio: Scalars['String'];
  roles: Array<Role>;
  posts: Array<Post>;
  followers: Array<User>;
  following: Array<User>;
  groups: Array<Group>;
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  users: Array<User>;
};

export type Group = {
  __typename?: 'Group';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  description: Scalars['String'];
  posts: Array<Post>;
  members: Array<User>;
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

export type Like = {
  __typename?: 'Like';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  likeComment: Comment;
  unlikeComment: Comment;
  createGroup: Group;
  joinGroup: Group;
  addPost: Post;
  likePost: Post;
  unlikePost: Post;
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


export type MutationJoinGroupArgs = {
  groupID: Scalars['String'];
};


export type MutationAddPostArgs = {
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


export type RoleValidator = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type UserValidator = {
  firstName: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type JwtResponse = {
  __typename?: 'JwtResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type AddFollowerMutationVariables = Exact<{
  userID: Scalars['String'];
}>;


export type AddFollowerMutation = (
  { __typename?: 'Mutation' }
  & { addFollower: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink'>
  ) }
);

export type AddPostMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'firstname' | 'lastname' | 'profilePicLink'>
    ) }
  ) }
);

export type LikePostMutationVariables = Exact<{
  postID: Scalars['String'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & { likePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'firstname' | 'lastname' | 'profilePicLink'>
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
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink'>
  ) }
);

export type UnlikePostMutationVariables = Exact<{
  postID: Scalars['String'];
}>;


export type UnlikePostMutation = (
  { __typename?: 'Mutation' }
  & { unlikePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'firstname' | 'lastname' | 'profilePicLink'>
    ) }
  ) }
);

export type GetFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeedQuery = (
  { __typename?: 'Query' }
  & { getFeed: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'profilePicLink' | 'firstname' | 'lastname'>
  )> }
);

export type GetPostsFromUserQueryVariables = Exact<{
  userID: Scalars['String'];
}>;


export type GetPostsFromUserQuery = (
  { __typename?: 'Query' }
  & { getPostsFromUser?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'liked' | 'text' | 'likesCount' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'firstname' | 'lastname' | 'profilePicLink'>
    ) }
  )>> }
);

export type UserByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink'>
    & { followers: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink'>
    )>, following: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstname' | 'lastname' | 'profilePicLink'>
    )> }
  ) }
);