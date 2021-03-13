import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../utils/context'
import headerImage from './../assets/headerimage.jpg'
import AvatarButton from './AvatarButton'

const Header = () => {
  const context = useContext(Context)

  return (
    <React.Fragment>
      <Box bg="teal.500" p={2}>
        <Container>
          <Heading size="md">
            <Flex align="center">
              <Link to="/" color="white">
                <Text as="h1" color="white">
                  Greatest react blog ever.
                </Text>
              </Link>
              <Divider
                marginLeft={4}
                h="2.5rem"
                w="3px"
                orientation="vertical"
              ></Divider>
              <Spacer />
              <AvatarButton></AvatarButton>
            </Flex>
          </Heading>
        </Container>
      </Box>
      <Box height="14em" marginBottom={3}>
        <Image
          src={headerImage}
          alt="Flowers on a tree"
          fit="cover"
          width="100%"
          height="100%"
        ></Image>
        <Tag
          size="sm"
          style={{
            float: 'right',
            position: 'relative',
            bottom: '3em',
            right: '2em',
            opacity: '80%',
          }}
        >
          <TagLabel>
            Photo by{' '}
            <a href="https://unsplash.com/@_entreprenerd?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Arno Smit
            </a>{' '}
            on{' '}
            <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Unsplash
            </a>
          </TagLabel>
        </Tag>
      </Box>
    </React.Fragment>
  )
}

export default Header
