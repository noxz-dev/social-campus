import gql from 'graphql-tag';

export const editPost = gql`
  mutation editPost($input: EditPostInput!) {
    editPost(input: $input) {
      id
      liked
      media {
        name
        blurhash
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
