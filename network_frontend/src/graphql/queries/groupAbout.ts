import gql from 'graphql-tag';

export const groupAbout = gql`
  query groupAbout($groupId: String!) {
    groupById(groupId: $groupId) {
      id
      about
      createdBy {
        id
      }
    }
  }
`;
