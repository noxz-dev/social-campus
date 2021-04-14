import gql from 'graphql-tag';

export const createGroup = gql`
  mutation createGroup($name: String!, $groupType: GroupType!, $description: String, $password: String) {
    createGroup(name: $name, groupType: $groupType, description: $description, password: $password) {
      id
      name
    }
  }
`;
