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
        avatar {
          name
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
