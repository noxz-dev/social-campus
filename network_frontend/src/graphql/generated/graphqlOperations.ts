import * as VueApolloComposable from '@vue/apollo-composable';
import gql from 'graphql-tag';
import * as VueCompositionApi from 'vue';
import {
  AddCommentMutation,
  AddCommentMutationVariables,
  AddFollowerMutation,
  AddFollowerMutationVariables,
  AddPostMutation,
  AddPostMutationVariables,
  BrowsePostsQuery,
  BrowsePostsQueryVariables,
  ChatByIdQuery,
  ChatByIdQueryVariables,
  CheckGroupAccessQuery,
  CheckGroupAccessQueryVariables,
  CreateChatMutation,
  CreateChatMutationVariables,
  CreateGroupMutation,
  CreateGroupMutationVariables,
  DeleteNotificationMutation,
  DeleteNotificationMutationVariables,
  DeletePostMutation,
  DeletePostMutationVariables,
  EditPostMutation,
  EditPostMutationVariables,
  FollowersQuery,
  FollowersQueryVariables,
  FollowingQuery,
  FollowingQueryVariables,
  GetFeedQuery,
  GetFeedQueryVariables,
  GetNotificationsQuery,
  GetNotificationsQueryVariables,
  GetPostsFromGroupQuery,
  GetPostsFromGroupQueryVariables,
  GetPostsFromUserQuery,
  GetPostsFromUserQueryVariables,
  GroupByIdQuery,
  GroupByIdQueryVariables,
  GroupMembersQuery,
  GroupMembersQueryVariables,
  GroupsQuery,
  GroupsQueryVariables,
  JoinGroupMutation,
  JoinGroupMutationVariables,
  LikePostMutation,
  LikePostMutationVariables,
  LoginMutation,
  LoginMutationVariables,
  MeQuery,
  MeQueryVariables,
  MyChatsQuery,
  MyChatsQueryVariables,
  MyGroupsQuery,
  MyGroupsQueryVariables,
  NotificationsSubscription,
  NotificationsSubscriptionVariables,
  PostByIdQuery,
  PostByIdQueryVariables,
  RemoveFollowerMutation,
  RemoveFollowerMutationVariables,
  SearchQuery,
  SearchQueryVariables,
  SendMessageMutation,
  SendMessageMutationVariables,
  UnlikePostMutation,
  UnlikePostMutationVariables,
  UserByIdQuery,
  UserByIdQueryVariables,
  UserByUsernameQuery,
  UserByUsernameQueryVariables,
  UserStatsQuery,
  UserStatsQueryVariables,
} from './types';
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
export function useAddFollowerMutation(
  options:
    | VueApolloComposable.UseMutationOptions<AddFollowerMutation, AddFollowerMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<AddFollowerMutation, AddFollowerMutationVariables>>
) {
  return VueApolloComposable.useMutation<AddFollowerMutation, AddFollowerMutationVariables>(
    AddFollowerDocument,
    options
  );
}
export type AddFollowerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  AddFollowerMutation,
  AddFollowerMutationVariables
>;
export const AddPostDocument = gql`
  mutation addPost($input: AddPostInput!) {
    addPost(input: $input) {
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
export function useAddPostMutation(
  options:
    | VueApolloComposable.UseMutationOptions<AddPostMutation, AddPostMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<AddPostMutation, AddPostMutationVariables>>
) {
  return VueApolloComposable.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
}
export type AddPostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  AddPostMutation,
  AddPostMutationVariables
>;
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
export function useAddCommentMutation(
  options:
    | VueApolloComposable.UseMutationOptions<AddCommentMutation, AddCommentMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<AddCommentMutation, AddCommentMutationVariables>>
) {
  return VueApolloComposable.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
}
export type AddCommentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  AddCommentMutation,
  AddCommentMutationVariables
>;
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
export function useCreateChatMutation(
  options:
    | VueApolloComposable.UseMutationOptions<CreateChatMutation, CreateChatMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateChatMutation, CreateChatMutationVariables>>
) {
  return VueApolloComposable.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
}
export type CreateChatMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  CreateChatMutation,
  CreateChatMutationVariables
>;
export const CreateGroupDocument = gql`
  mutation createGroup($name: String!, $groupType: GroupType!, $description: String, $password: String) {
    createGroup(name: $name, groupType: $groupType, description: $description, password: $password) {
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
 *     password: // value for 'password'
 *   },
 * });
 */
export function useCreateGroupMutation(
  options:
    | VueApolloComposable.UseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>>
) {
  return VueApolloComposable.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(
    CreateGroupDocument,
    options
  );
}
export type CreateGroupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  CreateGroupMutation,
  CreateGroupMutationVariables
