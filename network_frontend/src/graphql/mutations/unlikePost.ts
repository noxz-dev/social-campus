import gql from 'graphql-tag';

export const unlikePost = gql`
  mutation unlikePost($postID: String!) {
    unlikePost(postID: $postID) {
      id
      liked
      media {
        name
        blurhash
      }
      user {
        id
        firstname
        lastname
        username
        avatar {
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
