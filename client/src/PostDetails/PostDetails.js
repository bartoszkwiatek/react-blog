import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Container } from "@chakra-ui/react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { Loader } from '../Loader';

const PostDetails = ({ match }) => {
  const [post, setPost] = useState([]);

  const url = `/api/posts/${match.params._id}`
  const content = Loader(url)

  console.log(content)
  return (
    <React.Fragment>
      <Box
        margin="4"
        padding="2"
        bg="gray.100"
        border="1px"
        borderRadius="md">
        <h2>{content.title}</h2>
        <h6>{content.createdAt}</h6>
        <p>{content.longContent}</p>
        <Link to={`/`}>Back</Link>
      </Box>

    </React.Fragment>
  )
}



export { PostDetails }