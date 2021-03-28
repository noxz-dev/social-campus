import gql from 'graphql-tag';

export const search = gql`
  query search($searchString: String!) {
    search(searchString: $searchString) {
      id
      firstname
      lastname
      username
      profilePicLink
    }
  }
`;
