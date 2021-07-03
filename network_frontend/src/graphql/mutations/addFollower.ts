import gql from 'graphql-tag';

export const addFollower = gql`
  mutation addFollower($userID: String!) {
    addFollower(userID: $userID) {
      id
      bio
      studyCourse
      faculty
      interests
      firstname
      lastname
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
