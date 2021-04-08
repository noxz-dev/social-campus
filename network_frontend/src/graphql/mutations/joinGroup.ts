import gql from 'graphql-tag';

export const joinGroup = gql`
  mutation joinGroup($groupId: String!) {
    joinGroup(groupId: $groupId) {
      id
      name
    }
  }
`;
