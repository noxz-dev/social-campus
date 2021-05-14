import gql from 'graphql-tag';

export const sendMessage = gql`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      id
      content
      media {
        name
        blurhash
      }
      createdAt
      sendBy {
        id
      }
    }
  }
`;
