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

const Alumni = () => {
  const { loading, setLoading } = useLoading();
  const [alumniData, setAlumniData] = useState({ alumni: [], yearSet: [] });

  useEffect(() => {
    console.log("Fetching alumni data...");
    setLoading(true);
    fetch("http://localhost:8000/team/api/alumni/")
      .then(response => {
        console.log("Alumni response status:", response.status);
        return response.json();
      })
      .then(data => {
        console.log("Alumni data received:", data);
        setAlumniData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching alumni data:", err);
        setLoading(false);
      });
  }, []);

  const AlumniCard = ({ alumnus }) => (
    <Box
      width="280px"
      margin="20px"
      background="linear-gradient(145deg, #2d3748, #1a202c)"
      borderRadius="20px"
      padding="30px"
      textAlign="center"
      boxShadow="0 10px 30px rgba(0,0,0,0.4)"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "0 15px 40px rgba(69, 195, 255, 0.2)"
      }}
      transition="all 0.3s ease"
    >
      <Box
        position="relative"
        width="120px"
        height="120px"
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
          src={alumnus.image ? `http://localhost:8000${alumnus.image}` : "/default-avatar.png"}
          alt={alumnus.name}
          width="120px"
          height="120px"
          objectFit="cover"
          borderRadius="50%"
          border="3px solid #45c3ff"
          transition="transform 0.4s ease"
          boxShadow="0 5px 20px rgba(69, 195, 255, 0.3)"
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
            {alumnus.linkedin && (
              <Box 
                as="a" 
                href={alumnus.linkedin} 
                target="_blank" 
                bg="#0077B5"
                color="white"
                px="10px"
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
            {alumnus.facebook && (
              <Box 
                as="a" 
                href={alumnus.facebook} 
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
          </Flex>
        </Box>
      </Box>
      <Text fontSize="20px" fontWeight="bold" color="white" mb="8px">
        {alumnus.name}
      </Text>
      <Text fontSize="14px" color="#45c3ff" fontWeight="500">
        B.Tech. in {alumnus.branch}
      </Text>
    </Box>
  );

  return (
    <Box bg="#1a202c" minHeight="100vh" padding="40px 0">
      {loading && <Loader />}

      <Center mb="40px">
        <Heading color="white" fontSize="48px" fontWeight="800" letterSpacing="3px">
          OUR ALUMNI
        </Heading>
      </Center>

      {alumniData.yearSet && alumniData.yearSet.map(year => {
        const yearAlumni = alumniData.alumni.filter(alumnus => alumnus.batch_year === year);
        return (
          <Box key={year} mb="60px">
            <Center mb="30px">
              <Heading color="#45c3ff" fontSize="32px" letterSpacing="2px">
                BATCH OF {year}
              </Heading>
            </Center>

            <Flex
              flexWrap="wrap"
              justifyContent="center"
              gap="20px"
              padding="0 40px"
            >
              {yearAlumni.map(alumnus => (
                <AlumniCard key={alumnus.id} alumnus={alumnus} />
              ))}
            </Flex>
          </Box>
        );
      })}

      {/* BACK TO TEAM BUTTON */}
      <Center margin="60px 0">
        <Box
          as="a"
          href="/team"
          bg="#45c3ff"
          color="white"
          padding="10px 20px"
          borderRadius="6px"
          fontSize="14px"
          textDecoration="none"
          display="inline-block"
        >
          ← BACK TO TEAM
        </Box>
      </Center>
    </Box>
  );
};

export default Alumni;