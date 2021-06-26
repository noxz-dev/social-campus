import gql from 'graphql-tag';

export const mediaFromGroup = gql`
  query mediaFromGroup($groupId: String!) {
    mediaFromGroup(groupId: $groupId) {
      id
      type
      name
      blurhash
      createdAt
      createdByName
    }
  }
`;
