import gql from 'graphql-tag';

export const likePost = gql`
  mutation likePost($postID: String!) {
    likePost(postID: $postID) {
      id
      liked
      imageLink
      user {
        firstname
        lastname
        profilePicLink
        username
      }
      text
      likesCount
      commentCount
      createdAt
    }
  }
`;
