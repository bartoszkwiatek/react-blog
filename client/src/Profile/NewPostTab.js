import { useAuth0 } from '@auth0/auth0-react'
import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Divider,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { PostTemplate } from '../PostDetails/PostTemplate'

export const NewPostTab = (props) => {
  const { user, getAccessTokenSilently } = useAuth0()
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')

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
    }
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

  const newPostData = {
    title: newPostTitle,
    shortContent: newPostContent.slice(0, 120),
    longContent: newPostContent,
    author: user.nickname,
  }

  function refreshPage() {
    props.refresh()
  }

  const handleTabsChange = (index) => {
    props.handleTabsChange(index)
  }

  return (
    <React.Fragment>
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
            handleTabsChange(3)
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
    </React.Fragment>
  )
}
