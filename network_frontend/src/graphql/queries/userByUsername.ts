import gql from 'graphql-tag';

export const userByUsername = gql`
  query userByUsername($username: String!) {
    userByUsername(username: $username) {
      id
      bio
      studyCourse
      faculty
      interests
      firstname
      lastname
      roles {
        id
        name
      }
      banner {
        id
        name
        blurhash
      }
      avatar {
        id
        name
        blurhash
      }
      username
      meFollowing
    }
  }
`;
