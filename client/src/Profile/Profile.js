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
              <ul>
                {items.map((item) => (
                  <Box
                    key={item._id}
                    as="article"
                    p="5"
                    marginBottom="5"
                    borderWidth="1px"
                    rounded="md"
                  >
                    <Flex
                    // align="center"
                    >
                      <Box w="100%">
                        <Flex justifyContent="space-between">
                          <Box as="time" size="sm" dateTime={item.createdAt}>
                            {format(
                              new Date(item.createdAt),
                              'dd.MM.yyyy HH:mm',
                            )}
                          </Box>
                          <PostAuthor author={item.author} src="" />
                        </Flex>
                        <Heading size="md" my="2">
                          {item.title}
                        </Heading>
                        <Text style={{ whiteSpace: 'pre-wrap' }}>
                          {item.shortContent}
                        </Text>
                      </Box>
                      <Spacer />

                      <VStack
                        borderLeft="solid 1px"
                        borderColor={'gray.200'}
                        pl="1rem"
                        ml="1rem"
                        variant="outline"
                        fontSize="20"
                        // flexDirection="column"
                        spacing="3"
                        // display="block"
                      >
                        <IconButton
                          onClick={() => handleEditButton(item)}
                          colorScheme="blue"
                          aria-label="edit"
                          title="edit"
                          icon={<EditIcon />}
                        />
                        {/* <Spacer /> */}
                        <IconButton
                          onClick={async () => {
                            await deletePost(`api/posts/${item._id}`)
                            refreshPage()
                            handleTabsChange(3)
                          }}
                          colorScheme="red"
                          aria-label="delete"
                          title="delete"
                          icon={<DeleteIcon />}
                        />
                      </VStack>
                    </Flex>
                  </Box>
                ))}
              </ul>
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
