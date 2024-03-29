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
        avatar {
          id
          name
          blurhash
        }
        onlineStatus
      }
      members {
        id
        firstname
        lastname
        username
        avatar {
          id
          name
          blurhash
        }
        onlineStatus
        groupRole
      }
    }
  }
`;
