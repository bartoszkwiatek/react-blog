import { Box, Center, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingSpinner = () => (
  <Center>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="teal.500"
      size="xl"
    />
  </Center>
)

export default LoadingSpinner;
