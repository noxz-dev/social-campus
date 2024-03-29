import gql from 'graphql-tag';

export const postById = gql`
  query postById($postId: String!) {
    postById(postId: $postId) {
      id
      liked
      media {
        id
        name
        blurhash
        type
      }
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
        avatar {
          id
          name
          blurhash
        }
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
          avatar {
            id
            name
            blurhash
          }
        }
      }
      group {
        id
        name
      }
    }
  }
`;
