import gql from 'graphql-tag';

export const search = gql`
  query search($searchString: String!) {
    search(searchString: $searchString) {
      users {
        id
        firstname
        lastname
        username
        avatar {
          name
        }
      }
      groups {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;
