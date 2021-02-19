import gql from 'graphql-tag';

export const getFeed = gql`
  query getFeed {
    getFeed {
      id
      liked
      user {
        id
        firstname
        lastname
        profilePicLink
      }
      text
      likesCount
      createdAt
    }
  }
`;
