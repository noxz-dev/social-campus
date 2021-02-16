import gql from 'graphql-tag'

export const addPost = gql`
mutation unlikePost($postID: String!) {
  unlikePost(postID: $postID) {
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
