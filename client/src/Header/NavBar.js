import { useAuth0 } from "@auth0/auth0-react";
import { Button, HStack } from '@chakra-ui/react';
import React, { useState } from "react";
import { Link } from "react-router-dom";



const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    getAccessTokenSilently,
    isAuthenticated,
    getAccessTokenWithPopup,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);


  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  const externalApi = async () => {
    const token = await getAccessTokenWithPopup(
      {
        audience: 'react-blog-api',
        scope: "read:posts",
      });
    const response = await fetch("http://localhost:3001/api/timesheets", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // 'Authorization': `Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu`,
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ "data": "xd" }) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects


  }

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
            // <Link
            // to="/external-api"
            // activeclassname="router-link-exact-active"
            // >


            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => console.log(externalApi())}
            >External API</Button>
            // </Link>
          )}


        </HStack>
      </nav>
    </React.Fragment >
  );
};

export default NavBar;
