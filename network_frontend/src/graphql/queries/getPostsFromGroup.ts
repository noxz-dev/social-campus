import gql from 'graphql-tag';

export const getPostsFromGroup = gql`
  query getPostsFromGroup($groupId: String!) {
    getPostsFromGroup(groupId: $groupId) {
      id
      liked
      media {
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
    }
  }
`;
