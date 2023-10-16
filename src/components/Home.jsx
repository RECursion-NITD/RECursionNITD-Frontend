import logoInverted from "../assets/images/logoInverted.png";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Button,
  Flex,
  Spacer,
  useToast,
  Card,
  HStack,
  StackDivider,
  SlideFade,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  // ListIcon,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import DashedLine from "./dashedline";
import RevDashedLine from "./dashedlinerev";
import Carousel from "./carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getHome } from "../api/home";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const { user } = useAuth();
  const { loading, setLoading } = useLoading();
  const [homeData, setHomeData] = useState(null);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isHovered7, setIsHovered7] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!user) return;
    toast({
      title: `Welcome ${user?.username}.`,
      position: "top-right",
      status: "success",
      duration: 2500,
      isClosable: false,
    });
  }, [user]);

  useEffect(() => {
    setLoading(true);
    getHome()
      .then((data) => {
        setHomeData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    gsap.set(".container", { autoAlpha: 1 });

    const animate = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".container",
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
        color: "#b2f5ea",
        duration: 0.1,
      });

    () => {
      animate.kill();
    };
  }, [loading]);

  return loading ? (
    <Loader />
  ) : (
    <div className="App">
      <div className="container headContainer">
        <div className="head">
          <h1
            style={{
              fontWeight: "500",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <strong>REC</strong>ursion
          </h1>
        </div>
      </div>
      <div className="container container01"></div>
      {/* <div className="heading">
        <h1>
          <strong>REC</strong>ursion 2023
        </h1>
      </div> */}
      <div className="container container02">
        <div className="content">
          <h4
          // style={{
          //   color: "white",
          //   fontStyle: "normal",
          //   fontWeight: "400",
          //   fontSize: "30px",
          // }}
          >
            Programming Community of NIT Durgapur
          </h4>
          <br></br>
          <p>
            We are programming community of NIT Durgapur, with focus on
            improving coding culture institute wide by conducting regular
            lectures from beginner to advance topics of programming. Our goal is
            to increase student&apos;s participation in inter-collegiate contest
            like ACM-ICPC and help them get better.
          </p>
          <div>
            <p>{homeData?.years_of_experience}+years of experience</p>
            <p>{homeData?.hours_teaching} + hours of teaching</p>
          </div>
        </div>
      </div>
      <div className="card">
        <h2
          style={{
            color: "white",
            margin: "2em",
            alignContent: "center",
            textAlign: "center",
            fontSize: "25px",
          }}
        >
          Who are we ?
        </h2>
        <HStack
          spacing="24px"
          divider={
            <StackDivider
              borderColor="teal.200"
              height="380px"
              alignSelf="center"
            />
          }
        >
          <Card
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
            <Image src={logoInverted} alt="Card Image" boxSize="210px"></Image>
            <div className={`slide-fade1 ${isHovered1 ? "visible" : ""}`}>
              <SlideFade in={isHovered1}>
                <Box
                  p="80px"
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
            <Image src={logoInverted} alt="Card Image" boxSize="210px"></Image>
            <div className={`slide-fade1 ${isHovered2 ? "visible" : ""}`}>
              <SlideFade in={isHovered2}>
                <Box
                  p="80px"
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
                  We believe that helping each other is the only way. We take
                  care and always look to get the best out of everyone.
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
            <Image src={logoInverted} alt="Card Image" boxSize="210px"></Image>
            <div className={`slide-fade1 ${isHovered3 ? "visible" : ""}`}>
              <SlideFade in={isHovered3}>
                <Box
                  p="80px"
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
                  To grow as a strong coding community and uphold the integrity
                  of NIT Durgapur as a technical institution.
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
      <div className="content1">
        <h2 style={{ color: "white", margin: "2em", fontSize: "25px" }}>
          Our Activities
        </h2>
        <div className="instagram-post">
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <img className="line" alt="Line" src="line-1.svg" />
              <div
                className="ellipse-0"
                style={{
                  color: "black",
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                }}
              >
                A
              </div>
              <div className="line-0">
                <DashedLine />
              </div>
              <Accordion
                allowToggle
                style={{
                  height: "0px",
                  width: "300px",
                  position: "relative",
                  left: "155px",
                  top: "-100px",
                }}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.200", color: "black" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Regular coding classes
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Regular coding classes are conducted for the freshers of NIT
                    Durgapur until their 3rd semester.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <div
                className="ellipse-1"
                style={{
                  color: "black",
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                }}
              >
                C
              </div>
              <div
                className="line-1"
                style={{ position: "relative", left: "-155px" }}
              >
                <RevDashedLine />
              </div>
              <Accordion
                allowToggle
                style={{
                  height: "0px",
                  width: "250px",
                  position: "relative",
                  left: "-350px",
                  top: "-100px",
                }}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.200", color: "black" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        RECode
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Monthly competitive programming contest for the students of
                    NIT Durgapur.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <div
                className="ellipse-2"
                style={{
                  color: "black",
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                }}
              >
                T
              </div>
              <div className="line-0">
                <DashedLine />
              </div>
              <Accordion
                allowToggle
                style={{
                  height: "0px",
                  width: "200px",
                  position: "relative",
                  left: "155px",
                  top: "-100px",
                }}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.200", color: "black" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Alohomora
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    ICPC styled team coding contest open for all.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <div
                className="ellipse-3"
                style={{
                  color: "black",
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                }}
              >
                I
              </div>
              <div
                className="line-1"
                style={{ position: "relative", left: "-155px" }}
              >
                <RevDashedLine />
              </div>
              <Accordion
                allowToggle
                style={{
                  height: "0px",
                  width: "300px",
                  position: "relative",
                  left: "-400px",
                  top: "-100px",
                }}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.200", color: "black" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        ICPC participation
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Improving student&apos;s participation in inter-collegiate
                    coding competitions like ACM-ICPC.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <div
                className="ellipse-4"
                style={{
                  color: "black",
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                }}
              >
                V
              </div>
              <div className="line-0">
                <DashedLine />
              </div>
              <Accordion
                allowToggle
                style={{
                  height: "0px",
                  width: "300px",
                  position: "relative",
                  left: "155px",
                  top: "-100px",
                }}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.200", color: "black" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        REChase
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Annual treasure hunt competition as a part of Aarohan- the
                    Tech Fest of NIT Durgapur.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <div
                className="ellipse-5"
                style={{
                  color: "black",
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                }}
              >
                I
              </div>
              <div
                className="line-1"
                style={{ position: "relative", left: "-155px" }}
              >
                <RevDashedLine />
              </div>
              <Accordion
                allowToggle
                style={{
                  height: "0px",
                  width: "300px",
                  position: "relative",
                  left: "-400px",
                  top: "-100px",
                }}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.200", color: "black" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Organizing AMA Sessions
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <div
                className="ellipse-6"
                style={{
                  color: "black",
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                }}
              >
                T
              </div>
              <div className="line-0">
                <DashedLine />
              </div>
              <Accordion
                allowToggle
                style={{
                  height: "0px",
                  width: "400px",
                  position: "relative",
                  left: "155px",
                  top: "-100px",
                }}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.200", color: "black" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Tech Townhall
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <div
                className="ellipse-7"
                style={{
                  color: "black",
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                }}
              >
                Y
              </div>
              <div
                className="line-1"
                style={{ position: "relative", left: "-155px" }}
              >
                <RevDashedLine />
              </div>
              <Accordion
                allowToggle
                style={{
                  height: "0px",
                  width: "250px",
                  position: "relative",
                  left: "-350px",
                  top: "-100px",
                }}
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.200", color: "black" }}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Mind Sweepers
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    fun and frolic activity
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <Box p={0} width={300} height={300}>
                <Carousel />
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <h2
          style={{
            color: "white",
            margin: "2em",
            alignContent: "center",
            textAlign: "center",
            fontSize: "25px",
          }}
        >
          So far we have witnessed:
        </h2>
        <HStack
          spacing="20px"
          divider={
            <StackDivider
              borderColor="teal.200"
              height="200px"
              alignSelf="center"
            />
          }
        >
          <Card
            w="200px"
            height="200px"
            rounded="20px"
            overflow="hidden"
            bg="teal.900"
            cursor="pointer"
            border="none"
            _hover={{
              border: "1px solid white",
              transform: "scale(1.05)",
              transition: "ease-in 0.3s",
            }}
            onMouseEnter={() => {
              setIsHovered4(true);
            }}
            onMouseLeave={() => setIsHovered4(false)}
            mt={8}
          >
            <Image src={logoInverted} alt="Card Image" width="150px"></Image>
            <div className={`slide-fade1 ${isHovered4 ? "visible" : ""}`}>
              <SlideFade in={isHovered4}>
                <Box
                  p="60px"
                  w="200px"
                  color="black"
                  mt="5"
                  bg="teal.100"
                  rounded="md"
                  shadow="md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 640 512"
                  >
                    <path d="M160 64c0-35.3 28.7-64 64-64H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H384V320c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h64V64L224 64v49.1C205.2 102.2 183.3 96 160 96V64zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352h53.3C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z" />
                  </svg>
                </Box>
              </SlideFade>
            </div>
            <Box p={0}>
              <Stack align="center">
                <Text fontWeight="light">550+ Hours of Teaching</Text>
              </Stack>
            </Box>
          </Card>
          <Card
            w="200px"
            height="200px"
            rounded="20px"
            overflow="hidden"
            bg="teal.900"
            cursor="pointer"
            border="none"
            _hover={{
              border: "1px solid white",
              transform: "scale(1.05)",
              transition: "ease-in 0.3s",
            }}
            onMouseEnter={() => {
              setIsHovered5(true);
            }}
            onMouseLeave={() => setIsHovered5(false)}
            mt={8}
          >
            <Image src={logoInverted} alt="Card Image" width="150px"></Image>
            <div className={`slide-fade1 ${isHovered5 ? "visible" : ""}`}>
              <SlideFade in={isHovered5}>
                <Box
                  p="60px"
                  w="200px"
                  color="black"
                  mt="5"
                  bg="teal.100"
                  rounded="md"
                  shadow="md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 384 512"
                  >
                    <path d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z" />
                  </svg>
                </Box>
              </SlideFade>
            </div>
            <Box p={0}>
              <Stack align="center">
                <Text fontWeight="light">9+ years of experience</Text>
              </Stack>
            </Box>
          </Card>
          <Card
            w="200px"
            height="200px"
            rounded="20px"
            overflow="hidden"
            bg="teal.900"
            cursor="pointer"
            border="none"
            _hover={{
              border: "1px solid white",
              transform: "scale(1.05)",
              transition: "ease-in 0.3s",
            }}
            onMouseEnter={() => {
              setIsHovered6(true);
            }}
            onMouseLeave={() => setIsHovered6(false)}
            mt={8}
          >
            <Image src={logoInverted} alt="Card Image" width="150px"></Image>
            <div className={`slide-fade1 ${isHovered6 ? "visible" : ""}`}>
              <SlideFade in={isHovered6}>
                <Box
                  p="60px"
                  w="200px"
                  color="black"
                  mt="5"
                  bg="teal.100"
                  rounded="md"
                  shadow="md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 640 512"
                  >
                    <path d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
                  </svg>
                </Box>
              </SlideFade>
            </div>
            <Box p={0}>
              <Stack align="center">
                <Text fontWeight="light">70+ On/Offline Contests</Text>
              </Stack>
            </Box>
          </Card>
          <Card
            w="200px"
            height="200px"
            rounded="20px"
            overflow="hidden"
            bg="teal.900"
            cursor="pointer"
            border="none"
            _hover={{
              border: "1px solid white",
              transform: "scale(1.05)",
              transition: "ease-in 0.3s",
            }}
            onMouseEnter={() => {
              setIsHovered7(true);
            }}
            onMouseLeave={() => setIsHovered7(false)}
            mt={8}
          >
            <Image src={logoInverted} alt="Card Image" width="150px"></Image>
            <div className={`slide-fade1 ${isHovered7 ? "visible" : ""}`}>
              <SlideFade in={isHovered7}>
                <Box
                  p="60px"
                  w="200px"
                  color="black"
                  mt="5"
                  bg="teal.100"
                  rounded="md"
                  shadow="md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.5em"
                    viewBox="0 0 640 512"
                  >
                    <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                  </svg>
                </Box>
              </SlideFade>
            </div>
            <Box p={0}>
              <Stack align="center">
                <Text fontWeight="light">2000+ Users</Text>
              </Stack>
            </Box>
          </Card>
        </HStack>
      </div>
      <div className="sponsors">
        <h2
          style={{
            color: "white",
            margin: "2em",
            alignContent: "center",
            textAlign: "center",
            fontSize: "25px",
          }}
        >
          Our Past Sponsors
        </h2>
        <List spacing={3}>
          <ListItem>
            {/* <ListIcon as={MdCheckCircle} color="green.500" /> */}
            Jet Brains
          </ListItem>
          <ListItem>
            {/* <ListIcon as={MdCheckCircle} color="green.500" /> */}
            Codechef
          </ListItem>
          <ListItem>
            {/* <ListIcon as={MdCheckCircle} color="green.500" /> */}
            Hackerrank
          </ListItem>
        </List>
        <br></br>
      </div>
      <div className="content2">
        <p style={{ color: "white" }}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nisl. Nullam condimenlorem ipsum dolor sit
          amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricieslorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
          nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
          euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
          nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nilorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
          nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
          euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
          nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nilorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
          nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
          euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
          nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nieuismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod ni
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod nitum,
          nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl
          nisl euismod nisl.
        </p>
      </div>
    </div>
  );
}
export default Home;
