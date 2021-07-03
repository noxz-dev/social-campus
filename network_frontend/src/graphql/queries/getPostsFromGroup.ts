import gql from 'graphql-tag';

export const getPostsFromGroup = gql`
  query getPostsFromGroup($groupId: String!, $limit: Float!, $offset: Float!) {
    getPostsFromGroup(groupId: $groupId, limit: $limit, offset: $offset) {
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
          id
          name
          blurhash
        }
      }
      text
      likesCount
      commentCount
      createdAt
      edited
    }
  }
`;
