import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Container, Input, Text, Textarea } from "@chakra-ui/react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"


const Profile = ({ match }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [postTitle, setPostTitle] = useState(null)
  const [longContent, setLongContent] = useState(null)

  const handleTitleChange = (event) => setPostTitle(event.target.value)
  const handleContentChange = (event) => setLongContent(event.target.value)


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
    return <div>Loading...</div>
  } else {
    return (
      <React.Fragment>
        <Container maxW="xl" centerContent>
          <Input
            value={postTitle}
            onChange={handleTitleChange}
            placeholder="Title of new post"
            size="md"
          />
          <Textarea
            value={longContent}
            onChange={handleContentChange}
            placeholder="Post content"
            size="md"
            resize="vertical"
          />
        </Container>
        <Container maxW="xl" centerContent>
          <Text mb="8px">{postTitle}</Text>
          <Text mb="8px" style={{ whiteSpace: "pre-wrap" }}>{longContent}</Text>
        </Container>


        <ul>
          {items.map(item => (
            <Box
              margin="1"
              padding="1"
              border="1px"
              borderRadius="sm"
              key={item._id}>
              {/* <Link to={`/posts/${item._id}`} > */}
              <li >
                <h2>
                  {item.title}
                </h2>
                <p>
                  {item.shortContent}
                </p>
              </li>
              {/* </Link> */}
            </Box>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

export { Profile }