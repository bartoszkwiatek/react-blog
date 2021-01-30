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
    </Container>
  )
};


export default Header;