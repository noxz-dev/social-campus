import gql from 'graphql-tag';

export const getFeed = gql`
  query getFeed {
    getFeed {
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
    }
  }
`;
