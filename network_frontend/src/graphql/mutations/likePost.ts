import gql from 'graphql-tag';

export const likePost = gql`
  mutation likePost($postID: String!) {
    likePost(postID: $postID) {
      id
      liked
      user {
        firstname
        lastname
        profilePicLink
      }
      text
      likesCount
      createdAt
    }
  }
`;
