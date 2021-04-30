import gql from 'graphql-tag';

export const likePost = gql`
  mutation likePost($postID: String!) {
    likePost(postID: $postID) {
      id
      liked
      imageLink
      user {
        id
        firstname
        lastname
        username
        avatar {
          name
        }
      }
      text
      likesCount
      commentCount
      createdAt
      edited
      group {
        id
        name
      }
    }
  }
`;
