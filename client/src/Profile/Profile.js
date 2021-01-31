import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, ButtonGroup, Container, Flex, IconButton, Input, Spacer, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Container as StrapContainer, Row, Col } from "@chakra-ui/react";
import Highlight from '../Highlight';
import Loading from '../Loading';


const Profile = ({ match }) => {
  const { user } = useAuth0();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [postTitle, setPostTitle] = useState("")
  const [longContent, setLongContent] = useState("")

  const handleTitleChange = (event) => setPostTitle(event.target.value)
  const handleContentChange = (event) => setLongContent(event.target.value)
  const postData = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Basic ${this.accessToken}`,
        'Authorization': `Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu`,
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const deletePost = async (url) => {
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        // 'Authorization': `Basic ${this.accessToken}`,
        'Authorization': `Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu`,
      },
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
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
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <React.Fragment>
        <StrapContainer className="mb-5">
          <Row className="align-items-center profile-header mb-5 text-center text-md-left">
            <Col md={2}>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              />
            </Col>
            <Col md>
              <h2>{user.name}</h2>
              <p className="lead text-muted">{user.email}</p>
            </Col>
          </Row>
          <Row>
            <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
          </Row>
        </StrapContainer>
        <Container maxW="xl" centerContent>
          <Input
            isRequired
            value={postTitle}
            onChange={handleTitleChange}
            placeholder="Title of new post"
            size="md"
          />
          <Textarea
            isRequired
            value={longContent}
            onChange={handleContentChange}
            placeholder="Post content"
            size="md"
            resize="vertical"
          />
          <IconButton
            disabled={!postTitle || !longContent}
            onClick={() => {
              postData("/api/posts", newPost)
              refreshPage()
            }}
            variant="outline"
            colorScheme="teal"
            aria-label="save"
            fontSize="20px"
            icon={< AddIcon />}
          />
        </Container>
        <Container maxW="xl" centerContent>
          <Text mb="8px">{postTitle}</Text>
          <Text mb="8px" style={{ whiteSpace: "pre-wrap" }}>{longContent}</Text>
        </Container>


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
                      refreshPage()
                    }}
                    colorScheme="red"
                    aria-label="delete"
                    icon={< DeleteIcon />}
                  />
                </ButtonGroup>
              </Flex>

              {/* </Link> */}
            </Box>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
