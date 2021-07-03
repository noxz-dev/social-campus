import gql from 'graphql-tag';

export const getNotifications = gql`
  query getNotifications {
    getNotifications {
      id
      type
      message
      createdAt
      chatMessage {
        content
      }
      toUser {
        id
        avatar {
          id
          name
          blurhash
        }
        username
      }
      fromUser {
        id
        avatar {
          id
          name
          blurhash
        }
        username
      }
      post {
        id
      }
      chat {
        id
      }
    }
  }
`;
