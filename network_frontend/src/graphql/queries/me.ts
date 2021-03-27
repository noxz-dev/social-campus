import gql from 'graphql-tag';

export const me = gql`
  query me {
    me {
      id
      profilePicLink
      firstname
      lastname
      username
    }
  }
`;
