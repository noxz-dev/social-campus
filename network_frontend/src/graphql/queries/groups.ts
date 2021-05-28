import gql from 'graphql-tag';

export const groups = gql`
  query groups($take: Float!, $skip: Float!) {
    groups(take: $take, skip: $skip) {
      id
      name
      description
      numberOfMembers
      type
      members {
        avatar {
          name
          blurhash
        }
      }
    }
  }
`;
