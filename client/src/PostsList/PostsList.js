import { Box, Container, Flex, Heading, LinkBox, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner'
import { PostAuthor } from '../PostDetails/PostAuthor'
import { useFetch } from '../utils/useFetch'
import { Pagination } from './Pagination'

const PostsList = ({ match }) => {
  const { isLoaded, items, error } = useFetch('/api/posts')
  const [pageIndex, setPageIndex] = useState(1)

  const postsOnPage = 4

  const splitArray = (inputArray, postsOnPage) => {
    var result = inputArray.reduce((resultArray, item, index) => {
      const partIndex = Math.floor(index / postsOnPage)

      if (!resultArray[partIndex]) {
        resultArray[partIndex] = []
      }
      resultArray[partIndex].push(item)
      return resultArray
    }, [])

    return result
  }

  const postPages = splitArray(items, postsOnPage)

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
      <React.Fragment>
        <ul>
          {postPages[pageIndex].map((item) => (
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
        <Container centerContent>
          <Pagination
            numberOfPages={postPages.length}
            currentPage={pageIndex}
            handleClick={(index) => setPageIndex(index)}
          ></Pagination>
        </Container>
      </React.Fragment>
    )
  }
}

export default PostsList
