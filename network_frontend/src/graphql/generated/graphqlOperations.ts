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
    mutation addPost($text: String!, $file: Upload) {
  addPost(text: $text, file: $file) {
    id
    liked
    imageLink
    user {
      firstname
      lastname
      profilePicLink
    }
    text
    likesCount
    commentCount
    createdAt
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
export const LikePostDocument = gql`
    mutation likePost($postID: String!) {
  likePost(postID: $postID) {
    id
    liked
    imageLink
    user {
      firstname
      lastname
      profilePicLink
    }
    text
    likesCount
    commentCount
    createdAt
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
      profilePicLink
    }
    text
    likesCount
    commentCount
    createdAt
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
export const GetFeedDocument = gql`
    query getFeed {
  getFeed {
    id
    liked
    imageLink
    user {
      id
      firstname
      lastname
      profilePicLink
    }
    text
    likesCount
    commentCount
    createdAt
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
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetFeedQuery();
 */
export function useGetFeedQuery(options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetFeedQuery, graphqlOperations.ts.GetFeedQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetFeedQuery, graphqlOperations.ts.GetFeedQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetFeedQuery, graphqlOperations.ts.GetFeedQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.GetFeedQuery, graphqlOperations.ts.GetFeedQueryVariables>(GetFeedDocument, {}, options);
}
export type GetFeedQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.GetFeedQuery, graphqlOperations.ts.GetFeedQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    profilePicLink
    firstname
    lastname
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
    }
    fromUser {
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
    user {
      id
      firstname
      lastname
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
    query getPostsFromUser($userID: String!) {
  getPostsFromUser(userID: $userID) {
    id
    liked
    imageLink
    user {
      id
      firstname
      lastname
      profilePicLink
    }
    text
    likesCount
    commentCount
    createdAt
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
 * });
 */
export function useGetPostsFromUserQuery(variables: graphqlOperations.ts.GetPostsFromUserQueryVariables | VueCompositionApi.Ref<graphqlOperations.ts.GetPostsFromUserQueryVariables> | ReactiveFunction<graphqlOperations.ts.GetPostsFromUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetPostsFromUserQuery, graphqlOperations.ts.GetPostsFromUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetPostsFromUserQuery, graphqlOperations.ts.GetPostsFromUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<graphqlOperations.ts.GetPostsFromUserQuery, graphqlOperations.ts.GetPostsFromUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<graphqlOperations.ts.GetPostsFromUserQuery, graphqlOperations.ts.GetPostsFromUserQueryVariables>(GetPostsFromUserDocument, variables, options);
}
export type GetPostsFromUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<graphqlOperations.ts.GetPostsFromUserQuery, graphqlOperations.ts.GetPostsFromUserQueryVariables>;
export const SearchDocument = gql`
    query search($searchString: String!) {
  search(searchString: $searchString) {
    id
    firstname
    lastname
    profilePicLink
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
export const NotificationsDocument = gql`
    subscription notifications($userId: String!) {
  notifications(userId: $userId) {
    id
    type
    message
    createdAt
    fromUser {
      id
    }
    toUser {
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
export function useNotificationsSubscription(variables: graphqlOperations.ts.NotificationsSubscriptionVariables | VueCompositionApi.Ref<graphqlOperations.ts.NotificationsSubscriptionVariables> | ReactiveFunction<graphqlOperations.ts.NotificationsSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<graphqlOperations.ts.NotificationsSubscription, graphqlOperations.ts.NotificationsSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<graphqlOperations.ts.NotificationsSubscription, graphqlOperations.ts.NotificationsSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<graphqlOperations.ts.NotificationsSubscription, graphqlOperations.ts.NotificationsSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<graphqlOperations.ts.NotificationsSubscription, graphqlOperations.ts.NotificationsSubscriptionVariables>(NotificationsDocument, variables, options);
}
export type NotificationsSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<graphqlOperations.ts.NotificationsSubscription, graphqlOperations.ts.NotificationsSubscriptionVariables>;