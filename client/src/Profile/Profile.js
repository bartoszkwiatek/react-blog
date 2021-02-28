import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Container, Divider, Flex, Heading, IconButton, Input, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from 'react';
import Highlight from '../Highlight';
import LoadingSpinner from '../LoadingSpinner';
import { PostTemplate } from "../PostDetails/PostTemplate";
import { handleErrors } from "../utils/handleErrors";

const Profile = ({ match }) => {

  const { user, getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();

  const getToken = (payload) => {
    if (process.env.NODE_ENV === 'development') {
      return getAccessTokenWithPopup(payload)
    } else {
      return getAccessTokenSilently(payload)
    }

  }
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [postTitle, setPostTitle] = useState("")
  const [longContent, setLongContent] = useState("")

  const handleTitleChange = (event) => setPostTitle(event.target.value)
  const handleContentChange = (event) => setLongContent(event.target.value)
  const postData = async (url, data) => {
    const token = await getToken(
      {
        audience: 'react-blog-api',
        scope: "add:posts",
      });
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  const deletePost = async (url) => {
    const token = await getToken(
      {
        audience: 'react-blog-api',
        scope: "delete:posts",
      });

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      referrerPolicy: 'no-referrer',
    });
    return response.json();
  }

  const editPost = async (url) => {
    const token = await getToken(
      {
        audience: 'react-blog-api',
        scope: "edit:posts",
      });

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      referrerPolicy: 'no-referrer',
    });
    return response.json();
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const newPost = {
    title: postTitle,
    shortContent: longContent.slice(0, 120),
    longContent: longContent,
    author: user.nickname
  }

  useEffect(() => {
    fetch("/api/posts")
      .then(handleErrors)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        }
      )
      .catch(error => {
        setError(error);
        setIsLoaded(true);

      })
  }, [])

  if (error) {
    return <Container>
      <Text as="h3">
        Could not connect to the database
      </Text>
      <Text as="h4">
        {error.message}
      </Text>
    </Container>
  } else if (!isLoaded) {
    return <LoadingSpinner></LoadingSpinner>
  } else {
    return (
      <React.Fragment>
        <Tabs variant="line" colorScheme="teal">
          <TabList>
            <Tab>Profile</Tab>
            <Tab>New post</Tab>
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
              <VStack
                spacing={2}
                align="flex-end"
              >

                <Input
                  isRequired
                  value={postTitle}
                  onChange={handleTitleChange}
                  placeholder="Title of new post"
                  size="lg"
                />
                <Textarea
                  isRequired
                  value={longContent}
                  onChange={handleContentChange}
                  placeholder="Post content"
                  size="md"
                  resize="vertical"
                  height="200px"
                />
                <Button
                  disabled={!postTitle || !longContent}
                  onClick={() => {
                    postData("/api/posts", newPost);
                    !(process.env.NODE_ENV === 'development') && refreshPage()
                  }}
                  variant="outline"
                  colorScheme="teal"
                  aria-label="save"
                  rightIcon={< AddIcon />}
                >
                  Add
                  </Button>
              </VStack>
              <Divider margin={"2rem 0 2rem 0"} orientation="horizontal" />
              <Text as="h3">Preview:</Text>
              <PostTemplate
                date={new Date()}
                title={postTitle}
                content={longContent}
              />
            </TabPanel>
            <TabPanel>
              <ul>
                {items.map(item => (
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
                        <Box as="time" dateTime={item.createdAt}>
                          {format(new Date(item.createdAt), "dd-MM-yyyy HH:mm")}
                        </Box>
                        <Heading size="md" my="2">
                          {item.title}
                        </Heading>
                        <Text
                          style={{ whiteSpace: "pre-wrap" }}
                        >{item.shortContent}
                        </Text>
                      </Box>
                      <Spacer />
                      <ButtonGroup
                        variant="outline"
                        fontSize="20"
                        spacing="2"
                      >
                        <IconButton
                          onClick={() => {
                            alert('Nothing happened!')
                          }}
                          colorScheme="teal"
                          aria-label="edit"
                          icon={< EditIcon />}
                        />
                        <IconButton
                          onClick={() => {
                            deletePost(`api/posts/${item._id}`)
                            !(process.env.NODE_ENV === 'development') && refreshPage()
                          }}
                          colorScheme="red"
                          aria-label="delete"
                          icon={< DeleteIcon />}
                        />
                      </ButtonGroup>
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
});
