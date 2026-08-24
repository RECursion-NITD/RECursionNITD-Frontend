import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import { getContestNotifications } from "../../api/contests";

const PLATFORM_COLORS = {
  codeforces: "#E53E3E", // Adjusted to match image's slightly deeper red
  codechef: "#D69E2E", // Adjusted to match image's yellow/orange
  atcoder: "#3182CE", // Adjusted to match image's blue
};

const PLATFORM_TEXT_COLORS = {
  codeforces: "white",
  codechef: "white", // Changed to white to match the image exactly
  atcoder: "white",
};

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "codeforces", label: "Codeforces" },
  { value: "codechef", label: "CodeChef" },
  { value: "atcoder", label: "AtCoder" },
];

const formatStartTime = (isoString) => {
  if (!isoString) {
    return "TBD";
  }

  // Clist timestamps are UTC; treat timezone-less values as UTC before IST display.
  const normalized = /[zZ]|[+-]\d{2}:\d{2}$/.test(isoString)
    ? isoString
    : `${isoString}Z`;
  const date = new Date(normalized);
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const read = (type) =>
    parts.find((part) => part.type === type)?.value || "";

  const day = Number(read("day"));
  const suffix =
    day >= 11 && day <= 13
      ? "th"
      : { 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th";

  // Force lowercase am/pm to match screenshot exactly
  const dayPeriod = read("dayPeriod").toLowerCase();

  return `${day}${suffix} ${read("month")}, ${read("year")} at ${read("hour")}:${read("minute")} ${dayPeriod} IST.`;
};

const renderNotificationContent = (contest) => {
  const formattedStart =
    contest.start_time_ist ||
    formatStartTime(contest.start_time);

  return (
    <Stack spacing={4} color="white" fontSize="md" lineHeight="1.6" mt={4}>
      <Text fontWeight="semibold">
        {contest.name} will start on {formattedStart}
      </Text>
      <Text>Contest duration is {contest.duration_text}.</Text>
      <Text>
        Contest link:{" "}
        <Link
          href={contest.url}
          isExternal
          color="#58CDFF"
          wordBreak="break-all"
          _hover={{ textDecoration: "underline" }}
        >
          {contest.url}
        </Link>
      </Text>
      <Text>Happy Coding! 😃</Text>
    </Stack>
  );
};

const ContestCard = ({ contest }) => (
  <Box
    bg="#232323" // Matched to the dark grey card background in the image
    borderRadius="xl"
    p={6}
    height="100%"
    textAlign="center"
    position="relative"
    boxShadow="md"
  >
    <Flex justify="space-between" align="center" mb={2} w="100%">
      <Badge
        bg={PLATFORM_COLORS[contest.platform] || "#58CDFF"}
        color={PLATFORM_TEXT_COLORS[contest.platform] || "white"}
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="wider"
        textTransform="uppercase"
      >
        {contest.platform_label}
      </Badge>
      <Badge
        bg="transparent"
        color="#9F7AEA"
        border="1px solid"
        borderColor="#9F7AEA"
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="wider"
      >
        UPCOMING
      </Badge>
    </Flex>

    {renderNotificationContent(contest)}
  </Box>
);

const ContestNotifications = () => {
  const { loading, setLoading } = useLoading();
  const [contests, setContests] = useState([]);
  const [platform, setPlatform] = useState("all");
  const toast = useToast();

  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      try {
        const selectedPlatform = platform === "all" ? null : platform;
        const data = await getContestNotifications(selectedPlatform);
        setContests(data.contests || []);
      } catch (error) {
        toast({
          title: "Could not load contests",
          description:
            error?.response?.data?.detail ||
            "Please verify Clist API credentials on the backend.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadContests();
  }, [platform, setLoading, toast]);

  const filteredContests = useMemo(() => contests, [contests]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box bg="#141414" minH="100vh" pt="10vh" pb={16} px={{ base: 4, md: 8, lg: 12 }} w="100%">
      <Stack spacing={6} align="center" mb={12} textAlign="center">
        <Heading color="#58CDFF" size="2xl" fontWeight="bold">
          Competitive Programming Contests
        </Heading>
        <Text color="#B8B8B8" fontSize="lg" maxW="720px">
          Keep track of upcoming contests on Codeforces, CodeChef, and AtCoder.
        </Text>

        <Flex gap={4} flexWrap="wrap" justify="center" pt={4}>
          {FILTER_OPTIONS.map((option) => {
            const isActive = platform === option.value;
            return (
              <Button
                key={option.value}
                onClick={() => setPlatform(option.value)}
                borderRadius="md"
                px={6}
                py={2}
                fontWeight="semibold"
                bg={isActive ? "#58CDFF" : "transparent"}
                color={isActive ? "black" : "white"}
                border="1px solid"
                borderColor="#58CDFF"
                _hover={{
                  bg: isActive ? "#58CDFF" : "rgba(88, 205, 255, 0.1)",
                }}
              >
                {option.label}
              </Button>
            );
          })}
        </Flex>
      </Stack>

      {filteredContests.length === 0 ? (
        <Box
          bg="#232323"
          borderRadius="xl"
          p={10}
          textAlign="center"
          maxW="720px"
          mx="auto"
        >
          <Text color="white" fontSize="lg" mb={2}>
            No upcoming contests found.
          </Text>
          <Text color="#B8B8B8">
            The backend refreshes contest data daily at 12:01 AM IST.
          </Text>
        </Box>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          spacing={8}
          w="full"
          mx="auto"
        >
          {filteredContests.map((contest) => (
            <ContestCard
              key={`${contest.platform}-${contest.name}-${contest.start_time}`}
              contest={contest}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ContestNotifications;