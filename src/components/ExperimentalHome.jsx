import homepageCodeSnippet from "../assets/images/homepageCodeSnippet.png";

import algoZenith from "../assets/images/algo_zenith.png";
import cloudsploit from "../assets/images/cloudsploit.png";
import codechef from "../assets/images/codechef.png";
import digitalOcean from "../assets/images/digital_ocean.png";
import hackerrank from "../assets/images/hackerrank.png";
import hiredive from "../assets/images/hiredive.jpg";
import jetbrain from "../assets/images/jetbrain.svg.png";
import nutrichef from "../assets/images/nutrichef.png";
import workatTech from "../assets/images/workat-tech.png";

import logoInverted from "../assets/images/logoInverted.png";
import { useEffect, useLayoutEffect, useState, useRef } from "react";
import {
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Stack,
  Flex,
  Spacer,
  Text,
  Card,
  HStack,
  Box,
  Image,
  Badge,
  SlideFade,
  Heading,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import { getHome } from "../api/home";
import Loader from "./Loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../test.css";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const { user } = useAuth();
  const { loading, setLoading } = useLoading();
  const [homeData, setHomeData] = useState(null);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const toast = useToast();
  useEffect(() => {
    if (!user) return;
    toast({
      title: `Welcome ${user?.username}.`,
      position: "top-right",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }, [user]);

  const containerRef = useRef(null);
  // for gsap animation
  useLayoutEffect(() => {
    gsap.set(".container", { autoAlpha: 1 });

    const animate = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".container01",
          pin: ".headContainer",
          start: "top top",
          end: "bottom 40%",
          scrub: true,
          invalidateOnRefresh: true,
        },
        defaults: { duration: 1, ease: "ease-in" },
      })
      .to(".head", {
        scale: 0.75,
      })
      .to(".head", {
        color: "#E9F841",
        duration: 0.1,
      });

    // CARD ANIMATIONS
    const createCardAnimation = (card, start, end) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, scale: 0.8 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          scrollTrigger: {
            pin: ".content2",
            trigger: card,
            start,
            end,
            scrub: true,
            // markers: true,
          },
        }
      );
    };

    const missionCard = document.querySelector(".missionCard");
    const visionCard = document.querySelector(".visionCard");
    const valueCard = document.querySelector(".valueCard");

    createCardAnimation(missionCard, "top 30%", "top 20%");
    createCardAnimation(visionCard, "top 20%", "top 10%");
    createCardAnimation(valueCard, "top 10%", "top 0%");

    () => {
      animate.kill();
    };
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    getHome()
      .then((data) => {
        setHomeData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="container headContainer">
        <div className="head">
          <h1
            style={{
              fontWeight: "500",
            }}
          >
            <strong>REC</strong>ursion
          </h1>
        </div>
      </div>

      <div className="container container01"></div>

      <div className="container container02">
        <div className="content">
          <h2
            style={{
              color: "white",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "30px",
            }}
          >
            Programming Community of NIT Durgapur
          </h2>
          <div className="homepageLayout">
            <div className="homepageLeft">
              <p className="homepageCard">
                We are programming community of NIT Durgapur, with focus on
                improving coding culture institute wide by conducting regular
                lectures from beginner to advance topics of programming. Our
                goal is to increase student&apos;s participation in
                inter-collegiate contest like ACM-ICPC and help them get better.
              </p>
              <div className="features">
                <div
                  style={{
                    padding: "1em",
                    margin: "1em",
                    borderRight: "solid white 1px",
                  }}
                >
                  <h1>Have a Ques ? </h1>
                  <Button style={{ color: "black", backgroundColor: "yellow" }}>
                    AskREC
                  </Button>
                </div>
                <div>
                  <h1>New to programming ? </h1>
                  <Button style={{ color: "black", backgroundColor: "yellow" }}>
                    get Started
                  </Button>
                </div>
              </div>
            </div>
            <img
              style={{
                position: "relative",
                transform: "translateY(-1em)",
              }}
              src={homepageCodeSnippet}
              width="400px"
              height="400px"
            />
          </div>

          <p>{homeData?.years_of_experience} years of teaching </p>
          <Menu
            className="menu"
            style={{
              margin: "1em",
              padding: "2em",
              display: "flex",
            }}
          >
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Upcoming Events
            </MenuButton>
            <MenuList>
              {/* {homeData?.upcoming_events.map((event) => (
                <MenuItem key={event.id}>{event.title}</MenuItem>
              ))} */}
              <MenuItem key="1">event.title </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <Heading
        className="whoarewe"
        style={{
          color: "white",
          fontWeight: "bold",
          margin: "5em 2em 2em 2em",
        }}
      >
        Who are we ?
      </Heading>
      <div className="content2">
        <div ref={containerRef} className="WhoAreWeCard">
          <div className="card">
            <HStack spacing="34px" mt={10}>
              <Card
                className="missionCard"
                w="280px"
                height="400px"
                rounded="20px"
                overflow="hidden"
                bg="teal.900"
                cursor="pointer"
                _hover={{
                  border: "1px solid white",
                  transform: "scale(1.05)",
                  transition: "ease-in 0.3s",
                }}
                onMouseEnter={() => {
                  setIsHovered1(true);
                }}
                onMouseLeave={() => setIsHovered1(false)}
                mt={8}
              >
                <Image
                  src={logoInverted}
                  alt="Card Image"
                  boxSize="220px"
                ></Image>
                <div className={`slide-fade1 ${isHovered1 ? "visible" : ""}`}>
                  <SlideFade in={isHovered1}>
                    <Box
                      p="75px"
                      w="280px"
                      color="black"
                      mt="4"
                      bg="teal.100"
                      rounded="md"
                      shadow="md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="2em"
                        viewBox="0 0 640 512"
                      >
                        <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
                      </svg>
                    </Box>
                  </SlideFade>
                </div>
                <Box p={5}>
                  <Stack align="center">
                    <Badge
                      variant="subtle"
                      color="teal.100"
                      rounded="full"
                      px={2}
                      fontSize="0.8em"
                    >
                      Mission
                    </Badge>
                  </Stack>
                  <Stack align="center">
                    <br></br>
                    <Text fontWeight="light">
                      Working towards the improvement of campus&apos;s coding
                      culture by organizing regular coding classes and contests.
                    </Text>
                  </Stack>
                  <Flex>
                    <Spacer />
                    <Button variant="solid" color="teal.200" size="sm">
                      Learn More
                    </Button>
                  </Flex>
                </Box>
              </Card>
              <Card
                className="visionCard"
                w="280px"
                height="400px"
                rounded="20px"
                overflow="hidden"
                bg="teal.900"
                cursor="pointer"
                _hover={{
                  border: "1px solid white",
                  transform: "scale(1.05)",
                  transition: "ease-in 0.3s",
                }}
                onMouseEnter={() => {
                  setIsHovered3(true);
                }}
                onMouseLeave={() => setIsHovered3(false)}
                mt={8}
              >
                <Image
                  src={logoInverted}
                  alt="Card Image"
                  boxSize="210px"
                ></Image>
                <div className={`slide-fade1 ${isHovered3 ? "visible" : ""}`}>
                  <SlideFade in={isHovered3}>
                    <Box
                      p="75px"
                      w="280px"
                      color="black"
                      mt="4"
                      bg="teal.100"
                      rounded="md"
                      shadow="md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="2em"
                        viewBox="0 0 640 512"
                      >
                        <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                      </svg>
                    </Box>
                  </SlideFade>
                </div>
                <Box p={5}>
                  <Stack align="center">
                    <Badge
                      variant="subtle"
                      color="teal.100"
                      rounded="full"
                      px={2}
                      fontSize="0.8em"
                    >
                      Vision
                    </Badge>
                  </Stack>
                  <Stack align="center">
                    <br></br>
                    <Text fontWeight="light">
                      To grow as a strong coding community and uphold the
                      integrity of NIT Durgapur as a technical institution.
                    </Text>
                  </Stack>
                  <Flex>
                    <Spacer />
                    <Button variant="solid" color="teal.200" size="sm">
                      Learn More
                    </Button>
                  </Flex>
                </Box>
              </Card>
              <Card
                className="valueCard"
                w="280px"
                height="400px"
                rounded="20px"
                overflow="hidden"
                bg="teal.900"
                cursor="pointer"
                _hover={{
                  border: "1px solid white",
                  transform: "scale(1.05)",
                  transition: "ease-in 0.3s",
                }}
                onMouseEnter={() => {
                  setIsHovered2(true);
                }}
                onMouseLeave={() => setIsHovered2(false)}
                mt={8}
              >
                <Image
                  src={logoInverted}
                  alt="Card Image"
                  boxSize="210px"
                ></Image>
                <div className={`slide-fade1 ${isHovered2 ? "visible" : ""}`}>
                  <SlideFade in={isHovered2}>
                    <Box
                      p="75px"
                      w="280px"
                      color="black"
                      mt="4"
                      bg="teal.100"
                      rounded="md"
                      shadow="md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="2em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                      </svg>
                    </Box>
                  </SlideFade>
                </div>
                <Box p={5}>
                  <Stack align="center">
                    <Badge
                      variant="subtle"
                      color="teal.100"
                      rounded="full"
                      px={2}
                      fontSize="0.8em"
                    >
                      Value
                    </Badge>
                  </Stack>
                  <Stack align="center">
                    <br></br>
                    <Text fontWeight="light">
                      We believe that helping each other is the only way. We
                      take care and always look to get the best out of everyone.
                    </Text>
                  </Stack>
                  <Flex>
                    <Spacer />
                    <Button variant="solid" color="teal.200" size="sm">
                      Learn More
                    </Button>
                  </Flex>
                </Box>
              </Card>
            </HStack>
          </div>
        </div>
      </div>

      <div className="content3">
        <h2>Who are we ?</h2>
        <div className="whoAreWeCard">
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nisl. Nullam condimenlorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
            ultricieslorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam
            nisl, eu tincidunt nisl nisl lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
            nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum
            dolor sit amet, consectetur adipiscing elit. Nullam condimentum,
            nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl
            nisl euismod nilorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nullam condimentum, nisl ut ultricies lacinia, nisl nisl
            aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor sit
            amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
            euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam
            nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nieuismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod ni
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nitum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nisl.
          </p>
        </div>
      </div>

      <div className="content4">
        <h2
          style={{
            color: "white",
            alignContent: "center",
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "500",
          }}
        >
          So far we have witnessed...
        </h2>
        <hr style={{ flex: 1, color: "80CBC4" }}></hr>
        <HStack spacing="20px">
          <Card w="200px" height="200px" overflow="hidden" border="none" mt={8}>
            <div className={"slide-fade1 visible"}>
              <Box py="60px" w="200px" mt="5" bg="#001f20" shadow="md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="3em"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="#ffffff"
                    d="M160 64c0-35.3 28.7-64 64-64H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H384V320c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h64V64L224 64v49.1C205.2 102.2 183.3 96 160 96V64zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352h53.3C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"
                  />
                </svg>
                <br></br>
                <Text fontWeight="light">550+</Text>
                <Text>Hours of Teaching</Text>
              </Box>
            </div>
          </Card>
          <Card w="200px" height="200px" overflow="hidden" border="none" mt={8}>
            <div className={"slide-fade1 visible"}>
              <Box py="60px" w="200px" mt="5" bg="#001f20" shadow="md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="3em"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#ffffff"
                    d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"
                  />
                </svg>
                <br></br>
                <Text fontWeight="light">9+</Text>
                <Text>Years of Experience</Text>
              </Box>
            </div>
          </Card>
          <Card w="200px" height="200px" overflow="hidden" border="none" mt={8}>
            <div className="slide-fade1 visible">
              <Box py="60px" w="200px" mt="5" bg="#001f20" shadow="md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="3em"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="#ffffff"
                    d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
                  />
                </svg>
                <br></br>
                <Text fontWeight="light">70+</Text>
                <Text>On/Offline Contests</Text>
              </Box>
            </div>
          </Card>
          <Card w="200px" height="200px" overflow="hidden" border="none" mt={8}>
            <div className="slide-fade1 visible">
              <Box py="60px" w="200px" mt="5" bg="#001f20" shadow="md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="3em"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="#ffffff"
                    d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                  />
                </svg>
                <br></br>
                <Text fontWeight="light">2000+</Text>
                <Text>Users</Text>
              </Box>
            </div>
          </Card>
        </HStack>
      </div>

      <div className="content5 mt-20">
        <h2
          style={{
            color: "white",
            alignContent: "center",
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "500",
          }}
        >
          Our Past Sponsors
        </h2>
        <hr style={{ flex: 1, color: "80CBC4" }}></hr>
        <div className="row mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center mx-auto">
            <a
              href="https://www.jetbrains.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={jetbrain}
                alt="JetBrain"
              ></Image>
            </a>
            <a
              href="https://www.hackerrank.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={hackerrank}
                alt="HackerRank"
              ></Image>
            </a>
            <a href="https://cloudsploit.com/" target="_blank" rel="noreferrer">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={cloudsploit}
                alt="CloudSploit"
              ></Image>
            </a>
            <a
              href="https://www.codechef.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={codechef}
                alt="CodeChef"
              ></Image>
            </a>
            <a href="https://workat.tech/" target="_blank" rel="noreferrer">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={workatTech}
                alt="WorkAt Tech"
              ></Image>
            </a>
            <a
              href="https://www.facebook.com/hiredive/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={hiredive}
                alt="HireDive"
              ></Image>
            </a>
            <a
              href="https://www.facebook.com/nutrichef.ie/?ref=search&__tn__=%2Cd%2CP-R&eid=ARDTDJ4hXrAW-2WMWQ8pJF8H6bGOJwbca2ee0kDmWC8cbSwVJ7RA1F-upYN4dNK66eWp-9HvxWlsJcKY"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={nutrichef}
                alt="Nutrichef"
              ></Image>
            </a>
            <a href="https://algozenith.com/" target="_blank" rel="noreferrer">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={algoZenith}
                alt="Algo Zenith"
              ></Image>
            </a>
            <a
              href="https://www.digitalocean.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={digitalOcean}
                alt="Digital Ocean"
              ></Image>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
