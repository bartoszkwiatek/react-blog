import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Container, Flex, IconButton, Input, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import Highlight from '../Highlight';
import Loading from '../Loading';
import { handleErrors } from "../utils/handleErrors";

const Profile = ({ match }) => {
  const { user, getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [postTitle, setPostTitle] = useState("")
  const [longContent, setLongContent] = useState("")

  const handleTitleChange = (event) => setPostTitle(event.target.value)
  const handleContentChange = (event) => setLongContent(event.target.value)
  const postData = async (url, data) => {
    const token = await getAccessTokenWithPopup(
      {
        audience: 'react-blog-api',
        scope: "add:posts",
      });
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const deletePost = async (url) => {
    const token = await getAccessTokenSilently(
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

  function refreshPage() {
    window.location.reload(false);
  }

  const newPost = {
    title: postTitle,
    shortContent: longContent.slice(0, 120),
    longContent: longContent,
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
    return <div>Loading...</div>
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
                    postData("/api/posts", newPost)
                    // refreshPage()
                  }}
                  variant="outline"
                  colorScheme="teal"
                  aria-label="save"
                  rightIcon={< AddIcon />}
                >Add</Button>
                <Container>
                  <Text mb="8px">{postTitle}</Text>
                  <Text mb="8px" style={{ whiteSpace: "pre-wrap" }}
                    dangerouslySetInnerHTML={{ __html: `${longContent}` }}
                  ></Text>
                </Container>
              </VStack>
            </TabPanel>
            <TabPanel>
              <ul>
                {items.map(item => (
                  <Box
                    margin="1"
                    padding="1"
                    border="1px"
                    borderRadius="sm"
                    key={item._id}
                  >
                    <Flex
                      align="center">
                      <Box
                        margin="1"
                        padding="1"
                      >
                        <h2>
                          {item.title}
                        </h2>
                        <p>
                          {item.shortContent}
                        </p>
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
                          aria-label="delete"
                          icon={< EditIcon />}
                        />
                        <IconButton
                          onClick={() => {
                            deletePost(`api/posts/${item._id}`)
                            // refreshPage()
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
  onRedirecting: () => <Loading />,
});
