import { Box, Container, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Loading from "../Loading";

const PostDetails = ({ match }) => {
  // console.log(`${match.url}`);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState([]);
  const url = `/api/posts/${match.params._id}`;

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  useEffect(() => {
    fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(
        (result) => {
          setContent(result);
          setIsLoaded(true);
        }
      )
      .catch(error => {
        setError(error);
        setIsLoaded(true);

      })
  }, [url])

  if (error) {
    return <Container>
      <Text as="h3">
        Could not connect to the database
      </Text>
      <Text as="h4">
        {error.message}
      </Text>
    </Container>
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
          {content.title}
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
