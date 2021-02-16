import gql from 'graphql-tag'

export const addPost = gql`
mutation addPost($text: String!) {
  addPost(text: $text) {
    id
    liked
    user {
      firstname
      lastname
      profilePicLink
    }
    text
    likesCount
    createdAt
  }
}
`
