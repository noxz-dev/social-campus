import gql from 'graphql-tag';

export const myChats = gql`
  query myChats {
    myChats {
      id
      members {
        id
        firstname
        lastname
        username
        profilePicLink
      }
    }
  }
`;
