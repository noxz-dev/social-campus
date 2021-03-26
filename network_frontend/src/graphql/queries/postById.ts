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
      user {
        id
        firstname
        lastname
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
          profilePicLink
        }
      }
    }
  }
`;
