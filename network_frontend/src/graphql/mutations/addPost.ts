import gql from 'graphql-tag';

export const addPost = gql`
  mutation addPost($text: String!, $file: Upload, $tags: [String!], $groupID: String!) {
    addPost(text: $text, file: $file, tags: $tags, groupID: $groupID) {
      id
      liked
      imageLink
      user {
        firstname
        lastname
        profilePicLink
        username
      }
      text
      likesCount
      commentCount
      createdAt
      edited
    }
  }
`;
