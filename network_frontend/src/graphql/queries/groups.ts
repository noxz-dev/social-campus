import gql from 'graphql-tag';
import { Group } from '../generated/types';

export const groups = gql`
  query groups($take: Float!, $skip: Float!) {
    groups(take: $take, skip: $skip) {
      id
      name
      description
    }
  }
`;
