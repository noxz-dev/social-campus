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
          name
          blurhash
        }
        username
      }
      fromUser {
        id
        avatar {
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
