import gql from 'graphql-tag';

export const unlikePost = gql`
  mutation unlikePost($postID: String!) {
    unlikePost(postID: $postID) {
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
