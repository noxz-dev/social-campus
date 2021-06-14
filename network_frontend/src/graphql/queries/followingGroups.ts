import gql from 'graphql-tag';

export const followingGroups = gql`
query followingGroups($limit: Float!, $offset: Float!) {
  followingGroups(limit: $limit, offset: $offset) {
      id
      name
      description
      type
      numberOfMembers
      previewAvatars {
        name
        blurhash
      }
    }
  }
`;
