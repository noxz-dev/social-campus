import gql from 'graphql-tag';

export const myGroups = gql`
  query myGroups {
    myGroups {
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
