import gql from 'graphql-tag';

export const userStats = gql`
  query userStats($userId: String!) {
    userStats(userId: $userId) {
      postCount
      followerCount
      followingCount
    }
  }
`;
