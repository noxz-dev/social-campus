import gql from 'graphql-tag';

export const postById = gql`
  query postById($postId: String!) {
    postById(postId: $postId) {
      id
      liked
      imageLink
      text
      likesCount
      commentCount
      createdAt
      edited
      user {
        id
        firstname
        lastname
        username
        profilePicLink
      }
      comments {
        id
        text
        createdAt
        user {
          id
          firstname
          lastname
          username
          profilePicLink
        }
      }
    }
  }
`;
