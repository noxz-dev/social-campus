import gql from 'graphql-tag';

export const addPost = gql`
  mutation addPost($text: String!, $file: Upload!) {
    addPost(text: $text, file: $file) {
      id
      liked
      imageLink
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
