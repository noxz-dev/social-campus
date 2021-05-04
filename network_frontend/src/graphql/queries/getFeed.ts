import gql from 'graphql-tag';

export const getFeed = gql`
  query getFeed($limit: Float!, $offset: Float!) {
    getFeed(limit: $limit, offset: $offset) {
      id
      liked
      media {
        name
        blurhash
      }
      user {
        id
        firstname
        lastname
        username
        avatar {
          name
          blurhash
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
