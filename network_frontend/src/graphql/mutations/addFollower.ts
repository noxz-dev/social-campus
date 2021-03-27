import gql from 'graphql-tag';

export const addFollower = gql`
  mutation addFollower($userID: String!) {
    addFollower(userID: $userID) {
      id
      firstname
      lastname
      profilePicLink
      username
    }
  }
`;
