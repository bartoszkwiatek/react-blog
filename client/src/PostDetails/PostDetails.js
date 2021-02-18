import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Loader } from '../Loader';
import Loading from "../Loading";

const PostDetails = ({ match }) => {
  console.log(`${match.url}`);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState([]);
  const url = `/api/posts/${match.params._id}`;

  console.log(error, isLoaded, content)
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setContent(result);
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <Loading></Loading>
  } else {
    return (
      //turn into article
      <LinkBox
        as="article"
        p="5"
        marginBottom="5"
        borderWidth="1px"
        rounded="md"
      >

        <Box as="time" dateTime={content.createdAt}>
          {format(new Date(content.createdAt), "dd-MM-yyyy HH:mm")}

        </Box>
        <Heading size="md" my="2">
          <LinkOverlay href="#">
            {content.title}
          </LinkOverlay>
        </Heading>
        <Text
          style={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{ __html: `${content.longContent}` }}
        >
        </Text>
        <Link to={`/`}>Back</Link>

      </LinkBox>
    )
  }
};

export default PostDetails;
