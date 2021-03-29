import gql from 'graphql-tag';

export const getPostsFromUser = gql`
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
    }
  }
`;
