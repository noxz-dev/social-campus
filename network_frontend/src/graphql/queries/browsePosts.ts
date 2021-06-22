import gql from 'graphql-tag';

export const browsePosts = gql`
  query browsePosts($take: Float!, $skip: Float!, $tags: [String!]) {
    browsePosts(take: $take, skip: $skip, tags: $tags) {
      id
      liked
      media {
        id
        name
        blurhash
        type
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
      tags {
        id
        name
      }
    }
  }
`;
