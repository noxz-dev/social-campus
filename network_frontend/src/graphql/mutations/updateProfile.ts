import gql from 'graphql-tag';

export const updateProfile = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      bio
      studyCourse
      faculty
      interests
      firstname
      lastname
      avatar {
        name
        blurhash
      }
      username
      meFollowing
    }
  }
`;
