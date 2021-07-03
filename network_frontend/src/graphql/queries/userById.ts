import gql from 'graphql-tag';

export const userById = gql`
  query userById($userId: String!) {
    userById(userId: $userId) {
      id
      firstname
      lastname
      avatar {
        id
        name
        blurhash
      }
      username
      followers {
        id
        firstname
        lastname
        avatar {
          id
          name
          blurhash
        }
      }
      following {
        id
        firstname
        lastname
        avatar {
          id
          name
          blurhash
        }
      }
    }
  }
`;
