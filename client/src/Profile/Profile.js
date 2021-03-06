import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  MenuDivider,
  Spacer,
  StackDivider,
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

const Profile = ({ match }) => {
  const { user, getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0()

  // console.log(user.app_metadata)

  const getToken = (payload) => {
    if (process.env.NODE_ENV === 'development') {
      return getAccessTokenWithPopup(payload)
    } else {
      return getAccessTokenSilently(payload)
    }
  }
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [editPostTitle, setEditPostTitle] = useState('')
  const [editPostContent, setEditPostContent] = useState('')
  const [editPostId, setEditPostId] = useState('')

  // its working but...
  const handleChange = (event) => {
    const input = event.target.id
    // console.log(input)
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
    const token = await getToken({
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
    const token = await getToken({
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
    const token = await getToken({
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
    window.location.reload(false)
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

  useEffect(() => {
    fetch('/api/posts')
      .then(handleErrors)
      .then((res) => res.json())
      .then((result) => {
        setItems(result)
        setIsLoaded(true)
      })
      .catch((error) => {
        setError(error)
        setIsLoaded(true)
      })
  }, [])

  // console.log(items)
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
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              />
              <h2>{user.nickname}</h2>
              <h2>{user.name}</h2>
              <p className="lead text-muted">{user.email}</p>
              <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
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
                  onClick={() => {
                    addPost('/api/posts', newPostData)
                    !(process.env.NODE_ENV === 'development') && refreshPage()
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
                  onClick={() => {
                    editPost(`api/posts/${editPostId}`, editPostData)
                    !(process.env.NODE_ENV === 'development') && refreshPage()
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
                      <Box>
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
                          onClick={() => {
                            deletePost(`api/posts/${item._id}`)
                            !(process.env.NODE_ENV === 'development') &&
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
