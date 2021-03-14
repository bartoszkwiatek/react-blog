import { Box, Divider, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { Link, useHistory } from 'react-router-dom'
import React from 'react'
import { PostAuthor } from './PostAuthor'

export const PostTemplate = (props) => {
  const history = useHistory()
  return (
    <Box as="article">
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
      <Text as="Button" onClick={() => history.goBack()}>
        <b>Back</b>
      </Text>
    </Box>
  )
}
