import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import Highlight from '../Highlight'
import LoadingSpinner from '../LoadingSpinner'
import { PostAuthor } from '../PostDetails/PostAuthor'
import { PostTemplate } from '../PostDetails/PostTemplate'
import { handleErrors } from '../utils/handleErrors'
import { useFetch } from '../utils/useFetch'
import { EditPostTab } from './EditPostTab'
import { NewPostTab } from './NewPostTab'
import { PostListTab } from './PostListTab'
import { ProfileTab } from './ProfileTab'

const Profile = ({ match }) => {
  const { user, getAccessTokenSilently } = useAuth0()
  // console.log(user)

  console.log(user.app_metadata)

  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
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

  const deletePost = async (url) => {
    const token = await getAccessTokenSilently({
      audience: 'react-blog-api',
      scope: 'delete:posts',
    })

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      referrerPolicy: 'no-referrer',
    })
    return response.json()
  }
  function refreshPage() {
    console.log('refreshPage here!')
    setNumberOfUpdates(numberOfUpdates + 1)
  }

  const handleTabsChange = (index) => {
    console.log(index)
    setTabIndex(index)
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
            <Tab isDisabled={editedPostId === ''}>Edit post</Tab>
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
