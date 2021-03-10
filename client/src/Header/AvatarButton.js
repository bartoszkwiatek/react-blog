import { useAuth0 } from '@auth0/auth0-react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Avatar,
  AvatarBadge,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const AvatarButton = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    })

  return (
    <React.Fragment>
      {!isAuthenticated && (
        <Button
          id="qsLoginBtn"
          colorScheme="teal"
          className="btn-margin"
          onClick={() => loginWithRedirect()}
        >
          Log in
        </Button>
      )}

      {isAuthenticated && (
        <Menu positon="absolute">
          <MenuButton
            as={Button}
            colorScheme="teal"
            height="auto"
            width="auto"
            p={0}
            borderRadius="100%"
          >
            <Avatar
              size="md"
              name={user.name}
              alt="Profile picture"
              src={user.picture}
            />
            <AvatarBadge>
              <ChevronDownIcon />
            </AvatarBadge>
          </MenuButton>
          <MenuList>
            <MenuGroup title={user.name}>
              <Link to="/profile">
                <MenuItem
                  icon={<FontAwesomeIcon icon="user" className="mr-3" />}
                >
                  Profile
                </MenuItem>
              </Link>
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
      )}
    </React.Fragment>
  )
}

export default AvatarButton
