import gql from 'graphql-tag';

export const removeFollower = gql`
  mutation removeFollower($userID: String!) {
    removeFollower(userID: $userID) {
      id
      firstname
      lastname
      profilePicLink
    }
  }
`;
