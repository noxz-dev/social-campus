import gql from 'graphql-tag';

export const removeFollower = gql`
  mutation removeFollower($userID: String!) {
    removeFollower(userID: $userID) {
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
