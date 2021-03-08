import { Container, Text } from '@chakra-ui/react'
import React from 'react'
import LoadingSpinner from '../LoadingSpinner'
import { useFetch } from '../utils/useFetch'
import { PostTemplate } from './PostTemplate'

const PostDetails = ({ match }) => {
  const url = `/api/posts/${match.params._id}`
  const { isLoaded, items, error } = useFetch(url)

  if (error) {
    return (
      <Container>
        <Text as="h3">Could not connect to the database</Text>
        <Text as="h4">{error.message}</Text>
      </Container>
    )
  } else if (!isLoaded) {
    return <LoadingSpinner />
  } else {
    return (
      //turn into article
      <PostTemplate
        date={items.createdAt}
        title={items.title}
        content={items.longContent}
        author={items.author}
      />
    )
  }
}

export default PostDetails
