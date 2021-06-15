import gql from 'graphql-tag';

export const getPostsFromUser = gql`
  query getPostsFromUser($userID: String!, $limit: Float!, $offset: Float!) {
    getPostsFromUser(userID: $userID, limit: $limit, offset: $offset) {
      id
      liked
      media {
        name
        blurhash
        type
      }
      user {
        id
        firstname
        lastname
        username
        avatar {
          name
          blurhash
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
