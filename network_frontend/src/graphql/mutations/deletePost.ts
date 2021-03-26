import gql from 'graphql-tag';

export const deletePost = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId)
  }
`;
