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
        avatar {
          name
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
