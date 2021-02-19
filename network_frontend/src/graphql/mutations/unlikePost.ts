import gql from 'graphql-tag';

export const unlikePost = gql`
  mutation unlikePost($postID: String!) {
    unlikePost(postID: $postID) {
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
