import { Avatar, AvatarBadge, Box, Button, Container, Flex, Heading, HStack, Image, Menu, MenuButton, MenuDivider, MenuGroup, MenuIcon, MenuItem, MenuList, Spacer, Tag, TagLabel, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../utils/context';
import headerImage from "./../assets/headerimage.jpg";
import styles from "./Header.css"
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons'


const Header = () => {
  const context = useContext(Context)

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <React.Fragment>

      <Box
        bg="teal.500"
        p={2}>
        <Container>
          <Heading as="h1" size="md" >
            <Flex
              align="center">

              <Link
                to='/'
                color="white"
              >
                <Text

                  color="white"
                >
                  Greatest react blog ever

                </Text>
              </Link>

              <Spacer />

              {!isAuthenticated && (
                <Link>
                  <Button
                    id="qsLoginBtn"
                    colorScheme="teal"
                    className="btn-margin"
                    onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </Button>
                </Link>
              )}

              {isAuthenticated && (
                <Menu>
                  <MenuButton
                    as={Button}
                    colorScheme="teal"
                    height="auto"
                    width="auto"
                    p={2}
                    borderRadius="100%">
                    <Avatar
                      size="md"
                      name={user.name}
                      alt="Profile picture"
                      src={user.picture} />
                    <AvatarBadge>
                      <ChevronDownIcon />

                    </AvatarBadge>
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title={user.name}>
                      <MenuItem
                        icon={<FontAwesomeIcon icon="user" className="mr-3" />}
                        to="/profile"
                      >
                        Profile
                        </MenuItem>
                      <MenuItem
                        onClick={() => logoutWithRedirect()}
                        icon={<FontAwesomeIcon icon="power-off" className="mr-3" />}
                      >
                        Log out
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Help">
                      <MenuItem>Docs</MenuItem>
                      <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
                // <Box nav inNavbar>
                //   <Box nav caret id="profileDropDown">

                //   </Box>
                //   <Box>
                //     <Box header>{user.name}</Box>
                //     <Box
                //       to="/profile"
                //       className="dropdown-profile"
                //       activeClassName="router-link-exact-active"
                //     >
                //       <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                //     </Box>
                //     <Box
                //       id="qsLogoutBtn"
                //       onClick={() => logoutWithRedirect()}
                //     >
                //       <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                //       out
                //     </Box>
                //   </Box>
                // </Box>
              )}
            </Flex>
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