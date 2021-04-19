import gql from 'graphql-tag';

export const sendMessage = gql`
  mutation sendMessage($chatId: String!, $message: String!) {
    sendMessage(chatId: $chatId, message: $message) {
      id
      content
      createdAt
    }
  }
`;
