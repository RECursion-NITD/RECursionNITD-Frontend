import React from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const FilterEvent = ({
  setEventType,
  setSearchQuery,
  FilterSearchHandler,
  EventType,
}) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      borderRadius={isMobile && "16px"}
      padding={isMobile && "15px"}
      flexDirection={"column"} // Stack items vertically
      width={isMobile ? "90%" : "20vw"} // Increase width slightly on mobile
      height={isMobile ? "fit-content" : "100vh"}
      position={isMobile ? "relative" : "fixed"}
      top="8vh"
      bg={"gray.700"}
      left={!isMobile && "0"}
      alignItems={isMobile ? "center" : "flex-start"}
      color={"#BDE0FF"}
      marginBottom={isMobile && "5em"}
    >
      {/* Filter (All, classes, contests, events) */}
      <Box
        width="100%"
        bg="gray.700"
        padding={isMobile ? "15px" : "2em 1em"}
        marginTop={"1em"}
        marginBottom={isMobile ? "1em" : "0"} // Add margin for spacing on mobile
        borderBottom={"solid #212121 2px"}
      >
        <Flex justifyContent="space-between" alignItems="center" width="100%">
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
        borderRadius={isMobile && "16px"}
        width="100%"
        bg="gray.700"
        height={!isMobile && "100%"}
        display="flex"
        flexDirection={isMobile ? "row" : "column"}
        alignItems="flex-start" // Align items to the left
        justifyContent="space-evenly" // Space around items
      >
        <Button
          _hover={{
            background: "gray.800",
          }}
          p={2}
          marginLeft={"5%"}
          width={"95%"}
          borderRadius={isMobile ? "16px" : "16px 0px 0px 16px"}
          textAlign="left"
          background={EventType === "All" ? "gray.800" : "gray.700"}
          onClick={() => {
            setEventType("All");
          }}
        >
          {isMobile ? "All" : "All Events"}
        </Button>

        <Button
          _hover={{
            background: "gray.800",
          }}
          p={2}
          marginLeft={"5%"}
          width={"95%"}
          borderRadius={isMobile ? "16px" : "16px 0px 0px 16px"}
          textAlign="left"
          background={EventType === "Contest" ? "gray.800" : "gray.700"}
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
          p={2}
          marginLeft={"5%"}
          width={"95%"}
          borderRadius={isMobile ? "16px" : "16px 0px 0px 16px"}
          textAlign="left"
          background={EventType === "Class" ? "gray.800" : "gray.700"}
          onClick={() => {
            setEventType("Class");
          }}
        >
          Classes
        </Button>

        <Button
          p={2}
          _hover={{
            background: "gray.800",
          }}
          marginLeft={"5%"}
          width={"95%"}
          borderRadius={isMobile ? "16px" : "16px 0px 0px 16px"}
          textAlign="left"
          background={EventType === "Event" ? "gray.800" : "gray.700"}
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
