import gql from 'graphql-tag';

export const signup = gql`
  mutation signup($input: UserValidator!) {
    register(input: $input)
  }
`;
