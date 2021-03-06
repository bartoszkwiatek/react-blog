import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const PostAuthor = (props) => {
  return (
    <Flex lineHeight="1rem" height="1rem">
      <Box mr="1" textAlign="right">
        <Text size="sm">{props.author}</Text>
        <Text fontSize="xs">{props.author}</Text>
      </Box>
      <Avatar size="sm" src={props.src} />
    </Flex>
  )
}
