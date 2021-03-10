import { Box, Divider, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import React from 'react'
import { PostAuthor } from './PostAuthor'

export const PostTemplate = (props) => {
  return (
    <Box as="article" p="5" marginBottom="5" borderWidth="1px" rounded="md">
      <Flex justifyContent="space-between">
        <Box as="time" dateTime={props.date}>
          {format(new Date(props.date), 'dd.MM.yyyy HH:mm')}
        </Box>
        <PostAuthor author={props.author} src="" />
      </Flex>
      <Heading size="md" my="2">
        {props.title}
      </Heading>
      <Text
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: `${props.content}` }}
      ></Text>
      <br></br>
      <Divider width="36%"></Divider>
      <Link to={`/`}>
        <b>Back</b>
      </Link>
    </Box>
  )
}
