import gql from 'graphql-tag';

export const followers = gql`
  query getFollowers($userId: String!, $take: Float!, $skip: Float!) {
    getFollowers(userId: $userId, take: $take, skip: $skip) {
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
