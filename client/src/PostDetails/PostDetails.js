import { Container, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner'
import { handleErrors } from '../utils/handleErrors'
import { PostTemplate } from './PostTemplate'

const PostDetails = ({ match }) => {
  // console.log(`${match.url}`);
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [content, setContent] = useState([])
  const url = `/api/posts/${match.params._id}`

  useEffect(() => {
    fetch(url)
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        setContent(result)
        setIsLoaded(true)
      })
      .catch((error) => {
        setError(error)
        setIsLoaded(true)
      })
  }, [url])

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
        date={content.createdAt}
        title={content.title}
        content={content.longContent}
        author={content.author}
      />
    )
  }
}

export default PostDetails
