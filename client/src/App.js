import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Flex, HStack } from "@chakra-ui/react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import './App.css';
import { PostsList } from './PostsList/PostsList';
import { PostDetails } from './PostDetails/PostDetails';

function App() {
  return (
    <BrowserRouter>
      <Container className="App">
        <Link to='/'>
          <header>
            <h1>Greatest react blog ever</h1>
          </header>
        </Link>
        <Container>
          <nav>
            <HStack spacing="4">
              <Link to='/'>
                <Button colorScheme="teal" size="lg">Home</Button>
              </Link>

              <Link to='/admin'>
                <Button colorScheme="teal" size="lg">Profile</Button>
              </Link>
            </HStack>
          </nav>
        </Container>
        <main>
          <Switch>
            <Route path="/posts/:_id" component={PostDetails}></Route>
            <Route exact path="/admin">
              {/* <Admin /> */}
            </Route>
            <Route exact path="/" component={PostsList}></Route>
          </Switch>
        </main>
      </Container>
    </BrowserRouter>
  );
}

export default App;
