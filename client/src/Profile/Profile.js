import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import LoadingSpinner from '../LoadingSpinner'
import { useFetch } from '../utils/useFetch'
import { EditPostTab } from './EditPostTab'
import { NewPostTab } from './NewPostTab'
import { PostListTab } from './PostListTab'
import { ProfileTab } from './ProfileTab'

const Profile = ({ match }) => {
  const { user, getAccessTokenSilently } = useAuth0()
  // console.log(user)

  console.log(user.app_metadata)

  const [editedPost, setEditedPost] = useState({})
  const [editedPostId, setEditedPostId] = useState('')
  const [numberOfUpdates, setNumberOfUpdates] = useState(0)
  const { isLoaded, items, error } = useFetch('/api/posts', numberOfUpdates)
  const [tabIndex, setTabIndex] = useState(0)

  const handleEditButton = (item) => {
    setEditedPost(item)
    setEditedPostId(item.id)
    handleTabsChange(2)
  }

  function refreshPage() {
    // console.log('refreshPage here!')
    setNumberOfUpdates(numberOfUpdates + 1)
    setEditedPostId('')
  }

  const handleTabsChange = (index) => {
    // console.log(index)
    setTabIndex(index)
    if (index !== 2) {
      setEditedPostId('')
    }
  }

  if (error) {
    return (
      <Container>
        <Text as="h3">Could not connect to the database</Text>
        <Text as="h4">{error.message}</Text>
      </Container>
    )
  } else if (!isLoaded) {
    return <LoadingSpinner></LoadingSpinner>
  } else {
    return (
      <React.Fragment>
        <Tabs
          index={tabIndex}
          onChange={handleTabsChange}
          variant="line"
          colorScheme="teal"
          isLazy
        >
          <TabList>
            <Tab>Profile</Tab>
            <Tab>New post</Tab>
            <Tab
              isDisabled={editedPostId === ''}
              _disabled={{ cursor: 'inherit', opacity: '0.4' }}
            >
              Edit post
            </Tab>
            <Tab>Posts list</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProfileTab user={user}></ProfileTab>
            </TabPanel>
            <TabPanel>
              <NewPostTab
                refresh={refreshPage}
                handleTabsChange={(index) => handleTabsChange(index)}
              ></NewPostTab>
            </TabPanel>
            <TabPanel>
              <EditPostTab
                item={editedPost}
                refresh={refreshPage}
                handleTabsChange={(index) => handleTabsChange(index)}
              ></EditPostTab>
            </TabPanel>
            <TabPanel>
              <PostListTab
                handleEditButton={(item) => handleEditButton(item)}
                items={items}
                refresh={refreshPage}
                handleTabsChange={(index) => handleTabsChange(index)}
              ></PostListTab>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </React.Fragment>
    )
  }
}

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LoadingSpinner />,
})
