import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;

export const AddFollowerDocument = gql`
    mutation addFollower($userID: String!) {
  addFollower(userID: $userID) {
    id
    firstname
    lastname
    profilePicLink
    username
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
export function useAddFollowerMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.AddFollowerMutation, graphqlOperations.ts.AddFollowerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.AddFollowerMutation, graphqlOperations.ts.AddFollowerMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.AddFollowerMutation, graphqlOperations.ts.AddFollowerMutationVariables>(AddFollowerDocument, options);
}
export type AddFollowerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.AddFollowerMutation, graphqlOperations.ts.AddFollowerMutationVariables>;
export const AddPostDocument = gql`
    mutation addPost($text: String!, $file: Upload, $tags: [String!], $groupID: String) {
  addPost(text: $text, file: $file, tags: $tags, groupID: $groupID) {
    id
    liked
    imageLink
    user {
      firstname
      lastname
      profilePicLink
      username
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
 *     text: // value for 'text'
 *     file: // value for 'file'
 *     tags: // value for 'tags'
 *     groupID: // value for 'groupID'
 *   },
 * });
 */
export function useAddPostMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.AddPostMutation, graphqlOperations.ts.AddPostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.AddPostMutation, graphqlOperations.ts.AddPostMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.AddPostMutation, graphqlOperations.ts.AddPostMutationVariables>(AddPostDocument, options);
}
export type AddPostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.AddPostMutation, graphqlOperations.ts.AddPostMutationVariables>;
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
export function useAddCommentMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.AddCommentMutation, graphqlOperations.ts.AddCommentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.AddCommentMutation, graphqlOperations.ts.AddCommentMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.AddCommentMutation, graphqlOperations.ts.AddCommentMutationVariables>(AddCommentDocument, options);
}
export type AddCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.AddCommentMutation, graphqlOperations.ts.AddCommentMutationVariables>;
export const CreateGroupDocument = gql`
    mutation createGroup($name: String!, $groupType: GroupType!, $description: String) {
  createGroup(name: $name, groupType: $groupType, description: $description) {
    id
    name
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
 *   },
 * });
 */
export function useCreateGroupMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.CreateGroupMutation, graphqlOperations.ts.CreateGroupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.CreateGroupMutation, graphqlOperations.ts.CreateGroupMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.CreateGroupMutation, graphqlOperations.ts.CreateGroupMutationVariables>(CreateGroupDocument, options);
}
export type CreateGroupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.CreateGroupMutation, graphqlOperations.ts.CreateGroupMutationVariables>;
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
export function useDeleteNotificationMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.DeleteNotificationMutation, graphqlOperations.ts.DeleteNotificationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.DeleteNotificationMutation, graphqlOperations.ts.DeleteNotificationMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.DeleteNotificationMutation, graphqlOperations.ts.DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
}
export type DeleteNotificationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.DeleteNotificationMutation, graphqlOperations.ts.DeleteNotificationMutationVariables>;
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
export function useDeletePostMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.DeletePostMutation, graphqlOperations.ts.DeletePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.DeletePostMutation, graphqlOperations.ts.DeletePostMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.DeletePostMutation, graphqlOperations.ts.DeletePostMutationVariables>(DeletePostDocument, options);
}
export type DeletePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.DeletePostMutation, graphqlOperations.ts.DeletePostMutationVariables>;
export const EditPostDocument = gql`
    mutation editPost($postId: String!, $text: String!) {
  editPost(text: $text, postId: $postId) {
    id
    liked
    imageLink
    user {
      firstname
      lastname
      profilePicLink
      username
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
 *     postId: // value for 'postId'
 *     text: // value for 'text'
 *   },
 * });
 */
