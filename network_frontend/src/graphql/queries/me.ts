import gql from 'graphql-tag';

export const me = gql`
  query me {
    me {
      id
      avatar {
        id
        name
        blurhash
      }
      firstname
      lastname
      username
      roles {
        id
        name
      }
    }
  }
`;
