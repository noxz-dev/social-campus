import gql from 'graphql-tag';

export const notificationsSubscription = gql`
  subscription notifications($userId: String!) {
    notifications(userId: $userId) {
      id
      type
      message
      createdAt
      fromUser {
        id
        username
        avatar {
          name
        }
      }
      toUser {
        id
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
