import gql from 'graphql-tag';

export const likePost = gql`
  mutation likePost($postID: String!) {
    likePost(postID: $postID) {
      id
      liked
      media {
        id
        name
        blurhash
        type
      }
      user {
        id
        firstname
        lastname
        username
        avatar {
          id
          name
          blurhash
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
