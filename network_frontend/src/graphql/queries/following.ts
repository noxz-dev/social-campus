import gql from 'graphql-tag';

export const following = gql`
  query following($userId: String!, $take: Float!, $skip: Float!) {
    following(userId: $userId, take: $take, skip: $skip) {
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
