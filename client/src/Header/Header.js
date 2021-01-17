import { Box, Button, Container, HStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../utils/context';

const Header = () => {
  const context = useContext(Context)

  return (
    <Container>
      <Box>

        <Link to='/'>
          <header>
            <h1>Greatest react blog ever</h1>
          </header>
        </Link>
      </Box>
      <nav>
        <HStack spacing="4">
          <Link to='/'>
            <Button colorScheme="teal" size="lg">Home</Button>
          </Link>
          <Link to='/profile'>
            <Button colorScheme="teal" size="lg">Profile</Button>
          </Link>
          <Link to='/privateroute'>
            <Button colorScheme="teal" size="lg">Private Route</Button>
          </Link>
          {
            !context.authState
              ? <Button onClick={() => context.authObj.login()}>Login</Button>
              : <Button onClick={() => context.authObj.logout()}>Logout</Button>
          }
        </HStack>
      </nav>

    </Container>
  )
};


export default Header;