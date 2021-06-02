import gql from 'graphql-tag';

export const leaveGroup = gql`
  mutation leaveGroup($groupId: String!) {
    leaveGroup(groupId: $groupId)
  }
`;
