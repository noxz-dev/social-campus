import gql from 'graphql-tag';

export const following = gql`
  query getFollowing($userId: String!, $take: Float!, $skip: Float!) {
    getFollowing(userId: $userId, take: $take, skip: $skip) {
      id
      firstname
      lastname
      username
      meFollowing
      avatar {
        name
        blurhash
      }
    }
  }
`;
