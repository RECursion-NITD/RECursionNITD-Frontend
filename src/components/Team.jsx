import { useEffect, useState, useRef } from "react";
import { getTeam, getAlumni } from "../api/team";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import jsonData from "../dummydata/dummy_team.json";
import {
  Box,
  Center,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Icon,
  List,
  ListItem,
  Text,
  Grid,
  Card,
  CardBody,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaPhoneSquare } from "react-icons/fa";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const TeamMember = ({ member }) => (
  <Box className="our-team">
    <Box className="pic" boxShadow="2px 2px 50px #0a0a0a">
      <Image
        src={member.image}
        alt={member.name}
        borderRadius="100%"
        borderColor="#343A3F"
        borderWidth="10px"
        borderStyle="solid"
      />

      <List className="social-links">
        <ListItem>
          <Link href={member.url_Facebook} target="_blank" color="white">
            <Icon as={FaFacebook} />
          </Link>
        </ListItem>

        <ListItem>
          <Link href={member.url_LinkedIn} target="_blank" color="white">
            <Icon as={FaLinkedin} />
          </Link>
        </ListItem>

        <ListItem>
          <Link href={`tel:${member.mobile}`} color="white">
            <Icon as={FaPhoneSquare} />
          </Link>
        </ListItem>
      </List>
    </Box>

    <Heading className="team-title">{member.name}</Heading>
    <Box color="#90ee90">{member.designation}</Box>
  </Box>
);

const AlumniCard = ({ alumni }) => (
  <Card
    direction={{ base: "column", sm: "row" }}
    overflow="hidden"
    variant="outline"
    bg="whiteAlpha.200"
    border="none"
    boxShadow="2px 2px 4px #BDE0FF"
    _hover={{ transform: "scale(1.05)", transition: "ease-in 0.3s" }}
  >
    <Image
      objectFit="cover"
      // maxW={{ base: "100%", sm: "200px" }}
      src={alumni.image}
      alt={alumni.name}
      width="40%"
    />

    <Stack width="60%">
      <CardBody>
        <Heading color="#add8e6" size="md">
          {alumni.name}
        </Heading>

        <Text color="white" py="2">
          B.Tech. in {alumni.branch}
        </Text>
        <Link
          href={alumni.url_LinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          color="blue.500"
          fontSize="sm"
          display="flex"
          alignItems="center"
        >
          <FaLinkedin style={{ marginRight: "0.5rem" }} /> LinkedIn Profile
        </Link>
      </CardBody>
    </Stack>
  </Card>
);

const Team = () => {
  const { loading, setLoading } = useLoading();
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
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

  const [alumni, setAlumni] = useState(null);
  const [alumniYear, setAlumniYear] = useState(2023);
  // const [selectedAlumniYear, setSelectedAlumniYear] = useState(null);

  const [team, setTeam] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAlumni(alumniYear)
      .then((data) => {
        setAlumni(data);
        setLoading(false);
      })
      .catch((err) => console.err(err));
  }, [alumniYear]);

  useEffect(() => {
    setLoading(true);
    getTeam()
      .then((data) => {
        setTeam(data);
        setLoading(false);
      })
      .catch((err) => console.err(err));
  }, []);

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

      {/* TEAM HEADER */}
      <Box p={4}>
        <Center mt="5rem">
          <Heading className="team-heading" mt={1} mb={3}>
            Meet The Team
          </Heading>
        </Center>

        {team &&
          Object.keys(team)
            .filter((year) => team[year]?.length > 0)
            .map((year, i) => (
              <Box key={i}>
                <Center mt="3rem">
                  <Heading
                    className="team-heading"
                    mt={1}
                    mb={3}
                    fontSize="2xl"
                  >
                    Batch of {year}
                  </Heading>
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

      {/* ALUMNI SECTION */}

      <Box mt={4}>
        <Center>
          <Heading
            as="h1"
            mt="5%"
            mb="2%"
            color="white"
            fontSize={{ base: "xl", md: "2xl" }}
          >
            Meet our Alumni
          </Heading>
        </Center>

        <Flex width="90%" borderRadius="2rem" backgroundColor="#596274">
          <Box
            w="40px"
            h="40px"
            borderRadius="50%"
            bg="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            marginLeft="50px"
            marginRight="20px"
            onClick={() => scroll("left")}
            _hover={{
              transform: "scale(1.2)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <ArrowLeftIcon color="black" />
          </Box>

          <Box
            flex="60%"
            mr={2}
            overflowX="scroll"
            whiteSpace="nowrap"
            p={4}
            ref={scrollContainerRef}
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Flex>
              {jsonData.year_set.map((year) => (
                <Box
                  flex="0 0 33.33%"
                  p={2}
                  textAlign="center"
                  key={year}
                  _hover={{
                    transform: "scale(1.2)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  <Text
                    color="white"
                    // borderBottom="1px solid white"
                    display="inline"
                    cursor="pointer"
                    fontSize="lg"
                    fontWeight="bold"
                    onClick={() => {
                      // setSelectedAlumniYear(year);
                      setAlumni(null);
                      setAlumniYear(year);
                    }}
                  >
                    Batch of {year}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>

          <Box
            w="40px" // Set the width and height to create a circular shape
            h="40px"
            borderRadius="50%"
            bg="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            marginLeft="20px"
            marginRight="50px"
            onClick={() => scroll("right")}
            _hover={{
              transform: "scale(1.2)",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <ArrowRightIcon color="black" />
          </Box>
        </Flex>

        <Grid key={alumniYear} mb={2} direction="column">
          <Heading
            as="h1"
            mt="1%"
            mb="2%"
            color="white"
            fontSize={{ base: "lg", md: "2xl" }}
            textAlign="center"
          >
            <small>Batch of {alumniYear}</small>
          </Heading>

          <Grid
            px="3rem"
            my="3rem"
            templateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={4}
          >
            {alumni &&
              alumni?.map((alumni, id) => (
                <AlumniCard key={id} alumni={alumni} />
              ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Team;
