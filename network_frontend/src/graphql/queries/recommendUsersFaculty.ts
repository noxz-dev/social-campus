import gql from 'graphql-tag';

export const recommendedUsersFaculty = gql`
  query recommendedUsersFaculty {
    recommendedUsersFaculty {
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
