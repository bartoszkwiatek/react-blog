import { Box, Container, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {

  return (
    <Box
      bg="teal.500"
      p={2}
      h="100px">
      <Container>
        <Flex
          align="center">
          {/* <Link
            to='/'
            color="white"
          > */}
          <Text
            color="white"
          >

            Bartosz Kwiatek 🌸 bkwiatek3@gmail.com
            </Text>
          {/* </Link> */}
          <Spacer />
        </Flex>
      </Container>
    </Box >
  )
};


export default Footer;