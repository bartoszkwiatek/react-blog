import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Container } from "@chakra-ui/react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"


const Loader = (url) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(url)
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
    return error.message
  } else if (!isLoaded) {
    return "loading"
  } else {
    return items
  }
}
export { Loader }