>;
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
export function useDeleteNotificationMutation(
  options:
    | VueApolloComposable.UseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>
      >
) {
  return VueApolloComposable.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(
    DeleteNotificationDocument,
    options
  );
}
export type DeleteNotificationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  DeleteNotificationMutation,
  DeleteNotificationMutationVariables
>;
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
export function useDeletePostMutation(
  options:
    | VueApolloComposable.UseMutationOptions<DeletePostMutation, DeletePostMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<DeletePostMutation, DeletePostMutationVariables>>
) {
  return VueApolloComposable.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
}
export type DeletePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  DeletePostMutation,
  DeletePostMutationVariables
>;
export const EditPostDocument = gql`
  mutation editPost($input: EditPostInput!) {
    editPost(input: $input) {
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
export function useEditPostMutation(
  options:
    | VueApolloComposable.UseMutationOptions<EditPostMutation, EditPostMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<EditPostMutation, EditPostMutationVariables>>
) {
  return VueApolloComposable.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
}
export type EditPostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  EditPostMutation,
  EditPostMutationVariables
>;
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
export function useJoinGroupMutation(
  options:
    | VueApolloComposable.UseMutationOptions<JoinGroupMutation, JoinGroupMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<JoinGroupMutation, JoinGroupMutationVariables>>
) {
  return VueApolloComposable.useMutation<JoinGroupMutation, JoinGroupMutationVariables>(JoinGroupDocument, options);
}
export type JoinGroupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  JoinGroupMutation,
  JoinGroupMutationVariables
>;
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
export function useLikePostMutation(
  options:
    | VueApolloComposable.UseMutationOptions<LikePostMutation, LikePostMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<LikePostMutation, LikePostMutationVariables>>
) {
  return VueApolloComposable.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
}
export type LikePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  LikePostMutation,
  LikePostMutationVariables
>;
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
export function useLoginMutation(
  options:
    | VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>>
) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  LoginMutation,
  LoginMutationVariables
>;
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
export function useRemoveFollowerMutation(
  options:
    | VueApolloComposable.UseMutationOptions<RemoveFollowerMutation, RemoveFollowerMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveFollowerMutation, RemoveFollowerMutationVariables>>
) {
  return VueApolloComposable.useMutation<RemoveFollowerMutation, RemoveFollowerMutationVariables>(
    RemoveFollowerDocument,
    options
  );
}
export type RemoveFollowerMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  RemoveFollowerMutation,
  RemoveFollowerMutationVariables
>;
export const SendMessageDocument = gql`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      id
      content
      createdAt
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
export function useSendMessageMutation(
  options:
    | VueApolloComposable.UseMutationOptions<SendMessageMutation, SendMessageMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<SendMessageMutation, SendMessageMutationVariables>>
) {
  return VueApolloComposable.useMutation<SendMessageMutation, SendMessageMutationVariables>(
    SendMessageDocument,
    options
  );
}
export type SendMessageMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  SendMessageMutation,
  SendMessageMutationVariables
>;
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
export function useUnlikePostMutation(
  options:
    | VueApolloComposable.UseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables>>
) {
  return VueApolloComposable.useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument, options);
}
export type UnlikePostMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  UnlikePostMutation,
  UnlikePostMutationVariables
>;
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
export function useBrowsePostsQuery(
  variables:
    | BrowsePostsQueryVariables
    | VueCompositionApi.Ref<BrowsePostsQueryVariables>
    | ReactiveFunction<BrowsePostsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<BrowsePostsQuery, BrowsePostsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<BrowsePostsQuery, BrowsePostsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<BrowsePostsQuery, BrowsePostsQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<BrowsePostsQuery, BrowsePostsQueryVariables>(
    BrowsePostsDocument,
    variables,
    options
  );
}
export type BrowsePostsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  BrowsePostsQuery,
  BrowsePostsQueryVariables
>;
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
export function useChatByIdQuery(
  variables:
    | ChatByIdQueryVariables
    | VueCompositionApi.Ref<ChatByIdQueryVariables>
    | ReactiveFunction<ChatByIdQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<ChatByIdQuery, ChatByIdQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ChatByIdQuery, ChatByIdQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<ChatByIdQuery, ChatByIdQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<ChatByIdQuery, ChatByIdQueryVariables>(ChatByIdDocument, variables, options);
}
export type ChatByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  ChatByIdQuery,
  ChatByIdQueryVariables
>;
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
export function useCheckGroupAccessQuery(
  variables:
    | CheckGroupAccessQueryVariables
    | VueCompositionApi.Ref<CheckGroupAccessQueryVariables>
    | ReactiveFunction<CheckGroupAccessQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<CheckGroupAccessQuery, CheckGroupAccessQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CheckGroupAccessQuery, CheckGroupAccessQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<CheckGroupAccessQuery, CheckGroupAccessQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<CheckGroupAccessQuery, CheckGroupAccessQueryVariables>(
    CheckGroupAccessDocument,
    variables,
    options
  );
}
export type CheckGroupAccessQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  CheckGroupAccessQuery,
  CheckGroupAccessQueryVariables
