import gql from 'graphql-tag';

export const groupMembers = gql`
  query groupMembers($groupId: String!) {
    groupById(groupId: $groupId) {
      id
      createdBy {
        id
        firstname
        lastname
        username
        profilePicLink
      }
      members {
        id
        firstname
        lastname
        username
        profilePicLink
      }
    }
  }
`;
