import { useAuth0 } from "@auth0/auth0-react";
import { Button, HStack } from '@chakra-ui/react';
import React, { useState } from "react";
import { Link } from "react-router-dom";



const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <React.Fragment>

      <nav>
        <HStack spacing="4">
          <Link
            to="/"
            activeclassname="router-link-exact-active"
          >
            <Button colorScheme="teal" size="lg">Home</Button>
          </Link>
          <Link to='/profile'>
            <Button colorScheme="teal" size="lg">Profile</Button>
          </Link>
          {isAuthenticated && (
            <Link
              to="/external-api"
              activeclassname="router-link-exact-active"
            >


              <Button colorScheme="teal" size="lg">External API</Button>
            </Link>
          )}


        </HStack>
      </nav>
    </React.Fragment >
  );
};

export default NavBar;
