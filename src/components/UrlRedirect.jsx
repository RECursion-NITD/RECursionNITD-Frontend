import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Spinner, Flex } from "@chakra-ui/react";
import axios from "../api/axios";

const UrlRedirect = () => {
  const { shortCode } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(`/url/${shortCode}/`);
        const { original_url: originalUrl } = response.data;
        if (originalUrl) {
          window.location.replace(originalUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch the URL:", err);
        setError(true);
      }
    };

    fetchOriginalUrl();
  }, [shortCode]);

  if (error) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        minH="60vh"
        px={4}
      >
        <Text fontSize="3xl" color="red.500" mb={4}>
          URL Not Found
        </Text>
        <Text fontSize="lg" textAlign="center">
          The link you clicked on might be broken, expired, or typed incorrectly.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="60vh"
    >
      <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      <Text fontSize="xl" mt={6}>
        Redirecting...
      </Text>
    </Flex>
  );
};

export default UrlRedirect;
