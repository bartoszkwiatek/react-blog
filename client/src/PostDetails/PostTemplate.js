import { Box, Heading, Text } from "@chakra-ui/react"
import { format } from "date-fns"
import { Link } from "react-router-dom"
import React from 'react';


export const PostTemplate = (props) => {

  return (
    <Box
      as="article"
      p="5"
      marginBottom="5"
      borderWidth="1px"
      rounded="md"
    >
      <Box as="time" dateTime={props.date}>
        {format(new Date(props.date), "dd-MM-yyyy HH:mm")}
      </Box>
      <Heading size="md" my="2">
        {props.title}
      </Heading>
      <Text
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: `${props.content}` }}
      >
      </Text>
      <Link to={`/`}>Back</Link>
    </Box>
  )
}