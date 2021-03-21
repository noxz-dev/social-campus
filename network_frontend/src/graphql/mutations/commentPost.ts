import gql from 'graphql-tag';

export const commentPost = gql`
  mutation addComment($text: String!, $postID: String!) {
    addComment(text: $text, postID: $postID) {
      id
    }
  }
`;
