import gql from 'graphql-tag';

export const addPost = gql`
  mutation addPost($input: AddPostInput!) {
    addPost(input: $input) {
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
