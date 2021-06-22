import gql from 'graphql-tag';

export const addPost = gql`
  mutation addPost($input: AddPostInput!) {
    addPost(input: $input) {
      id
      liked
      media {
        id
        name
        blurhash
        type
      }
      user {
        firstname
        lastname
        avatar {
          name
          blurhash
        }
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
