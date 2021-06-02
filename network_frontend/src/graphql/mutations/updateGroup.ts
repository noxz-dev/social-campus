import gql from 'graphql-tag';

export const updateGroup = gql`
  mutation updateGroup($input: UpdateGroupInput!) {
    updateGroup(input: $input) {
      type
      id
      name
      description
    }
  }
`;
