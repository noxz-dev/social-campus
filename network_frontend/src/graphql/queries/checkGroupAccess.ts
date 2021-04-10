import gql from 'graphql-tag';

export const checkGroupAccess = gql`
  query checkGroupAccess($groupId: String!) {
    checkGroupAccess(groupId: $groupId)
  }
`;
