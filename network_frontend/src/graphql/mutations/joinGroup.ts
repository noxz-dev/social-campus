import gql from 'graphql-tag';

export const joinGroup = gql`
  mutation joinGroup($groupId: String!, $password: String) {
    joinGroup(groupId: $groupId, password: $password) {
      id
      name
    }
  }
`;
