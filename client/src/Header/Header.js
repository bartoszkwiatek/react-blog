import { Box, Button, Container, Heading, HStack, Image, Tag, TagLabel } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../utils/context';
import headerImage from "./../assets/headerimage.jpg";
import styles from "./Header.css"

const Header = () => {
  const context = useContext(Context)

  return (
    <React.Fragment>

      <Box
        bg="teal.500"
        color="white"
        p={4}>
        <Container>
          <Heading as="h1" size="md" >

            <Link to='/'>
              Greatest react blog ever
            </Link>
          </Heading>
        </Container>
      </Box>
      <Box
        height="20em"
        marginBottom={3}
      >

        <Image src={headerImage}
          alt="Flowers on a tree"
          fit="cover"
          width="100%"
          height="100%"
        >


        </Image>
        <Tag style={{
          float: "right",
          position: "relative",
          bottom: "3em",
          right: "2em",
          opacity: "80%"
        }}><TagLabel>
            Photo by <a href="https://unsplash.com/@_entreprenerd?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Arno Smit</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
          </TagLabel>
        </Tag>
      </Box>
    </React.Fragment >
  )
};


export default Header;