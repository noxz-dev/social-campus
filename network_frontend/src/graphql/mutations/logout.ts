import gql from 'graphql-tag';

export const logout = gql`
  mutation logout($token: String!) {
    logout(access: $token)
  }
`;
