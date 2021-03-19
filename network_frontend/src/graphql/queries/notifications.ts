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
      }
      fromUser {
        id
      }
    }
  }
`;
