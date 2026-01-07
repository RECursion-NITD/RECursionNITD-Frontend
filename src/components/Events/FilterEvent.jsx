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
      display={"flex"}   // added flex caused the white line to shrink
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
    >
      <Box
        display={"flex"}   // added flex caused the white line to shrink
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        margin={0}
      >
        <Button
          size={{ base: "sm", md: "md" }}
          _hover={{
            background: "#34aaff",
          }}
          background={EventType === "All" ? "#34aaff" : "#203f55"}
          color="white"
          onClick={() => {
            setEventType("All");
          }}
          marginRight={"12px"}
        >
          {"All"}
        </Button>

        <Button
          size={{ base: "sm", md: "md" }}
          _hover={{
            background: "#34aaff",
          }}
          background={EventType === "Contest" ? "#34aaff" : "#203f55"}
          color="white"
          onClick={() => {
            setEventType("Contest");
          }}
          marginRight={"12px"}
        >
          Contests
        </Button>

        <Button
          size={{ base: "sm", md: "md" }}
          _hover={{
            background: "#34aaff",
          }}
          background={EventType === "Class" ? "#34aaff" : "#203f55"}
          color="white"
          onClick={() => {
            setEventType("Class");
          }}
          marginRight={"12px"}
        >
          Classes
        </Button>

        <Button
          size={{ base: "sm", md: "md" }}
          _hover={{
            background: "#34aaff",
          }}
          background={EventType === "Event" ? "#34aaff" : "#203f55"}
          color="white"
          onClick={() => {
            setEventType("Event");
          }}
          marginRight={"12px"}
        >
          Events
        </Button>
      </Box>
    </Flex>
  );
};

export default FilterEvent;
