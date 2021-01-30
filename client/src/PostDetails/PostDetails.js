import { Box } from "@chakra-ui/react";
import React from 'react';
import { Link } from "react-router-dom";
import { Loader } from '../Loader';


const PostDetails = ({ match }) => {
  console.log(`${match.url}`)

  const url = `/api/posts/${match.params._id}`

  console.log(url)
  const content = Loader(url)

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
        <p style={{ whiteSpace: "pre-wrap" }}>{content.longContent}</p>
        <Link to={`/`}>Back</Link>
      </Box>
    </React.Fragment>
  )
}

export default PostDetails