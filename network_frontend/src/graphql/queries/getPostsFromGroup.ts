import gql from 'graphql-tag';

export const getPostsFromGroup = gql`
  query getPostsFromGroup($groupId: String!) {
    getPostsFromGroup(groupId: $groupId) {
      id
      liked
      imageLink
      user {
        id
        firstname
        lastname
        username
        profilePicLink
      }
      text
      likesCount
      commentCount
      createdAt
      edited
    }
  }
`;
