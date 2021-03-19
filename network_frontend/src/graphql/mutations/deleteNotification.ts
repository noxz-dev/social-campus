import gql from 'graphql-tag';

export const deleteNotification = gql`
  mutation deleteNotification($notificationId: String!) {
    deleteNotification(notificationId: $notificationId)
  }
`;
