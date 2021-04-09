import gql from 'graphql-tag';

export const groupById = gql`
  query groupById($groupId: String!) {
    groups(groupId: $groupId) {
      id
      name
      description
    }
  }
`;
