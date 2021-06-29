import gql from 'graphql-tag';

export const updateGroupRole = gql`
  mutation updateGroupRole($groupId: String!, $memberId: String!, $groupRole: GroupRoles!) {
    updateGroupRole(groupId: $groupId, memberId: $memberId, groupRole: $groupRole) {
      id
    }
  }
`;
