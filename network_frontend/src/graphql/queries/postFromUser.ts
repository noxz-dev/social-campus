import gql from 'graphql-tag';

export const getPostsFromUser = gql`
  query getPostsFromUser($userID: String!) {
    getPostsFromUser(userID: $userID) {
      id
      liked
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
