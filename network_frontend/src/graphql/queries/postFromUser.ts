import gql from 'graphql-tag';

export const getPostsFromUser = gql`
  query getPostsFromUser($userID: String!, $limit: Float!, $offset: Float!) {
    getPostsFromUser(userID: $userID, limit: $limit, offset: $offset) {
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
