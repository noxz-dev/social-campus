import gql from 'graphql-tag';

export const updateAboutGroup = gql`
  mutation updateAboutGroup($groupId: String!, $aboutContent: String!) {
    updateAboutGroup(groupId: $groupId, aboutContent: $aboutContent) {
      type
      id
      name
      description
      numberOfPosts
      numberOfMembers
    }
  }
`;
