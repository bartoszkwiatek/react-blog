import { Box } from "@chakra-ui/react";
import React from 'react';
import { Link } from "react-router-dom";
import { Loader } from '../Loader';
import Loading from "../Loading";


const PostDetails = ({ match }) => {
  console.log(`${match.url}`)

  const url = `/api/posts/${match.params._id}`

  console.log(url)
  const content = Loader(url)
  console.log(content)
  return (
    <React.Fragment>

      <Box
        margin="0"
        padding="2"
        bg="gray.100"
        border="1px"
        borderRadius="md">
        {content == 'loading' && (
          <Loading>

          </Loading>

        )}
        <h2>{content.title}</h2>
        <h6>{content.createdAt}</h6>
        <p style={{ whiteSpace: "pre-wrap" }}>{content.longContent}</p>
        <Link to={`/`}>Back</Link>
      </Box>
    </React.Fragment>
  )
}

export default PostDetails