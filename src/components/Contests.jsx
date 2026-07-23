import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Badge,
  Button,
  Flex,
  Spinner,
  useToast,
  ButtonGroup,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterPlatform, setFilterPlatform] = useState("All");
  const toast = useToast();

  const fetchContests = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://clist.by/api/v4/contest//?username=Anin&api_key=c16cb57a4fcc896bbd7a7108dc6f24d964047916&upcoming=true&order_by=start&resource_id__in=1%2C2%2C93",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch contests");
      }

      const data = await response.json();

      // Filter API data before saving to state
      const filteredApiContests = data.objects.filter((contest) => {
        const nameLower = contest.event.toLowerCase();
        
        // Codeforces (Resource ID 1) -> All contests
        if (contest.resource_id === 1) return true;
        
        // CodeChef (Resource ID 2) -> Only 'Starters'
        if (contest.resource_id === 2) return nameLower.includes("starter");
        
        // AtCoder (Resource ID 93) -> Only 'Beginner'
        if (contest.resource_id === 93) return nameLower.includes("beginner");
        
        return false;
      });

      const contestsData = filteredApiContests.map((contest) => ({
        id: contest.id,
        name: contest.event,
        startTime: contest.start,
        endTime: contest.end,
        duration: contest.duration,
        url:
          contest.resource === "atcoder.jp"
            ? `${contest.href}?lang=en`
            : contest.href,
        platform:
          contest.resource_id === 1
            ? "Codeforces"
            : contest.resource_id === 2
            ? "CodeChef"
            : "AtCoder",
        color:
          contest.resource_id === 1
            ? "red"
            : contest.resource_id === 2
            ? "yellow"
            : "blue",
      }));

      setContests(contestsData);
    } catch (err) {
      console.error(err);

      toast({
        title: "Error fetching contests",
        description: "Could not load contests.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const formatDuration = (secondsStr) => {
    const seconds = parseFloat(secondsStr);
    if (isNaN(seconds)) return secondsStr;
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    
    let result = [];
    if (hrs > 24) {
      const days = Math.floor(hrs / 24);
      const remainingHrs = hrs % 24;
      if (days > 0) result.push(`${days} day${days !== 1 ? "s" : ""}`);
      if (remainingHrs > 0) result.push(`${remainingHrs} hour${remainingHrs !== 1 ? "s" : ""}`);
    } else {
      if (hrs > 0) result.push(`${hrs} hour${hrs !== 1 ? "s" : ""}`);
      if (mins > 0) result.push(`${mins} minute${mins !== 1 ? "s" : ""}`);
    }
    return result.join(" ");
  };

  const getOrdinalNum = (n) => {
    return (
      n +
      (n > 0
        ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : "")
    );
  };

  // This handles the UI buttons (All, Codeforces, CodeChef, AtCoder)
  const filteredContests = contests.filter((c) => {
    if (filterPlatform === "All") return true;
    return c.platform === filterPlatform;
  });

  return (
    <Box
      minHeight="100vh"
      width="100%"
      bg="#121212"
      color="white"
      pt="12vh"
      pb="8vh"
      px={{ base: "4", md: "12" }}
    >
      <Flex direction="column" align="center" mb={10}>
        <Heading
          as="h1"
          size="2xl"
          mb={4}
          lineHeight="1.3"
          fontFamily="Open Sans"
          textAlign="center"
          bgGradient="linear(to-r, #58CDFF, #FFFFFF)"
          bgClip="text"
        >
          Competitive Programming Contests
        </Heading>
        <Text fontSize="lg" color="gray.400" mb={8} textAlign="center">
          Keep track of upcoming contests on Codeforces, CodeChef, and AtCoder.
        </Text>

        <ButtonGroup
          variant="outline"
          spacing="4"
          flexWrap="wrap"
          justifyContent="center"
        >
          {["All", "Codeforces", "CodeChef", "AtCoder"].map((plat) => (
            <Button
              key={plat}
              onClick={() => setFilterPlatform(plat)}
              bg={filterPlatform === plat ? "#58CDFF" : "transparent"}
              color={filterPlatform === plat ? "black" : "#58CDFF"}
              borderColor="#58CDFF"
              _hover={{
                bg:
                  filterPlatform === plat
                    ? "#58CDFF"
                    : "rgba(88, 205, 255, 0.1)",
              }}
              mb={2}
            >
              {plat}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" height="40vh">
          <Spinner size="xl" color="#58CDFF" thickness="4px" />
        </Flex>
      ) : filteredContests.length === 0 ? (
        <Flex justify="center" align="center" height="40vh">
          <Text fontSize="xl" color="gray.500">
            No upcoming contests found.
          </Text>
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredContests.map((contest, index) => {
            const startDate = new Date(`${contest.startTime}Z`);
            const isOngoing = new Date() > startDate;
            
            const day = getOrdinalNum(startDate.getDate());
            const month = startDate.toLocaleDateString("en-IN", { month: "long" });
            const year = startDate.getFullYear();
            
            const timeString = startDate.toLocaleTimeString("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }).toLowerCase();

            return (
              <Flex
                key={index}
                direction="column"
                justify="space-between"
                height="100%" 
                width="100%"
                bg="#1E1E1E"
                borderRadius="xl"
                p={6}
                boxShadow="lg"
                border="1px solid #2D2D2D"
                transition="all 0.3s ease"
                _hover={{
                  boxShadow: "0 10px 20px rgba(88, 205, 255, 0.1)",
                  borderColor: "#58CDFF",
                }}
              >
                <Box>
                  <Flex justify="space-between" align="start" mb={4}>
                    <Badge
                      colorScheme={contest.color}
                      variant="solid"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {contest.platform}
                    </Badge>
                    {isOngoing ? (
                      <Badge
                        colorScheme="green"
                        variant="outline"
                        px={2}
                        borderRadius="md"
                      >
                        ONGOING
                      </Badge>
                    ) : (
                      <Badge
                        colorScheme="purple"
                        variant="outline"
                        px={2}
                        borderRadius="md"
                      >
                        UPCOMING
                      </Badge>
                    )}
                  </Flex>

                  <Text color="white" fontSize="md" mb={2}>
                    <strong>{contest.name}</strong> will start on {day} {month}, {year} at {timeString} IST.
                  </Text>

                  <Text color="white" fontSize="md" mb={6}>
                    Contest duration is {formatDuration(contest.duration)}.
                  </Text>
                </Box>

                <Box>
                  <Text color="gray.300" fontSize="md" mb={2} wordBreak="break-word">
                    Contest link:{" "}
                    <Link
                      href={contest.url}
                      color="#58CDFF"
                      isExternal
                      _hover={{ textDecoration: "underline" }}
                    >
                      {contest.url}
                    </Link>
                  </Text>
                  
                  <Text color="white" fontSize="md" fontWeight="medium">
                    Happy Coding! 😀
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Contests;