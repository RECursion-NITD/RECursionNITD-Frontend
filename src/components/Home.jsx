/* eslint-disable */
import logoInverted from "../assets/images/logoInverted.png";
import algo_zenith from "../assets/images/algo_zenith.png";
import cloudsploit from "../assets/images/cloudsploit.png";
import codechef from "../assets/images/codechef.png";
import digital_ocean from "../assets/images/digital_ocean.png";
import hackerrank from "../assets/images/hackerrank.png";
import hiredive from "../assets/images/hiredive.jpg";
import jetbrain from "../assets/images/jetbrain.svg.png";
import nutrichef from "../assets/images/nutrichef.png";
import workat_tech from "../assets/images/workat-tech.png";

import { useEffect, useLayoutEffect, useState, useRef } from "react";
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
  SlideFade,
  StackDivider,
  // SimpleGrid,
  Card,
  HStack,
  VStack,
  Textarea,
  // Heading,
  // CardHeader,
  // CardBody,
  // CardFooter,
  useBreakpointValue,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
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
  const toast = useToast();
  const myacti = [
    {
      key: 1,
      title: "Coding Classes",
      description: "Regular coding classes and geeky sessions",
      image:
        "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      c: "c1",
      t: "t1",
      co: "co1",
    },
    {
      key: 2,
      title: "RECode",
      // subtitle: "France",
      description: "Monthly online coding contest",
      image:
        "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      c: "c2",
      t: "t2",
      co: "co2",
    },
    {
      key: 3,
      title: "Alohomora",
      // subtitle: "Australia",
      description: " Onsite coding contest",
      image:
        "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      c: "c3",
      t: "t3",
      co: "co3",
    },
    {
      key: 4,
      title: "ICPC",
      // subtitle: "Australia",
      description: "Improving student's participation in ICPC",
      image:
        "https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      c: "c4",
      t: "t4",
      co: "co4",
    },
    {
      key: 5,
      title: "REChase",
      // subtitle: "wechase",
      description: "Annual treasure hunt competition",
      image:
        "https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      c: "c5",
      t: "t5",
      co: "co5",
    },
    {
      key: 6,
      title: "AMA",
      // subtitle: "Australia",
      description: "Organizing AMA Sessions with successful alumnus",
      image:
        "https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      c: "c6",
      t: "t6",
      co: "co6",
    },
  ];

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

  const containerRef = useRef(null);
  const sliderRef = useRef(null);

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
        color: "#FFD700",
        duration: 0.1,
      });

    () => {
      animate.kill();
    };

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
          },
        }
      );
    };


    const createCardAnimation2 = (card, start, end, i) => {
      gsap.fromTo(
        card,
        {
          autoAlpha: 0,
          scale: 0.5,
          xPercent: i % 2 === 0 ? -100 : 100,
        },
        {
          xPercent: 10,
          autoAlpha: 1,
          scale: 1,
          duration: 3,
          scrollTrigger: {
            pin: ".content2",
            trigger: card,
            start,
            end,
            scrub: true,
          },
        }
      );
    };

    const missionCard = document.querySelector(".missionCard");
    const visionCard = document.querySelector(".visionCard");
    const valueCard = document.querySelector(".valueCard");

    const screenWidth = window.innerWidth;
    if (screenWidth > 900) {
      createCardAnimation(missionCard, "top 30%", "top 20%");
      createCardAnimation(valueCard, "top 20%", "top 10%");
      createCardAnimation(visionCard, "top 10%", "top 0%");
    }

    () => {
      animate.kill();
    };

    const slider = sliderRef.current;

    const createItemAnimation = (item, start, end, i) => {
      gsap.fromTo(
        item,
        {
          autoAlpha: 0,
          scale: 0.5,
          xPercent: i % 2 === 0 ? -100 : 100,
          height: 400,
          width: 550,
        },
        {
          xPercent: screenWidth > 900 ? 30 : 50,
          autoAlpha: 1,
          scale: 1,
          duration: 3,
          scrollTrigger: {
            pin: ".content4",
            trigger: item,
            start: start,
            end: end,
            scrub: true,
          },
        }
      );
    };

    const t1 = document.querySelector(".t1");
    const t2 = document.querySelector(".t2");
    const t3 = document.querySelector(".t3");
    const t4 = document.querySelector(".t4");
    const t5 = document.querySelector(".t5");
    const t6 = document.querySelector(".t6");

    createItemAnimation(t1, "top 40%", "top 20%", 1);
    createItemAnimation(t2, "top 20%", "top 0%", 2);
    createItemAnimation(t3, "top 0%", "top -20%", 3);
    createItemAnimation(t4, "top -20%", "top -40%", 4);
    createItemAnimation(t5, "top -40%", "top -60%", 5);
    createItemAnimation(t6, "top -60%", "top -80%", 6);

    () => {
      animate.kill();
    };

  }, [loading]);

  const StackComponent = useBreakpointValue({ base: VStack, md: HStack });
  const screenWidth = window.innerWidth;

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
      <div className="container">
        <div style={{ color: "#FFFFFF" }} className="content">
          <div className="shadow">
            <p>Programming Community of NIT Durgapur</p>
            <h2 style={{
            fontWeight: "600",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            fontSize: ".4em",
          }}>Programming Community of NIT Durgapur</h2>
          </div>
          <hr style={{ flex: 1, color: "teal.200" }} className="mt-2" />
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
      <div style={{
        width: "90vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }} className="whoareweheader">
        <div className="shadow">
          <p>Who are we ?</p>
        <h2
          style={{
            color: "#FFD700",
            alignContent: "center",
            textAlign: "center",
            fontSize: "35px",
            fontWeight: "600",
          }}
        >
          Who are we ?
        </h2>
        </div>
        <br></br>
        <hr style={{ flex: 1, width: "100%", color: "80CBC4", border: "2px solid #80CBC4" }}></hr>
        <br></br>
      </div>
      <div className="content2 mt-0 mb-20">

        <div ref={containerRef} className="WhoAreWeCard">
          <StackComponent
            spacing="30px"
            divider={
              <StackDivider
                className="dividerline"
                borderColor="teal.200"
                height={screenWidth < 900 ? "0px" : "340px"}
                alignSelf="center"
              />
            }
          >
            <div className="card1">
              <Card
                className="missionCard"
                w="280px"
                height="400px"
                rounded="20px"
                overflow="hidden"
                bg="#31363F"
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
                  boxSize="200px"
                ></Image>
                <div className={`slide-fade1 ${isHovered1 ? "visible" : ""}`}>
                  <SlideFade in={isHovered1}>
                    <Box
                      p="75px"
                      w="280px"
                      color="black"
                      mt="4"
                      //bg="teal.100"
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
                      backgroundColor="black"
                    >
                      Mission
                    </Badge>
                  </Stack>
                  <Stack align="center">
                    <br></br>
                    <Text fontWeight="light" color="white">
                      Working towards the improvement of campus&apos;s coding
                      culture by organizing regular coding classes and contests.
                    </Text>
                  </Stack>
                  <Flex>
                    <Spacer />
                    <Button variant="solid" color="teal.200" size="sm" backgroundColor="black">
                      Learn More
                    </Button>
                  </Flex>
                </Box>
              </Card>
            </div>
            <div className="card2">
              <Card
                className="valueCard"
                w="280px"
                height="400px"
                rounded="20px"
                overflow="hidden"
                bg="#31363F"
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
                  boxSize="200px"
                ></Image>
                <div className={`slide-fade1 ${isHovered2 ? "visible" : ""}`}>
                  <SlideFade in={isHovered2}>
                    <Box
                      p="75px"
                      w="280px"
                      color="black"
                      mt="4"
                      //bg="teal.100"
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
                      backgroundColor="black"
                    >
                      Value
                    </Badge>
                  </Stack>
                  <Stack align="center">
                    <br></br>
                    <Text fontWeight="light" color="white">
                      We believe that helping each other is the only way. We take
                      care and always look to get the best out of everyone.
                    </Text>
                  </Stack>
                  <Flex>
                    <Spacer />
                    <Button variant="solid" color="teal.200" size="sm" backgroundColor="black">
                      Learn More
                    </Button>
                  </Flex>
                </Box>
              </Card>
            </div>
            <div className="card3">
              <Card
                className="visionCard"
                w="280px"
                height="400px"
                rounded="20px"
                overflow="hidden"
                bg="#31363F"
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
                  boxSize="200px"
                ></Image>
                <div className={`slide-fade1 ${isHovered3 ? "visible" : ""}`}>
                  <SlideFade in={isHovered3}>
                    <Box
                      p="75px"
                      w="280px"
                      color="black"
                      mt="4"
                      //bg="teal.100"
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
                      backgroundColor="black"
                    >
                      Vision
                    </Badge>
                  </Stack>
                  <Stack align="center">
                    <br></br>
                    <Text fontWeight="light" color="white">
                      To grow as a strong coding community and uphold the
                      integrity of NIT Durgapur as a technical institution.
                    </Text>
                  </Stack>
                  <Flex>
                    <Spacer />
                    <Button variant="solid" color="teal.200" size="sm" backgroundColor="black">
                      Learn More
                    </Button>
                  </Flex>
                </Box>
              </Card>
            </div>
          </StackComponent>
        </div>
      </div>
      {/* <div className="content3"></div> */}
      <div className="content4 mt-0 mb-20">
        <div className="shadow">
          <p>Our Activities</p>
          <h2
          style={{
            color: "white",
            alignContent: "center",
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "500",
          }}
        >
          Our Activities
        </h2>
        </div>
        <hr></hr>
        <div className="wrapper">
          <div className="titlecontainer">
            <div className="main">
              <div className="carousel-container" ref={sliderRef}>
                <ul className="slider">
                  {myacti.map((item) => (
                    <li
                      key={item.key}
                      className={item.t}

                    >
                      <div className={item.c}
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      >
                        <div
                          style={{
                            borderRadius: "10px",
                            backgroundImage: "linear-gradient(to top right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))"
                          }}
                        />
                        <div className={item.co}
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            borderRadius: "10px",
                          }}>
                          <h2 className="title mt-2 mb-1">{item.title}</h2>
                          <hr></hr>
                          <p className="description mb-0">{item.description}</p>
                        </div>
                      </div>
                      <div style={{ color: "white" }} className="detail">
                        <h2>{item.title}</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor sit vitae libero a dolores eaque aliquam, cumque harum facere inventore.</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contentstop"></div>
      <div className="content5">
        <div className="shadow">
          <p>So far we have witnessed...</p>
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
        </div>
        <hr style={{ flex: 1, color: "80CBC4" }}></hr>
        <StackComponent spacing="20px">
          <Card w="200px" height="200px" overflow="hidden" border="none" mt={8}>
            <div className={"slide-fade1 visible"}>
              <Box py="60px" w="200px" mt="5" 
                bg="#31363F" shadow="md">
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
                <Text color={"white"} fontWeight="light">550+</Text>
                <Text color={"white"}  >Hours of Teaching</Text>
              </Box>
            </div>
          </Card>
          <Card w="200px" height="200px" overflow="hidden" border="none" mt={8}>
            <div className={"slide-fade1 visible"}>
              <Box py="60px" w="200px" mt="5" 
                bg="#31363F" shadow="md">
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
                <Text color={"white"} fontWeight="light">9+</Text>
                <Text color={"white"} >Years of Experience</Text>
              </Box>
            </div>
          </Card>
          <Card w="200px" height="200px" overflow="hidden" border="none" mt={8}>
            <div className="slide-fade1 visible">
              <Box py="60px" w="200px" mt="5" 
                bg="#31363F" shadow="md">
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
                <Text color={"white"} fontWeight="light">70+</Text>
                <Text color={"white"} >On/Offline Contests</Text>
              </Box>
            </div>
          </Card>
          <Card w="200px" height="200px" overflow="hidden" border="none" mt={8}>
            <div className="slide-fade1 visible">
              <Box py="60px" w="200px" mt="5" 
                bg="#31363F" shadow="md">
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
                <Text color={"white"} fontWeight="light">2000+</Text>
                <Text color={"white"} >Users</Text>
              </Box>
            </div>
          </Card>
        </StackComponent>
      </div>
      <div className="content6 mt-20">
        <div className="shadow">
          <p>Our Past Sponsors</p>
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
        </div>
        <hr style={{ flex: 1, color: "80CBC4" }}></hr>
        <div className="row mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 place-content-center mx-auto">
            <a href="https://www.jetbrains.com/" target="_blank">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={jetbrain}
                alt="JetBrain"
              ></Image>
            </a>
            <a href="https://www.hackerrank.com/" target="_blank">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={hackerrank}
                alt="HackerRank"
              ></Image>
            </a>
            <a href="https://cloudsploit.com/" target="_blank">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={cloudsploit}
                alt="CloudSploit"
              ></Image>
            </a>
            <a href="https://www.codechef.com/" target="_blank">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={codechef}
                alt="CodeChef"
              ></Image>
            </a>
            <a href="https://workat.tech/" target="_blank">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={workat_tech}
                alt="WorkAt Tech"
              ></Image>
            </a>
            <a href="https://www.facebook.com/hiredive/" target="_blank">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={hiredive}
                alt="HireDive"
              ></Image>
            </a>
            <a
              href="https://www.facebook.com/nutrichef.ie/?ref=search&__tn__=%2Cd%2CP-R&eid=ARDTDJ4hXrAW-2WMWQ8pJF8H6bGOJwbca2ee0kDmWC8cbSwVJ7RA1F-upYN4dNK66eWp-9HvxWlsJcKY"
              target="_blank"
            >
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={nutrichef}
                alt="Nutrichef"
              ></Image>
            </a>
            <a href="https://algozenith.com/" target="_blank">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={algo_zenith}
                alt="Algo Zenith"
              ></Image>
            </a>
            <a href="https://www.digitalocean.com/" target="_blank">
              <Image
                className="sponsorImg ml-4 max-w-120 max-h-120"
                src={digital_ocean}
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