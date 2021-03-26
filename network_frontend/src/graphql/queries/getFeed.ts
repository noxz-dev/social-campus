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
        profilePicLink
      }
      text
      likesCount
      commentCount
      createdAt
    }
  }
`;
