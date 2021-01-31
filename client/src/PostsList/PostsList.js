import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'



const PostsList = ({ match }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
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
      <ul>
        {items.map(item => (
          <LinkBox
            key={item._id}
            as="article"
            p="5"
            marginBottom="5"
            borderWidth="1px"
            rounded="md"
          >
            <Link
              to={`${match.url}posts/${item._id}`}
            >
              <Box as="time" dateTime={item.createdAt}>
                {format(new Date(item.createdAt), "dd-MM-yyyy HH:mm")}
              </Box>
              <Heading size="md" my="2">
                <LinkOverlay href="#">
                  {item.title}
                </LinkOverlay>
              </Heading>
              <Text>
                {item.shortContent}
              </Text>
            </Link>
          </LinkBox>

        ))}
      </ul>
    )
  }
}

export default PostsList