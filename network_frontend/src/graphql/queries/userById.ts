import gql from 'graphql-tag';

export const userById = gql`
  query userById($userId: String!) {
    userById(userId: $userId) {
      id
      firstname
      lastname
      profilePicLink
      followers {
        id
        firstname
        lastname
        profilePicLink
      }
      following {
        id
        firstname
        lastname
        profilePicLink
      }
    }
  }
`;