export function useEditPostMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.EditPostMutation, graphqlOperations.ts.EditPostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.EditPostMutation, graphqlOperations.ts.EditPostMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.EditPostMutation, graphqlOperations.ts.EditPostMutationVariables>(EditPostDocument, options);
}
export type EditPostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.EditPostMutation, graphqlOperations.ts.EditPostMutationVariables>;
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
export function useJoinGroupMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.JoinGroupMutation, graphqlOperations.ts.JoinGroupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.JoinGroupMutation, graphqlOperations.ts.JoinGroupMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.JoinGroupMutation, graphqlOperations.ts.JoinGroupMutationVariables>(JoinGroupDocument, options);
}
export type JoinGroupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.JoinGroupMutation, graphqlOperations.ts.JoinGroupMutationVariables>;
export const LikePostDocument = gql`
    mutation likePost($postID: String!) {
  likePost(postID: $postID) {
    id
    liked
    imageLink
    user {
      id
      firstname
      lastname
      username
      profilePicLink
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
export function useLikePostMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.LikePostMutation, graphqlOperations.ts.LikePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.LikePostMutation, graphqlOperations.ts.LikePostMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.LikePostMutation, graphqlOperations.ts.LikePostMutationVariables>(LikePostDocument, options);
}
export type LikePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.LikePostMutation, graphqlOperations.ts.LikePostMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
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
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.LoginMutation, graphqlOperations.ts.LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.LoginMutation, graphqlOperations.ts.LoginMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.LoginMutation, graphqlOperations.ts.LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.LoginMutation, graphqlOperations.ts.LoginMutationVariables>;
export const RemoveFollowerDocument = gql`
    mutation removeFollower($userID: String!) {
  removeFollower(userID: $userID) {
    id
    firstname
    lastname
    profilePicLink
    username
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
export function useRemoveFollowerMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.RemoveFollowerMutation, graphqlOperations.ts.RemoveFollowerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.RemoveFollowerMutation, graphqlOperations.ts.RemoveFollowerMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.RemoveFollowerMutation, graphqlOperations.ts.RemoveFollowerMutationVariables>(RemoveFollowerDocument, options);
}
export type RemoveFollowerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.RemoveFollowerMutation, graphqlOperations.ts.RemoveFollowerMutationVariables>;
export const UnlikePostDocument = gql`
    mutation unlikePost($postID: String!) {
  unlikePost(postID: $postID) {
    id
    liked
    imageLink
    user {
      id
      firstname
      lastname
      username
      profilePicLink
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
export function useUnlikePostMutation(options: VueApolloComposable.UseMutationOptions<graphqlOperations.ts.UnlikePostMutation, graphqlOperations.ts.UnlikePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<graphqlOperations.ts.UnlikePostMutation, graphqlOperations.ts.UnlikePostMutationVariables>>) {
  return VueApolloComposable.useMutation<graphqlOperations.ts.UnlikePostMutation, graphqlOperations.ts.UnlikePostMutationVariables>(UnlikePostDocument, options);
}
export type UnlikePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<graphqlOperations.ts.UnlikePostMutation, graphqlOperations.ts.UnlikePostMutationVariables>;
export const BrowsePostsDocument = gql`
    query browsePosts($take: Float!, $skip: Float!, $tags: [String!]) {
  browsePosts(take: $take, skip: $skip, tags: $tags) {
    id
    liked
    imageLink
    user {
      id
      firstname
      lastname
      username
      profilePicLink
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
 * });
 */
export function useBrowsePostsQuery(variables: graphqlOperations.ts.BrowsePostsQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.BrowsePostsQueryVariables> | ReactiveFunction<graphqlOperations.ts.BrowsePostsQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.BrowsePostsQuery, graphqlOperations.ts.BrowsePostsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.BrowsePostsQuery, graphqlOperations.ts.BrowsePostsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.BrowsePostsQuery, graphqlOperations.ts.BrowsePostsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.BrowsePostsQuery, graphqlOperations.ts.BrowsePostsQueryVariables>(BrowsePostsDocument, variables, options);
}
export type BrowsePostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.BrowsePostsQuery, graphqlOperations.ts.BrowsePostsQueryVariables>;
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
export function useCheckGroupAccessQuery(variables: graphqlOperations.ts.CheckGroupAccessQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.CheckGroupAccessQueryVariables> | ReactiveFunction<graphqlOperations.ts.CheckGroupAccessQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.CheckGroupAccessQuery, graphqlOperations.ts.CheckGroupAccessQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.CheckGroupAccessQuery, graphqlOperations.ts.CheckGroupAccessQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.CheckGroupAccessQuery, graphqlOperations.ts.CheckGroupAccessQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.CheckGroupAccessQuery, graphqlOperations.ts.CheckGroupAccessQueryVariables>(CheckGroupAccessDocument, variables, options);
}
export type CheckGroupAccessQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.CheckGroupAccessQuery, graphqlOperations.ts.CheckGroupAccessQueryVariables>;
export const FollowersDocument = gql`
    query followers($userId: String!, $take: Float!, $skip: Float!) {
  followers(userId: $userId, take: $take, skip: $skip) {
    id
    firstname
    lastname
    username
    profilePicLink
  }
}
    `;

/**
 * __useFollowersQuery__
 *
 * To run a query within a Vue component, call `useFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFollowersQuery({
 *   userId: // value for 'userId'
 *   take: // value for 'take'
 *   skip: // value for 'skip'
 * });
 */
export function useFollowersQuery(variables: graphqlOperations.ts.FollowersQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.FollowersQueryVariables> | ReactiveFunction<graphqlOperations.ts.FollowersQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.FollowersQuery, graphqlOperations.ts.FollowersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.FollowersQuery, graphqlOperations.ts.FollowersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.FollowersQuery, graphqlOperations.ts.FollowersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.FollowersQuery, graphqlOperations.ts.FollowersQueryVariables>(FollowersDocument, variables, options);
}
export type FollowersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.FollowersQuery, graphqlOperations.ts.FollowersQueryVariables>;
export const FollowingDocument = gql`
    query following($userId: String!, $take: Float!, $skip: Float!) {
  following(userId: $userId, take: $take, skip: $skip) {
    id
    firstname
    lastname
    username
    profilePicLink
  }
}
    `;

/**
 * __useFollowingQuery__
 *
 * To run a query within a Vue component, call `useFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFollowingQuery({
 *   userId: // value for 'userId'
 *   take: // value for 'take'
 *   skip: // value for 'skip'
 * });
 */
export function useFollowingQuery(variables: graphqlOperations.ts.FollowingQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.FollowingQueryVariables> | ReactiveFunction<graphqlOperations.ts.FollowingQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.FollowingQuery, graphqlOperations.ts.FollowingQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.FollowingQuery, graphqlOperations.ts.FollowingQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.FollowingQuery, graphqlOperations.ts.FollowingQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.FollowingQuery, graphqlOperations.ts.FollowingQueryVariables>(FollowingDocument, variables, options);
}
export type FollowingQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.FollowingQuery, graphqlOperations.ts.FollowingQueryVariables>;
export const GetFeedDocument = gql`
    query getFeed($take: Float!, $skip: Float!) {
  getFeed(take: $take, skip: $skip) {
    id
    liked
    imageLink
    user {
      id
      firstname
      lastname
      username
      profilePicLink
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
 *   take: // value for 'take'
 *   skip: // value for 'skip'
 * });
 */
export function useGetFeedQuery(variables: graphqlOperations.ts.GetFeedQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.GetFeedQueryVariables> | ReactiveFunction<graphqlOperations.ts.GetFeedQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetFeedQuery, graphqlOperations.ts.GetFeedQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetFeedQuery, graphqlOperations.ts.GetFeedQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetFeedQuery, graphqlOperations.ts.GetFeedQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.GetFeedQuery, graphqlOperations.ts.GetFeedQueryVariables>(GetFeedDocument, variables, options);
}
export type GetFeedQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.GetFeedQuery, graphqlOperations.ts.GetFeedQueryVariables>;
export const GetPostsFromGroupDocument = gql`
    query getPostsFromGroup($groupId: String!) {
  getPostsFromGroup(groupId: $groupId) {
    id
    liked
    imageLink
    user {
      id
      firstname
      lastname
      username
      profilePicLink
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
 * });
 */
export function useGetPostsFromGroupQuery(variables: graphqlOperations.ts.GetPostsFromGroupQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.GetPostsFromGroupQueryVariables> | ReactiveFunction<graphqlOperations.ts.GetPostsFromGroupQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetPostsFromGroupQuery, graphqlOperations.ts.GetPostsFromGroupQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetPostsFromGroupQuery, graphqlOperations.ts.GetPostsFromGroupQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetPostsFromGroupQuery, graphqlOperations.ts.GetPostsFromGroupQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.GetPostsFromGroupQuery, graphqlOperations.ts.GetPostsFromGroupQueryVariables>(GetPostsFromGroupDocument, variables, options);
}
export type GetPostsFromGroupQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.GetPostsFromGroupQuery, graphqlOperations.ts.GetPostsFromGroupQueryVariables>;
export const GroupByIdDocument = gql`
    query groupById($groupId: String!) {
  groupById(groupId: $groupId) {
    id
    name
    description
    numberOfPosts
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
export function useGroupByIdQuery(variables: graphqlOperations.ts.GroupByIdQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.GroupByIdQueryVariables> | ReactiveFunction<graphqlOperations.ts.GroupByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GroupByIdQuery, graphqlOperations.ts.GroupByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GroupByIdQuery, graphqlOperations.ts.GroupByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GroupByIdQuery, graphqlOperations.ts.GroupByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.GroupByIdQuery, graphqlOperations.ts.GroupByIdQueryVariables>(GroupByIdDocument, variables, options);
}
export type GroupByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.GroupByIdQuery, graphqlOperations.ts.GroupByIdQueryVariables>;
export const GroupsDocument = gql`
    query groups($take: Float!, $skip: Float!) {
  groups(take: $take, skip: $skip) {
    id
    name
    description
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
 *   take: // value for 'take'
 *   skip: // value for 'skip'
 * });
 */
export function useGroupsQuery(variables: graphqlOperations.ts.GroupsQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.GroupsQueryVariables> | ReactiveFunction<graphqlOperations.ts.GroupsQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GroupsQuery, graphqlOperations.ts.GroupsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GroupsQuery, graphqlOperations.ts.GroupsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GroupsQuery, graphqlOperations.ts.GroupsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.GroupsQuery, graphqlOperations.ts.GroupsQueryVariables>(GroupsDocument, variables, options);
}
export type GroupsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.GroupsQuery, graphqlOperations.ts.GroupsQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    profilePicLink
    firstname
    lastname
    username
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
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.MeQuery, graphqlOperations.ts.MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.MeQuery, graphqlOperations.ts.MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.MeQuery, graphqlOperations.ts.MeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.MeQuery, graphqlOperations.ts.MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.MeQuery, graphqlOperations.ts.MeQueryVariables>;
export const GetNotificationsDocument = gql`
    query getNotifications {
  getNotifications {
    id
    type
    message
    createdAt
    toUser {
      id
      profilePicLink
      username
    }
    fromUser {
      id
      profilePicLink
      username
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
export function useGetNotificationsQuery(options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetNotificationsQuery, graphqlOperations.ts.GetNotificationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetNotificationsQuery, graphqlOperations.ts.GetNotificationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetNotificationsQuery, graphqlOperations.ts.GetNotificationsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.GetNotificationsQuery, graphqlOperations.ts.GetNotificationsQueryVariables>(GetNotificationsDocument, {}, options);
}
export type GetNotificationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.GetNotificationsQuery, graphqlOperations.ts.GetNotificationsQueryVariables>;
export const PostByIdDocument = gql`
    query postById($postId: String!) {
  postById(postId: $postId) {
    id
    liked
    imageLink
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
      profilePicLink
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
        profilePicLink
      }
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
export function usePostByIdQuery(variables: graphqlOperations.ts.PostByIdQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.PostByIdQueryVariables> | ReactiveFunction<graphqlOperations.ts.PostByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.PostByIdQuery, graphqlOperations.ts.PostByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.PostByIdQuery, graphqlOperations.ts.PostByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.PostByIdQuery, graphqlOperations.ts.PostByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.PostByIdQuery, graphqlOperations.ts.PostByIdQueryVariables>(PostByIdDocument, variables, options);
}
export type PostByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.PostByIdQuery, graphqlOperations.ts.PostByIdQueryVariables>;
export const GetPostsFromUserDocument = gql`
    query getPostsFromUser($userID: String!, $take: Float!, $skip: Float!) {
  getPostsFromUser(userID: $userID, take: $take, skip: $skip) {
    id
    liked
    imageLink
    user {
      id
      firstname
      lastname
      username
      profilePicLink
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
 *   take: // value for 'take'
 *   skip: // value for 'skip'
 * });
 */
export function useGetPostsFromUserQuery(variables: graphqlOperations.ts.GetPostsFromUserQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.GetPostsFromUserQueryVariables> | ReactiveFunction<graphqlOperations.ts.GetPostsFromUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetPostsFromUserQuery, graphqlOperations.ts.GetPostsFromUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetPostsFromUserQuery, graphqlOperations.ts.GetPostsFromUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetPostsFromUserQuery, graphqlOperations.ts.GetPostsFromUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.GetPostsFromUserQuery, graphqlOperations.ts.GetPostsFromUserQueryVariables>(GetPostsFromUserDocument, variables, options);
}
export type GetPostsFromUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.GetPostsFromUserQuery, graphqlOperations.ts.GetPostsFromUserQueryVariables>;
export const SearchDocument = gql`
    query search($searchString: String!) {
  search(searchString: $searchString) {
    users {
      id
      firstname
      lastname
      username
      profilePicLink
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
export function useSearchQuery(variables: graphqlOperations.ts.SearchQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.SearchQueryVariables> | ReactiveFunction<graphqlOperations.ts.SearchQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.SearchQuery, graphqlOperations.ts.SearchQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.SearchQuery, graphqlOperations.ts.SearchQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.SearchQuery, graphqlOperations.ts.SearchQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.SearchQuery, graphqlOperations.ts.SearchQueryVariables>(SearchDocument, variables, options);
}
export type SearchQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.SearchQuery, graphqlOperations.ts.SearchQueryVariables>;
export const UserByIdDocument = gql`
    query userById($userId: String!) {
  userById(userId: $userId) {
    id
    firstname
    lastname
    profilePicLink
    username
    followers {
      id
      firstname
      lastname
      profilePicLink
    }
    following {
      id
      firstname
      lastname
      profilePicLink
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
export function useUserByIdQuery(variables: graphqlOperations.ts.UserByIdQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.UserByIdQueryVariables> | ReactiveFunction<graphqlOperations.ts.UserByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.UserByIdQuery, graphqlOperations.ts.UserByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.UserByIdQuery, graphqlOperations.ts.UserByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.UserByIdQuery, graphqlOperations.ts.UserByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.UserByIdQuery, graphqlOperations.ts.UserByIdQueryVariables>(UserByIdDocument, variables, options);
}
export type UserByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.UserByIdQuery, graphqlOperations.ts.UserByIdQueryVariables>;
export const UserByUsernameDocument = gql`
    query userByUsername($username: String!) {
  userByUsername(username: $username) {
    id
    bio
    firstname
    lastname
    profilePicLink
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
export function useUserByUsernameQuery(variables: graphqlOperations.ts.UserByUsernameQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.UserByUsernameQueryVariables> | ReactiveFunction<graphqlOperations.ts.UserByUsernameQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.UserByUsernameQuery, graphqlOperations.ts.UserByUsernameQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.UserByUsernameQuery, graphqlOperations.ts.UserByUsernameQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.UserByUsernameQuery, graphqlOperations.ts.UserByUsernameQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.UserByUsernameQuery, graphqlOperations.ts.UserByUsernameQueryVariables>(UserByUsernameDocument, variables, options);
}
export type UserByUsernameQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.UserByUsernameQuery, graphqlOperations.ts.UserByUsernameQueryVariables>;
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
export function useUserStatsQuery(variables: graphqlOperations.ts.UserStatsQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.UserStatsQueryVariables> | ReactiveFunction<graphqlOperations.ts.UserStatsQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.UserStatsQuery, graphqlOperations.ts.UserStatsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.UserStatsQuery, graphqlOperations.ts.UserStatsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.UserStatsQuery, graphqlOperations.ts.UserStatsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.UserStatsQuery, graphqlOperations.ts.UserStatsQueryVariables>(UserStatsDocument, variables, options);
}
export type UserStatsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.UserStatsQuery, graphqlOperations.ts.UserStatsQueryVariables>;
export const NotificationsDocument = gql`
    subscription notifications($userId: String!) {
  notifications(userId: $userId) {
    id
    type
    message
    createdAt
    fromUser {
      id
      username
      profilePicLink
    }
    toUser {
      id
      username
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
export function useNotificationsSubscription(variables: graphqlOperations.ts.NotificationsSubscriptionVariables | VueCompositionApi.Ref<graphqlOperations.ts.NotificationsSubscriptionVariables> | ReactiveFunction<graphqlOperations.ts.NotificationsSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<graphqlOperations.ts.NotificationsSubscription, graphqlOperations.ts.NotificationsSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<graphqlOperations.ts.NotificationsSubscription, graphqlOperations.ts.NotificationsSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<graphqlOperations.ts.NotificationsSubscription, graphqlOperations.ts.NotificationsSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<graphqlOperations.ts.NotificationsSubscription, graphqlOperations.ts.NotificationsSubscriptionVariables>(NotificationsDocument, variables, options);
}
export type NotificationsSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<graphqlOperations.ts.NotificationsSubscription, graphqlOperations.ts.NotificationsSubscriptionVariables>;