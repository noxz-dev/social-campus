import gql from 'graphql-tag';

export const myGroups = gql`
query myGroups($limit: Float!, $offset: Float!) {
  myGroups(limit: $limit, offset: $offset) {
      id
      name
      description
      numberOfMembers
      type
      previewAvatars {
        name
        blurhash
      }
    }
  }
`;