>;
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
export function useFollowersQuery(
  variables:
    | FollowersQueryVariables
    | VueCompositionApi.Ref<FollowersQueryVariables>
    | ReactiveFunction<FollowersQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<FollowersQuery, FollowersQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FollowersQuery, FollowersQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<FollowersQuery, FollowersQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, variables, options);
}
export type FollowersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  FollowersQuery,
  FollowersQueryVariables
>;
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
export function useFollowingQuery(
  variables:
    | FollowingQueryVariables
    | VueCompositionApi.Ref<FollowingQueryVariables>
    | ReactiveFunction<FollowingQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<FollowingQuery, FollowingQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FollowingQuery, FollowingQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<FollowingQuery, FollowingQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<FollowingQuery, FollowingQueryVariables>(FollowingDocument, variables, options);
}
export type FollowingQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  FollowingQuery,
  FollowingQueryVariables
>;
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
 *   take: // value for 'take'
 *   skip: // value for 'skip'
 * });
 */
export function useGetFeedQuery(
  variables:
    | GetFeedQueryVariables
    | VueCompositionApi.Ref<GetFeedQueryVariables>
    | ReactiveFunction<GetFeedQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<GetFeedQuery, GetFeedQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetFeedQuery, GetFeedQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetFeedQuery, GetFeedQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, variables, options);
}
export type GetFeedQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  GetFeedQuery,
  GetFeedQueryVariables
>;
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
export function useGetPostsFromGroupQuery(
  variables:
    | GetPostsFromGroupQueryVariables
    | VueCompositionApi.Ref<GetPostsFromGroupQueryVariables>
    | ReactiveFunction<GetPostsFromGroupQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<GetPostsFromGroupQuery, GetPostsFromGroupQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<GetPostsFromGroupQuery, GetPostsFromGroupQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<GetPostsFromGroupQuery, GetPostsFromGroupQueryVariables>
      > = {}
) {
  return VueApolloComposable.useQuery<GetPostsFromGroupQuery, GetPostsFromGroupQueryVariables>(
    GetPostsFromGroupDocument,
    variables,
    options
  );
}
export type GetPostsFromGroupQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  GetPostsFromGroupQuery,
  GetPostsFromGroupQueryVariables
