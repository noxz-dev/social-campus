import gql from 'graphql-tag';

export const createGroup = gql`
  mutation createGroup($name: String!, $groupType: GroupType!, $description: String) {
    createGroup(name: $name, groupType: $groupType, description: $description) {
      id
      name
    }
  }
`;
