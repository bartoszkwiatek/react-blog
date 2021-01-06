import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Container } from "@chakra-ui/react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"


const PostsList = ({ match }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  console.log(`match url:${match.url}`)
  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
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
      <ul>
        {items.map(item => (
          // <Link to={`/post/${item._id}`} key={item._id}>
          <Box
            margin="4"
            padding="2"
            bg="gray.100"
            border="1px"
            borderRadius="md"
            key={item._id}>
            <Link to={`${match.url}posts/${item._id}`} >
              <li >
                <h2>
                  {item.title}
                </h2>
                <p>
                  {item.shortContent}
                </p>
              </li>
            </Link>
          </Box>
        ))}
      </ul>
    )
  }
}

export { PostsList }