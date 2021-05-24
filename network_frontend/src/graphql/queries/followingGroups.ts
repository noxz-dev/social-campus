import gql from 'graphql-tag';

export const followingGroups = gql`
  query followingGroups {
    followingGroups {
      id
      name
      description
      numberOfMembers
      members {
        avatar {
          name
          blurhash
        }
      }
    }
  }
`;
