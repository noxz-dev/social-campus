import gql from 'graphql-tag';

export const myChats = gql`
  query myChats {
    myChats {
      id
      lastMessage {
        id
        content
        createdAt
      }
      members {
        id
        firstname
        lastname
        username
        avatar {
          name
        }
      }
    }
  }
`;
