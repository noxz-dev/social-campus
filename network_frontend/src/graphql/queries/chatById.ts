import gql from 'graphql-tag';

export const chatById = gql`
  query chatById($chatId: String!) {
    chatById(chatId: $chatId) {
      id
      messages {
        id
        content
        createdAt
        sendBy {
          id
        }
        media {
          id
          name
          blurhash
          type
        }
      }
    }
  }
`;
