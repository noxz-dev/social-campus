import gql from 'graphql-tag';

export const updatePassword = gql`
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      id
    }
  }
`;
