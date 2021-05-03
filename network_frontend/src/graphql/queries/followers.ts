import gql from 'graphql-tag';

export const followers = gql`
  query followers($userId: String!, $take: Float!, $skip: Float!) {
    followers(userId: $userId, take: $take, skip: $skip) {
      id
      firstname
      lastname
      username
      avatar {
        name
        blurhash
      }
    }
  }
`;
