import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import AlumniCard from "./AlumniCard";
import TeamMember from "./MemberCard";
import { getCurrentSessionBatch } from "../../utils/batch";
import {
  Box, 
  Center,
  Heading,
  Text,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  // MenuItemOption,
  // MenuGroup,
  // MenuOptionGroup,
  // MenuDivider,
  Button,
  // useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";

const Team = () => {
  const { loading, setLoading } = useLoading();
  const scrollContainerRef = useRef(null);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const scroll = (direction) => {
    // const scrollDistance = useBreakpointValue({
    //   base: 100,
    //   sm: 75,
    //   md: 100,
    //   lg: 150,
    //   xl: 200,
    // });
    const scrollDistance = 530;
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      if (direction === "left") {
        scrollContainerRef.current.scrollTo({
          left: scrollLeft - scrollDistance,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        scrollContainerRef.current.scrollTo({
          left: scrollLeft + scrollDistance,
          behavior: "smooth",
        });
      }
    }
  };

  const currentSessionBatch = getCurrentSessionBatch();
  const [alumni, setAlumni] = useState(null);
  const [alumniYear, setAlumniYear] = useState(currentSessionBatch - 1);
  // const [selectedAlumniYear, setSelectedAlumniYear] = useState(null);

  const [team, setTeam] = useState(null);

  let yearSet = [];
  for (let year = currentSessionBatch - 1; year >= 2016; year--) {
    yearSet.push(year);
  }

  useEffect(() => {
    console.log("Fetching team data...");
    setLoading(true);
    fetch("http://localhost:8000/team/api/team/")
      .then(response => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then(data => {
        console.log("Team data received:", data);
        setTeamData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching team data:", err);
        setLoading(false);
      });
  }, []);

  const MemberCard = ({ member, showDesignation = true }) => (
    <Box
      width="18%"
      minWidth="180px"
      margin="10px"
      textAlign="center"
      color="white"
    >
      <Box
        position="relative"
        width="160px"
        height="160px"
        mx="auto"
        mb="15px"
        cursor="pointer"
        _hover={{
          ".overlay": { opacity: 1 },
          ".image": { transform: "scale(1.05)" }
        }}
      >
        <Image
          className="image"
          src={member.image ? `http://localhost:8000${member.image}` : "/default-avatar.png"}
          alt={member.name}
          width="160px"
          height="160px"
          objectFit="cover"
          borderRadius="50%"
          border="3px solid #45c3ff"
          transition="transform 0.4s ease"
          boxShadow="0 6px 20px rgba(69, 195, 255, 0.3)"
        />
        <Box
          className="overlay"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0,0,0,0.8)"
          borderRadius="50%"
          opacity={0}
          transition="opacity 0.4s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Flex gap={4}>
            {member.facebook && (
              <Box 
                as="a" 
                href={member.facebook} 
                target="_blank" 
                bg="#1877F2"
                color="white"
                px="10px"
                py="6px"
                borderRadius="6px"
                fontSize="12px"
                fontWeight="bold"
                _hover={{ transform: "scale(1.1)", bg: "#166fe5" }}
                transition="all 0.2s ease"
              >
                fb
              </Box>
            )}
            {member.linkedin && (
              <Box 
                as="a" 
                href={member.linkedin} 
                target="_blank" 
                bg="#0077B5"
                color="white"
                px="8px"
                py="6px"
                borderRadius="6px"
                fontSize="12px"
                fontWeight="bold"
                _hover={{ transform: "scale(1.1)", bg: "#005885" }}
                transition="all 0.2s ease"
              >
                in
              </Box>
            )}
            {member.mobile && (
              <Box 
                as="a" 
                href={`tel:${member.mobile}`} 
                bg="#25D366"
                color="white"
                px="8px"
                py="6px"
                borderRadius="6px"
                fontSize="14px"
                _hover={{ transform: "scale(1.1)", bg: "#1da851" }}
                transition="all 0.2s ease"
              >
                📞
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
      <Text fontSize="16px" fontWeight="600" mb="3px">
        {member.name}
      </Text>
      {showDesignation && (
        <Text fontSize="13px" color="#45c3ff" fontWeight="500">
          {member.designation}
        </Text>
      )}
    </Box>
  );

  const LeaderCard = ({ member, showDesignation = true }) => (
    <Box
      width="18%"
      minWidth="200px"
      margin="15px"
      textAlign="center"
      color="white"
    >
      <Box
        position="relative"
        width="200px"
        height="200px"
        mx="auto"
        mb="20px"
        cursor="pointer"
        _hover={{
          ".overlay": { opacity: 1 },
          ".image": { transform: "scale(1.05)" }
        }}
      >
        <Image
          className="image"
          src={member.image ? `http://localhost:8000${member.image}` : "/default-avatar.png"}
          alt={member.name}
          width="200px"
          height="200px"
          objectFit="cover"
          borderRadius="50%"
          border="4px solid #45c3ff"
          transition="transform 0.4s ease"
          boxShadow="0 8px 25px rgba(69, 195, 255, 0.4)"
        />
        <Box
          className="overlay"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0,0,0,0.8)"
          borderRadius="50%"
          opacity={0}
          transition="opacity 0.4s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Flex gap={6}>
            {member.facebook && (
              <Box 
                as="a" 
                href={member.facebook} 
                target="_blank" 
                bg="#1877F2"
                color="white"
                px="12px"
                py="8px"
                borderRadius="8px"
                fontSize="14px"
                fontWeight="bold"
                _hover={{ transform: "scale(1.1)", bg: "#166fe5" }}
                transition="all 0.2s ease"
              >
                fb
              </Box>
            )}
            {member.linkedin && (
              <Box 
                as="a" 
                href={member.linkedin} 
                target="_blank" 
                bg="#0077B5"
                color="white"
                px="10px"
                py="8px"
                borderRadius="8px"
                fontSize="14px"
                fontWeight="bold"
                _hover={{ transform: "scale(1.1)", bg: "#005885" }}
                transition="all 0.2s ease"
              >
                in
              </Box>
            )}
            {member.mobile && (
              <Box 
                as="a" 
                href={`tel:${member.mobile}`} 
                bg="#25D366"
                color="white"
                px="10px"
                py="8px"
                borderRadius="8px"
                fontSize="16px"
                _hover={{ transform: "scale(1.1)", bg: "#1da851" }}
                transition="all 0.2s ease"
              >
                📞
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
      <Text fontSize="18px" fontWeight="600" mb="5px">
        {member.name}
      </Text>
      {showDesignation && (
        <Text fontSize="14px" color="#45c3ff" fontWeight="500">
          {member.designation}
        </Text>
      )}
    </Box>
  );

  // Separate leadership positions
  const leadershipPositions = ["President", "Vice President", "Treasurer", "Convenor", "General Secretary"];
  const leadership = teamData.flagbearers.filter(member => 
    leadershipPositions.includes(member.designation)
  );
  const otherMembers = teamData.flagbearers.filter(member => 
    !leadershipPositions.includes(member.designation)
  );

  return (
    <Box
      bg="#1e1e1e"
      style={{
        padding: "auto 10vw",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {loading && <Loader />}

      {/* TEAM HEADER */}
      <Box w="100%" mt="0">
        <Box
          w="100%"
          position="relative"
          sx={{ "@media (max-width: 800px)": { display: "none" } }}
        >
          <Image 
            src={`${process.env.REACT_APP_BACKEND_URL}/media/images/teamheader.jpeg`} 
            alt="Team Header" 
            w="100%"
            h="auto"
            objectFit="cover"
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bg="blackAlpha.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Heading
              color="white"
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="extrabold"
              textAlign="center"
              textTransform="uppercase"
              fontFamily="Mulish"
              letterSpacing="wide"
            >
              MEET OUR<br />TEAM
            </Heading>
          </Box>
        </Box>
        <Heading
          className="team-heading"
          mt="5rem"
          mb={3}
          textAlign="center"
          display="none"
          sx={{ "@media (max-width: 800px)": { display: "block" } }}
        >
          Meet Our Team
        </Heading>

        {team &&
          Object.keys(team)
            .filter((year) => team[year]?.length > 0 && parseInt(year) >= currentSessionBatch)
            .sort((a, b) => a - b) // Ensure chronological order
            .map((year, i) => (
              <Box key={i}>
                <Center mt="5rem" display={"flex"} flexDir={"row"}>
                  <hr style={{ flex: 1, color: "BDE0FF99" }} />
                  <Heading
                    // color={"teal.100"}
                    color={"white"}
                    width={"max-content"}
                    justifyContent={"center"}
                    className="team-heading"
                    zIndex={1}
                    margin={"1em 1em 1em 1em"}
                    fontSize="2xl"
                  >
                    Batch of {year}
                  </Heading>
                  <hr style={{ flex: 1, color: "BDE0FF99" }} />
                </Center>

                <SimpleGrid
                  columns={[1, 2, 3, 4, 5]}
                  justifyContent={"space-around"}
                >
                  {team[year]?.length > 0 &&
                    team[year].map((member, id) => (
                      <TeamMember key={id} member={member} />
                    ))}
                </SimpleGrid>
              </Box>
            ))}
      </Box>

      {/* COORDINATORS SECTION */}
      <Box p={4}>
        <Center>
          <Heading color="white" margin="70px 0 40px 0" letterSpacing="3px">
            COORDINATORS
          </Heading>
        </Center>

        <Flex
          flexWrap="wrap"
          justifyContent="center"
          bg="#111"
          paddingBottom="40px"
        >
          {teamData.coordinators.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </Flex>
      </Box>

      {/* ALUMNI BUTTON */}
      <Center margin="60px 0">
        <Box
          as="a"
          href="/alumni"
          bg="#45c3ff"
          color="white"
          padding="10px 20px"
          borderRadius="6px"
          fontSize="14px"
          textDecoration="none"
          display="inline-block"
        >
          OUR ALUMNI ↗
        </Box>
      </Center>
    </Box>
  );
};

export default Team;