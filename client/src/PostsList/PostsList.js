import {
  Avatar,
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { handleErrors } from '../utils/handleErrors'
import LoadingSpinner from '../LoadingSpinner'
import { PostAuthor } from '../PostDetails/PostAuthor'

const PostsList = ({ match }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/api/posts')
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        setItems(result)
        setIsLoaded(true)
      })
      .catch((error) => {
        setError(error)
        setIsLoaded(true)
      })
  }, [])

  if (error) {
    return (
      <Container>
        <Text as="h3">Could not connect to the database</Text>
        <Text as="h4">{error.message}</Text>
      </Container>
    )
  } else if (!isLoaded) {
    return <LoadingSpinner></LoadingSpinner>
  } else {
    return (
      <ul>
        {items.map((item) => (
          <Link to={`${match.url}posts/${item._id}`} key={item._id}>
            <LinkBox
              as="article"
              p="5"
              marginBottom="5"
              borderWidth="1px"
              rounded="md"
            >
              <Flex justifyContent="space-between">
                <Box as="time" size="sm" dateTime={item.createdAt}>
                  {format(new Date(item.createdAt), 'dd.MM.yyyy HH:mm')}
                </Box>
                <PostAuthor author={item.author} src="" />
              </Flex>
              <Heading size="md" my="2">
                {item.title}
              </Heading>
              <Text
                style={{ whiteSpace: 'pre-wrap' }}
                dangerouslySetInnerHTML={{
                  __html: `${item.shortContent}... <b>read more</b>`,
                }}
              ></Text>
            </LinkBox>
          </Link>
        ))}
      </ul>
    )
  }
}

export default PostsList
