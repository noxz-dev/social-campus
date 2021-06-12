import gql from 'graphql-tag';

export const deleteComment = gql`
  mutation deleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      post {
        id
      }
    }
  }
`;
