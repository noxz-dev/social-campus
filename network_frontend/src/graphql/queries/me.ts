import gql from 'graphql-tag';

export const me = gql`
  query me {
    me {
      id
      avatar {
        name
      }
      firstname
      lastname
      username
    }
  }
`;
