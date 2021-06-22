import gql from 'graphql-tag';

export const sendMessage = gql`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      id
      content
      media {
        id
        name
        blurhash
        type
      }
      createdAt
      sendBy {
        id
      }
    }
  }
`;
