import gql from 'graphql-tag';

export const postById = gql`
  query postById($postId: String!) {
    postById(postId: $postId) {
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
      createdAt
      comments {
        id
        text
        createdAt
        user {
          id
          firstname
          lastname
          profilePicLink
        }
      }
    }
  }
`;
