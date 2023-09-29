import React from "react";
import { Box, Button, Flex, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const FilterEvent = ({ setEventType, setSearchQuery, FilterSearchHandler }) => {
  return (
    <Flex width="100%" height="60px">
      {/* Filter (All,classes,contests,events) */}
      <Box
        flex="40%"
        bg="grey"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" height="100%">
          <Box
            flex={1}
            p={4}
            textAlign="center"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              colorScheme="whiteAlpha"
              width="90%"
              onClick={() => {
                setEventType("All");
              }}
            >
              All
            </Button>
          </Box>
          <Box
            flex={1}
            p={4}
            textAlign="center"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              colorScheme="whiteAlpha"
              width="90%"
              onClick={() => {
                setEventType("Contest");
              }}
            >
              Contests
            </Button>
          </Box>
          <Box
            flex={1}
            p={4}
            textAlign="center"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              colorScheme="whiteAlpha"
              width="90%"
              onClick={() => {
                setEventType("Class");
              }}
            >
              Classes
            </Button>
          </Box>
          <Box
            flex={1}
            p={4}
            textAlign="center"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              colorScheme="whiteAlpha"
              width="90%"
              onClick={() => {
                setEventType("Event");
              }}
            >
              Events
            </Button>
          </Box>
        </Box>
      </Box>

      <Box flex="60%" bg="grey" height="100%">
        <Box display="flex" width="70%" height="100%">
          <Input
            bg="white"
            mr={4}
            placeholder="Basic usage"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <IconButton
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={FilterSearchHandler}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default FilterEvent;
