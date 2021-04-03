import gql from 'graphql-tag';

export const getFeed = gql`
  query getFeed($take: Float!, $skip: Float!) {
    getFeed(take: $take, skip: $skip) {
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
