import gql from 'graphql-tag';

export const checkGroupRoleAccess = gql`
  query checkGroupRoleAccess($groupId: String!, $groupRole: GroupRoles!) {
    checkGroupRoleAccess(groupId: $groupId, groupRole: $groupRole) {
      isAllowed
    }
  }
`;
