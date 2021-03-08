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
import { ProfileTab } from './ProfileTab'

const Profile = ({ match }) => {
  const { user, getAccessTokenSilently } = useAuth0()
  console.log(user)

  console.log(user.app_metadata)

  // const [error, setError] = useState(null)
  // const [isLoaded, setIsLoaded] = useState(false)
  // const [items, setItems] = useState([])
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [editPostTitle, setEditPostTitle] = useState('')
  const [editPostContent, setEditPostContent] = useState('')
  const [editPostId, setEditPostId] = useState('')
  const [numberOfUpdates, setNumberOfUpdates] = useState(0)
  const { isLoaded, items, error } = useFetch('/api/posts', numberOfUpdates)

  // its working but...
  const handleChange = (event) => {
    const input = event.target.id
    console.log(input)
    switch (input) {
      case 'new-post-title':
        setNewPostTitle(event.target.value)
        break
      case 'new-post-content':
        setNewPostContent(event.target.value)
        break
      case 'edit-post-title':
        setEditPostTitle(event.target.value)
        break
      case 'edit-post-content':
        setEditPostContent(event.target.value)
        break
    }
  }

  // const handleTitleChange = (event) => {
  //   console.log(event.target.id)
  //   setNewPostTitle(event.target.value)
  // }

  // const handleContentChange = (event) => setNewPostContent(event.target.value)

  const handleEditButton = (item) => {
    setEditPostTitle(item.title)
    setEditPostContent(item.longContent)
    setEditPostId(item._id)
  }

  const addPost = async (url, data) => {
    const token = await getAccessTokenSilently({
      audience: 'react-blog-api',
      scope: 'add:posts',
    })
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    })
    return response.json()
  }

  const editPost = async (url, data) => {
    const token = await getAccessTokenSilently({
      audience: 'react-blog-api',
      scope: 'edit:posts',
    })

    const response = await fetch(url, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      referrerPolicy: 'no-referrer',
    })
    return response.json()
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

  const newPostData = {
    title: newPostTitle,
    shortContent: newPostContent.slice(0, 120),
    longContent: newPostContent,
    author: user.nickname,
  }

  const editPostData = {
    title: editPostTitle,
    shortContent: editPostContent.slice(0, 120),
    longContent: editPostContent,
    author: user.nickname,
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
        <Tabs variant="line" colorScheme="teal">
          <TabList>
            <Tab>Profile</Tab>
            <Tab>New post</Tab>
            <Tab>Edit post</Tab>
            <Tab>Posts list</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProfileTab user={user}></ProfileTab>
            </TabPanel>
            <TabPanel>
              <VStack spacing={2} align="flex-end">
                <Input
                  isRequired
                  id="new-post-title"
                  value={newPostTitle}
                  onChange={handleChange}
                  placeholder="Title of new post"
                  size="lg"
                />
                <Textarea
                  isRequired
                  id="new-post-content"
                  value={newPostContent}
                  onChange={handleChange}
                  placeholder="Post content"
                  size="md"
                  resize="vertical"
                  height="200px"
                />
                <Button
                  disabled={!newPostTitle || !newPostContent}
                  onClick={async () => {
                    await addPost('/api/posts', newPostData)
                    refreshPage()
                    // !(process.env.NODE_ENV === 'development') && refreshPage()
                  }}
                  // variant="outline"
                  colorScheme="teal"
                  aria-label="save"
                  title="save"
                  rightIcon={<AddIcon />}
                >
                  Add
                </Button>
              </VStack>
              <Divider margin={'2rem 0 2rem 0'} orientation="horizontal" />
              <Text as="h3">Preview:</Text>
              <PostTemplate
                date={new Date()}
                title={newPostTitle}
                content={newPostContent}
                author={user.nickname}
              />
            </TabPanel>
            <TabPanel>
              <VStack spacing={2} align="flex-end">
                <Input
                  isRequired
                  id="edit-post-title"
                  value={editPostTitle}
                  onChange={handleChange}
                  placeholder="Title of new post"
                  size="lg"
                />
                <Textarea
                  isRequired
                  id="edit-post-content"
                  value={editPostContent}
                  onChange={handleChange}
                  placeholder="Post content"
                  size="md"
                  resize="vertical"
                  height="200px"
                />
                <Button
                  disabled={!editPostTitle || !editPostContent}
                  onClick={async () => {
                    await editPost(`api/posts/${editPostId}`, editPostData)
                    refreshPage()
                  }}
                  // variant="outline"
                  colorScheme="blue"
                  aria-label="save"
                  title="update"
                  rightIcon={<EditIcon />}
                >
                  Update
                </Button>
              </VStack>
              <Divider margin={'2rem 0 2rem 0'} orientation="horizontal" />
              <Text as="h3">Preview:</Text>
              <PostTemplate
                date={new Date()}
                title={editPostTitle}
                content={editPostContent}
                author={user.nickname}
              />
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
