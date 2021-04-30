import gql from 'graphql-tag';

export const getNotifications = gql`
  query getNotifications {
    getNotifications {
      id
      type
      message
      createdAt
      toUser {
        id
        avatar {
          name
        }
        username
      }
      fromUser {
        id
        avatar {
          name
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