>;
export const GroupByIdDocument = gql`
  query groupById($groupId: String!) {
    groupById(groupId: $groupId) {
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
export function useGroupByIdQuery(
  variables:
    | GroupByIdQueryVariables
    | VueCompositionApi.Ref<GroupByIdQueryVariables>
    | ReactiveFunction<GroupByIdQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<GroupByIdQuery, GroupByIdQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GroupByIdQuery, GroupByIdQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<GroupByIdQuery, GroupByIdQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<GroupByIdQuery, GroupByIdQueryVariables>(GroupByIdDocument, variables, options);
}
export type GroupByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  GroupByIdQuery,
  GroupByIdQueryVariables
>;
export const GroupMembersDocument = gql`
  query groupMembers($groupId: String!) {
    groupById(groupId: $groupId) {
      id
      createdBy {
        id
        firstname
        lastname
        username
        profilePicLink
      }
      members {
        id
        firstname
        lastname
        username
        profilePicLink
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
export function useGroupMembersQuery(
  variables:
    | GroupMembersQueryVariables
    | VueCompositionApi.Ref<GroupMembersQueryVariables>
    | ReactiveFunction<GroupMembersQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<GroupMembersQuery, GroupMembersQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GroupMembersQuery, GroupMembersQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<GroupMembersQuery, GroupMembersQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<GroupMembersQuery, GroupMembersQueryVariables>(
    GroupMembersDocument,
    variables,
    options
  );
}
export type GroupMembersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  GroupMembersQuery,
  GroupMembersQueryVariables
>;
export const GroupsDocument = gql`
  query groups($take: Float!, $skip: Float!) {
    groups(take: $take, skip: $skip) {
      id
      name
      description
      numberOfMembers
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
export function useGroupsQuery(
  variables:
    | GroupsQueryVariables
    | VueCompositionApi.Ref<GroupsQueryVariables>
    | ReactiveFunction<GroupsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<GroupsQuery, GroupsQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, variables, options);
}
export type GroupsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  GroupsQuery,
  GroupsQueryVariables
>;
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
export function useMeQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;
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
        profilePicLink
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
export function useMyChatsQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MyChatsQuery, MyChatsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MyChatsQuery, MyChatsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<MyChatsQuery, MyChatsQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<MyChatsQuery, MyChatsQueryVariables>(MyChatsDocument, {}, options);
}
export type MyChatsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  MyChatsQuery,
  MyChatsQueryVariables
>;
export const MyGroupsDocument = gql`
  query myGroups {
    myGroups {
      id
      name
      description
      numberOfMembers
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
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMyGroupsQuery();
 */
export function useMyGroupsQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MyGroupsQuery, MyGroupsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MyGroupsQuery, MyGroupsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<MyGroupsQuery, MyGroupsQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<MyGroupsQuery, MyGroupsQueryVariables>(MyGroupsDocument, {}, options);
}
export type MyGroupsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  MyGroupsQuery,
  MyGroupsQueryVariables
>;
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
export function useGetNotificationsQuery(
  options:
    | VueApolloComposable.UseQueryOptions<GetNotificationsQuery, GetNotificationsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetNotificationsQuery, GetNotificationsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetNotificationsQuery, GetNotificationsQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(
    GetNotificationsDocument,
    {},
    options
  );
}
export type GetNotificationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  GetNotificationsQuery,
  GetNotificationsQueryVariables
>;
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
export function usePostByIdQuery(
  variables:
    | PostByIdQueryVariables
    | VueCompositionApi.Ref<PostByIdQueryVariables>
    | ReactiveFunction<PostByIdQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<PostByIdQuery, PostByIdQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PostByIdQuery, PostByIdQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<PostByIdQuery, PostByIdQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<PostByIdQuery, PostByIdQueryVariables>(PostByIdDocument, variables, options);
}
export type PostByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  PostByIdQuery,
  PostByIdQueryVariables
>;
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
export function useGetPostsFromUserQuery(
  variables:
    | GetPostsFromUserQueryVariables
    | VueCompositionApi.Ref<GetPostsFromUserQueryVariables>
    | ReactiveFunction<GetPostsFromUserQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<GetPostsFromUserQuery, GetPostsFromUserQueryVariables>(
    GetPostsFromUserDocument,
    variables,
    options
  );
}
export type GetPostsFromUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  GetPostsFromUserQuery,
  GetPostsFromUserQueryVariables
>;
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
export function useSearchQuery(
  variables:
    | SearchQueryVariables
    | VueCompositionApi.Ref<SearchQueryVariables>
    | ReactiveFunction<SearchQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<SearchQuery, SearchQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, variables, options);
}
export type SearchQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  SearchQuery,
  SearchQueryVariables
>;
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
export function useUserByIdQuery(
  variables:
    | UserByIdQueryVariables
    | VueCompositionApi.Ref<UserByIdQueryVariables>
    | ReactiveFunction<UserByIdQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserByIdQuery, UserByIdQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserByIdQuery, UserByIdQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserByIdQuery, UserByIdQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, variables, options);
}
export type UserByIdQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  UserByIdQuery,
  UserByIdQueryVariables
>;
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
export function useUserByUsernameQuery(
  variables:
    | UserByUsernameQueryVariables
    | VueCompositionApi.Ref<UserByUsernameQueryVariables>
    | ReactiveFunction<UserByUsernameQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserByUsernameQuery, UserByUsernameQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserByUsernameQuery, UserByUsernameQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserByUsernameQuery, UserByUsernameQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<UserByUsernameQuery, UserByUsernameQueryVariables>(
    UserByUsernameDocument,
    variables,
    options
  );
}
export type UserByUsernameQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  UserByUsernameQuery,
  UserByUsernameQueryVariables
>;
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
export function useUserStatsQuery(
  variables:
    | UserStatsQueryVariables
    | VueCompositionApi.Ref<UserStatsQueryVariables>
    | ReactiveFunction<UserStatsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserStatsQuery, UserStatsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserStatsQuery, UserStatsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserStatsQuery, UserStatsQueryVariables>> = {}
) {
  return VueApolloComposable.useQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, variables, options);
}
export type UserStatsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  UserStatsQuery,
  UserStatsQueryVariables
>;
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
export function useNotificationsSubscription(
  variables:
    | NotificationsSubscriptionVariables
    | VueCompositionApi.Ref<NotificationsSubscriptionVariables>
    | ReactiveFunction<NotificationsSubscriptionVariables>,
  options:
    | VueApolloComposable.UseSubscriptionOptions<NotificationsSubscription, NotificationsSubscriptionVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseSubscriptionOptions<NotificationsSubscription, NotificationsSubscriptionVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseSubscriptionOptions<NotificationsSubscription, NotificationsSubscriptionVariables>
      > = {}
) {
  return VueApolloComposable.useSubscription<NotificationsSubscription, NotificationsSubscriptionVariables>(
    NotificationsDocument,
    variables,
    options
  );
}
export type NotificationsSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<
  NotificationsSubscription,
  NotificationsSubscriptionVariables
>;
