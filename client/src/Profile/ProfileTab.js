import {
  Avatar,
  Box,
  Flex,
  HStack,
  Spacer,
  TabPanel,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import Highlight from '../Highlight'

export const ProfileTab = (props) => {
  // console.log(props.user)
  return (
    <React.Fragment>
      <HStack>
        <Avatar
          m={5}
          size="2xl"
          src={props.user.picture}
          alt="Profile"
          className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
        />
        <VStack alignItems="normal" spacing={2}>
          <Text as="h3">{props.user.nickname}</Text>
          <Text as="h4">{props.user.email}</Text>
        </VStack>
      </HStack>
      <Highlight>{JSON.stringify(props.user, null, 2)}</Highlight>
    </React.Fragment>
  )
}
