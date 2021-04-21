import gql from 'graphql-tag';

export const sendMessage = gql`
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      id
      content
      createdAt
    }
  }
`;
