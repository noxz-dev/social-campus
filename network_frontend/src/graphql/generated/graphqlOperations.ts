import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from '@vue/composition-api';
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