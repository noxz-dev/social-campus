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
export function useAddFollowerMutation(options: VueApolloComposable.UseMutationOptions<AddFollowerMutation, AddFollowerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AddFollowerMutation, AddFollowerMutationVariables>>) {
  return VueApolloComposable.useMutation<AddFollowerMutation, AddFollowerMutationVariables>(AddFollowerDocument, options);
}
export type AddFollowerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AddFollowerMutation, AddFollowerMutationVariables>;
export const AddPostDocument = gql`
    mutation addPost($text: String!) {
  addPost(text: $text) {
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
export function useLikePostMutation(options: VueApolloComposable.UseMutationOptions<LikePostMutation, LikePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LikePostMutation, LikePostMutationVariables>>) {
  return VueApolloComposable.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
}
export type LikePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LikePostMutation, LikePostMutationVariables>;
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
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>>) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
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
export function useRemoveFollowerMutation(options: VueApolloComposable.UseMutationOptions<RemoveFollowerMutation, RemoveFollowerMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveFollowerMutation, RemoveFollowerMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveFollowerMutation, RemoveFollowerMutationVariables>(RemoveFollowerDocument, options);
}
export type RemoveFollowerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveFollowerMutation, RemoveFollowerMutationVariables>;
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
export function useUnlikePostMutation(options: VueApolloComposable.UseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables>>) {
  return VueApolloComposable.useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument, options);
}
export type UnlikePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UnlikePostMutation, UnlikePostMutationVariables>;
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
export function useGetFeedQuery(options: VueApolloComposable.UseQueryOptions<GetFeedQuery, GetFeedQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFeedQuery, GetFeedQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFeedQuery, GetFeedQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, {}, options);
}
export type GetFeedQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetFeedQuery, GetFeedQueryVariables>;
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
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;
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
export function useGetNotificationsQuery(options: VueApolloComposable.UseQueryOptions<GetNotificationsQuery, GetNotificationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetNotificationsQuery, GetNotificationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetNotificationsQuery, GetNotificationsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, {}, options);
}
export type GetNotificationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const PostByIdDocument = gql`
    query postById($postId: String!) {
  postById(postId: $postId) {
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
    createdAt
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
export function usePostByIdQuery(variables: PostByIdQueryVariables | VueCompositionApi.Ref<PostByIdQueryVariables> | ReactiveFunction<PostByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<PostByIdQuery, PostByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PostByIdQuery, PostByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PostByIdQuery, PostByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<PostByIdQuery, PostByIdQueryVariables>(PostByIdDocument, variables, options);
}
export type PostByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PostByIdQuery, PostByIdQueryVariables>;
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
export function useGetPostsFromUserQuery(variables: GetPostsFromUserQueryVariables | VueCompositionApi.Ref<GetPostsFromUserQueryVariables> | ReactiveFunction<GetPostsFromUserQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetPostsFromUserQuery, GetPostsFromUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>(GetPostsFromUserDocument, variables, options);
}
export type GetPostsFromUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>;
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
export function useUserByIdQuery(variables: UserByIdQueryVariables | VueCompositionApi.Ref<UserByIdQueryVariables> | ReactiveFunction<UserByIdQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserByIdQuery, UserByIdQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserByIdQuery, UserByIdQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserByIdQuery, UserByIdQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, variables, options);
}
export type UserByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserByIdQuery, UserByIdQueryVariables>;
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
export function useNotificationsSubscription(variables: NotificationsSubscriptionVariables | VueCompositionApi.Ref<NotificationsSubscriptionVariables> | ReactiveFunction<NotificationsSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<NotificationsSubscription, NotificationsSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<NotificationsSubscription, NotificationsSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<NotificationsSubscription, NotificationsSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<NotificationsSubscription, NotificationsSubscriptionVariables>(NotificationsDocument, variables, options);
}
export type NotificationsSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<NotificationsSubscription, NotificationsSubscriptionVariables>;