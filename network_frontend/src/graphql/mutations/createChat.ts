import gql from 'graphql-tag';

export const createChat = gql`
  mutation createChat($memberId: String!) {
    createChat(memberId: $memberId) {
      id
    }
  }
`;
