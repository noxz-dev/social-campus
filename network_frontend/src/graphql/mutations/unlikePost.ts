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
