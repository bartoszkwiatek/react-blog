import { useAuth0 } from '@auth0/auth0-react'
import { EditIcon } from '@chakra-ui/icons'
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

export const EditPostTab = (props) => {
  const { user, getAccessTokenSilently } = useAuth0()
  const [editPostTitle, setEditPostTitle] = useState(props.item.title)
  const [editPostContent, setEditPostContent] = useState(props.item.longContent)
  const [editPostId, setEditPostId] = useState(props.item._id)

  const handleChange = (event) => {
    const input = event.target.id
    switch (input) {
      case 'edit-post-title':
        setEditPostTitle(event.target.value)
        break
      case 'edit-post-content':
        setEditPostContent(event.target.value)
        break
    }
  }

  function refreshPage() {
    props.refresh()
  }

  const handleTabsChange = (index) => {
    props.handleTabsChange(index)
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

  const editPostData = {
    title: editPostTitle,
    shortContent: toString(editPostContent).slice(0, 120),
    longContent: editPostContent,
    author: user.nickname,
  }

  return (
    <React.Fragment>
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
            handleTabsChange(3)
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
    </React.Fragment>
  )
}
