import gql from 'graphql-tag';

export const unlikePost = gql`
  mutation unlikePost($postID: String!) {
    unlikePost(postID: $postID) {
      id
      liked
      imageLink
      user {
        id
        firstname
        lastname
        profilePicLink
      }
      text
      likesCount
      commentCount
      createdAt
    }
  }
`;
