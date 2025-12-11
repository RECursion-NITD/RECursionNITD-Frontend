import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const ContestCard = ({ title, date, time }) => (
  <Flex
    direction="row"
    alignItems="center"
    color="white"
    p={4}
    borderRadius="md"
    boxShadow="md"
    mb={4}
    width="full"
    _hover={{ bg: "#2E2E2E" }}
  >
    <Icon as={ChevronRightIcon} boxSize={10} color="white" />
    <Box flex="1">
      <Text fontWeight="bold" fontSize="2xl" mb={1}>
        {title}
      </Text>
      <Text fontSize="lg">Date: {date}</Text>
      <Text fontSize="lg">Time: {time}</Text>
    </Box>
  </Flex>
);

const ContestList = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const codeforcesResponse = await fetch(
          "https://codeforces.com/api/contest.list"
        );
        const codeforcesData = await codeforcesResponse.json();

        const upcomingCodeforces = codeforcesData.result
          .filter(
            (contest) =>
              contest.phase === "BEFORE" &&
              new Date(contest.startTimeSeconds * 1000) <=
                new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
          )
          .map((contest) => ({
            title: contest.name,
            date: new Date(contest.startTimeSeconds * 1000).toLocaleDateString(),
            time: new Date(contest.startTimeSeconds * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));

        setContests([...upcomingCodeforces]);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  return (
    <Box 
      bg="black"
      width="50%"
      minHeight="100vh"
      position="sticky"
      top={0}
      right={0}
      p={4}
      mt="2%"
      overflowY="auto"
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color="white"
        mb={6}
        textAlign="center"
      >
        Upcoming Contests
      </Text>
      <Flex direction="column" height="full">
        {contests.map((contest, index) => (
          <ContestCard
            key={index}
            title={contest.title}
            date={contest.date}
            time={contest.time}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default ContestList;