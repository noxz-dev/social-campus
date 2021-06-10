import gql from 'graphql-tag';

export const groupByIdPreview = gql`
  query groupByIdPreview($groupId: String!) {
    groupByIdPreview(groupId: $groupId) {
      type
      id
      name
      description
      numberOfMembers
    }
  }
`;
