import gql from 'graphql-tag';

export const editPost = gql`
  mutation editPost($postId: String!, $text: String!) {
    editPost(text: $text, postId: $postId) {
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
      edited
      group {
        id
        name
      }
    }
  }
`;
