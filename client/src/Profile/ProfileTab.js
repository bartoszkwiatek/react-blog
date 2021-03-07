import { TabPanel } from '@chakra-ui/react'
import React from 'react'
import Highlight from '../Highlight'

export const ProfileTab = (props) => {
  // console.log(props.user)
  return (
    <React.Fragment>
      <img
        src={props.user.picture}
        alt="Profile"
        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
      />
      <h2>{props.user.nickname}</h2>
      <h2>{props.user.name}</h2>
      <p className="lead text-muted">{props.user.email}</p>
      <Highlight>{JSON.stringify(props.user, null, 2)}</Highlight>
    </React.Fragment>
  )
}
