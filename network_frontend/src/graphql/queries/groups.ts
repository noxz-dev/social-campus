import gql from 'graphql-tag';

export const groups = gql`
  query groups($limit: Float!, $offset: Float!) {
    groups(limit: $limit, offset: $offset) {
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
