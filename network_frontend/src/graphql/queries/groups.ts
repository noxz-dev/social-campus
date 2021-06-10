import gql from 'graphql-tag';

export const groups = gql`
  query groups($take: Float!, $skip: Float!) {
    groups(take: $take, skip: $skip) {
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
