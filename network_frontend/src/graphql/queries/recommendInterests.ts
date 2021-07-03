import gql from 'graphql-tag';

export const recommendedUsersInterests = gql`
  query recommendedUsersInterests {
    recommendedUsersInterests {
      id
      firstname
      lastname
      username
      meFollowing
      avatar {
        id
        name
        blurhash
      }
    }
  }
`;
