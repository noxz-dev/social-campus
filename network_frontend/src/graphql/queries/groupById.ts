import gql from 'graphql-tag';

export const groupById = gql`
  query groupById($groupId: String!) {
    groupById(groupId: $groupId) {
      id
      name
      description
      numberOfPosts
      numberOfMembers
    }
  }
`;
