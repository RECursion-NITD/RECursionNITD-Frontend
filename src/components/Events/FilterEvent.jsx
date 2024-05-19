import React from "react";
// import {
//   Box,
//   Button,
//   Flex,
//   IconButton,
//   Input,
//   useMediaQuery,
// } from "@chakra-ui/react";
import { Box, Button, Flex, IconButton, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const FilterEvent = ({
  setEventType,
  setSearchQuery,
  FilterSearchHandler,
  EventType,
}) => {
  // const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      borderRadius={"16px"}
      padding={"15px"}
      flexDirection={"column"} // Stack items vertically
      width={"80%"} // Increase width slightly on mobile
      height={"fit-content"}
      position={"relative"}
      top={"2em"}
      bg={"gray.700"}
      // left={!"0"}
      alignItems={"center"}
      // color={"#BDE0FF"}
      marginBottom={"4em"}
    >
      {/* Filter (All, classes, contests, events) */}
      <Box
        width="100%"
        bg="gray.700"
        // paddingBottom={"15px"}
        // marginTop={"1em"}
        // marginBottom={"1em"} // Add margin for spacing on mobile
        // borderBottom={"solid #212121 2px"}
      >
        <Flex width="100%">
          <Input
            color="black"
            bg="white"
            mr={2}
            flex="1"
            placeholder="Search Events"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <IconButton
            backgroundColor="#BDE0FF"
            color="#596274"
            marginBottom={"1em"}
            _hover={{
              background: "gray.700",
              color: "#BDE0FF",
            }}
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={FilterSearchHandler}
          />
        </Flex>
      </Box>

      <Box
        borderRadius={"16px"}
        width="100%"
        bg="gray.700"
        // height={!"100%"}
        display="flex"
        flexDirection={"row"}
        // alignItems="center" // Align items to the left
        justifyContent="space-evenly" // Space around items
      >
        <Button
          _hover={{
            background: "gray.800",
          }}
          margin={"0.1em"}
          padding={"0.5em"}
          flex={1}
          borderRadius={"16px"}
          // textAlign="left"
          background={EventType === "All" ? "gray.800" : "gray.700"}
          color="lightBlue"
          onClick={() => {
            setEventType("All");
          }}
        >
          {"All"}
        </Button>

        <Button
          _hover={{
            background: "gray.800",
          }}
          margin={"0.1em"}
          borderRadius={"16px"}
          flex={1}
          padding={"1em"}
          // textAlign="left"
          background={EventType === "Contest" ? "gray.800" : "gray.700"}
          color="lightBlue"
          onClick={() => {
            setEventType("Contest");
          }}
        >
          Contests
        </Button>

        <Button
          _hover={{
            background: "gray.800",
          }}
          margin={"0.1em"}
          borderRadius={"16px"}
          flex={1}
          // textAlign="left"
          padding={"1em"}
          background={EventType === "Class" ? "gray.800" : "gray.700"}
          color="lightBlue"
          onClick={() => {
            setEventType("Class");
          }}
        >
          Classes
        </Button>

        <Button
          _hover={{
            background: "gray.800",
          }}
          margin={"0.1em"}
          borderRadius={"16px"}
          flex={1}
          // textAlign="left"
          padding={"1em"}
          background={EventType === "Event" ? "gray.800" : "gray.700"}
          color="lightBlue"
          onClick={() => {
            setEventType("Event");
          }}
        >
          Events
        </Button>
      </Box>
    </Flex>
  );
};

export default FilterEvent;
