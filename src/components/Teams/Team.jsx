import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import {
  Box, 
  Center,
  Heading,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";

const Team = () => {
  const { loading, setLoading } = useLoading();
  const [teamData, setTeamData] = useState({ flagbearers: [], coordinators: [] });

  // Fetch new team data from Django API
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
      bg="#1a202c"
      style={{
        padding: "auto 10vw",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {loading && <Loader />}

      {/* FULL TEAM IMAGE */}
      <Box width="100%" mb="40px" position="relative">
        <Image
          src="http://localhost:8000/media/images/teamheader.jpeg"
          alt="Full Team Image"
          width="100%"
          height="auto"
          objectFit="contain"
          display="block"
          filter="brightness(0.6) grayscale(30%)"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0,0,0,0.3)"
        />
        <Heading
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          fontSize={{ base: "32px", md: "48px", lg: "64px" }}
          fontWeight="800"
          letterSpacing="4px"
          textAlign="center"
          textShadow="2px 2px 4px rgba(0,0,0,0.8)"
          textTransform="uppercase"
          zIndex={2}
        >
          MEET OUR TEAM
        </Heading>
      </Box>

      {/* FLAGBEARERS SECTION */}
      <Box p={4}>
        <Center mt="5rem">
          <Heading color="white" margin="70px 0 40px 0" letterSpacing="3px">
            FLAGBEARERS
          </Heading>
        </Center>

        {/* Leadership Positions */}
        {leadership.length > 0 && (
          <Flex
            flexWrap="wrap"
            justifyContent="center"
            bg="#111"
            paddingBottom="40px"
            marginBottom="40px"
          >
            {leadership.map(member => (
              <LeaderCard key={member.id} member={member} />
            ))}
          </Flex>
        )}

        {/* Other Members */}
        {otherMembers.length > 0 && (
          <Flex
            flexWrap="wrap"
            justifyContent="center"
            bg="#111"
            paddingBottom="40px"
          >
            {otherMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </Flex>
        )}
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