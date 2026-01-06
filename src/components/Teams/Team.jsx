import { useEffect, useState, useRef } from "react";
import { getTeam, getAlumni } from "../../api/team";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import AlumniCard from "./AlumniCard";
import TeamMember from "./MemberCard";
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  Grid,
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
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

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

  const [alumni, setAlumni] = useState(null);
  const [alumniYear, setAlumniYear] = useState(2023);
  // const [selectedAlumniYear, setSelectedAlumniYear] = useState(null);

  const [team, setTeam] = useState(null);

  let yearSet = [];
  const currentDate = new Date();
  const currYear = currentDate.getFullYear();
  for (let year = currYear; year >= 2016; year--) {
    yearSet.push(year);
  }

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
            .filter((year) => team[year]?.length > 0)
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

      {/* ALUMNI SECTION */}

      <Box mt={16}>
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

        {!isMobile && (
          <Flex width="90%" borderRadius="2rem" backgroundColor="whiteAlpha.50">
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
                {yearSet.map((year) => (
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
                      color={year === alumniYear ? "white" : "#BDE0FF99"}
                      _hover={{
                        color: year === alumniYear ? "#fff" : "#ffffff99",
                      }}
                      // borderBottom="1px solid white"
                      display="inline"
                      cursor="pointer"
                      fontSize="lg"
                      fontWeight="bold"
                      onClick={() => {
                        if (alumniYear === year) return;
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
        )}

        {isMobile && (
          <Center>
            <Menu>
              <MenuButton
                className="w-4/5"
                as={Button}
                rightIcon={<ChevronDownIcon />}
                backgroundColor="#596274"
                color="#ffffff"
                pl="41px"
              >
                {alumniYear === null ? "Select Batch Year" : alumniYear}
              </MenuButton>
              <MenuList display="flex" flexDirection="column">
                {yearSet.map((year) => (
                  <MenuItem
                    width="90%"
                    borderRadius="10px"
                    backgroundColor={
                      year === alumniYear ? "#BDE0FF" : "#ffffff"
                    }
                    onClick={() => {
                      if (alumniYear === year) return;
                      setAlumni(null);
                      setAlumniYear(year);
                    }}
                    key={year}
                  >
                    {year}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Center>
        )}

        <Grid key={alumniYear} mb={2} direction="column">
          <Heading
            as="h1"
            mt="3rem"
            mb="2%"
            // color="teal.100"
            color="white"
            fontSize={{ base: "lg", md: "2xl" }}
            textAlign="center"
          >
            Batch of {alumniYear}
          </Heading>

          <Grid
            px="3rem"
            mb="3rem"
            templateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={4}
            padding={{ base: "15px", sm: "10px", md: "30px" }}
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
