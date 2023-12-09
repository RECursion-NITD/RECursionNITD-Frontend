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
import rocket from "../assets/images/rocket.png";
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
  Textarea,
  // Heading,
  // CardHeader,
  // CardBody,
  // CardFooter,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getHome } from "../api/home";
import "../App.css";
import CarouselSlide from "./CarouselSlide";

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
    createCardAnimation(valueCard, "top 20%", "top 10%");
    createCardAnimation(visionCard, "top 10%", "top 0%");

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
      <div className="container">
        <div className="content">
          <h4>Programming Community of NIT Durgapur</h4>
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
      </div>
      <div className="content2 mt-0 mb-20">
        <h2
          style={{
            color: "white",
            alignContent: "center",
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "500",
          }}
        >
          Who are we ?
        </h2>
        <hr style={{ flex: 1, color: "80CBC4" }}></hr>
        <div ref={containerRef} className="WhoAreWeCard">
          <HStack
            spacing="30px"
            divider={
              <StackDivider
                className="dividerline"
                borderColor="teal.200"
                height="340px"
                alignSelf="center"
              />
            }
          >
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
          </HStack>
        </div>
      </div>
      <div className="content3">
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
        <hr style={{ flex: 1, color: "80CBC4" }} className="mt-2"></hr>
        <div className="wrapper">
          <div className="titlecontainer">
            <CarouselSlide />
          </div>
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
      <div className="content6 mt-20">
        <footer
          className="section footer-classic context-dark "
          style={{
            background:
              "linear-gradient(135deg, #3e4446 22%, rgba(255,0,0,0) 10%), linear-gradient(135deg, #2d3436 90%, #3e4446 1%), linear-gradient(45deg, #353b48 95%, rgba(0,0,255,0) 30%)",
            width: "100%",
          }}
        >
          <a
            id="goTop"
            style={{
              textAlign: "center",
            }}
          >
            <div
              className="circle"
              onClick={() => {
                window.scrollTo(0, -1000000);
              }}
            >
              <Image
                src={rocket}
                className="mt-1"
                alt="go Top"
                onClick={() => {
                  window.scrollTo(0, -1000000);
                }}
              >
              </Image>
            </div>
          </a>
          <div className="mb-30">
            <div className="col-md-4 col-xl-5">
              <div className="pr-xl-4">
                <strong>Contribute to this community</strong>
                <br />
                <div className="flex">
                  <a
                    href="https://www.facebook.com/recursion.nit/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                      className="mx-0"
                    >
                      <path
                        fill="#ffffff"
                        d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/RECursion-NITD"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="15.5"
                      viewBox="0 0 496 512"
                      className="mx-0"
                    >
                      <path
                        fill="#ffffff"
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                      />
                    </svg>
                  </a>
                </div>
                <br />
                <strong className="flex">
                  Developed & designed with &nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#f0474f"
                      d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                    />
                  </svg>
                  &nbsp; by &nbsp;
                  <a href="/team" style={{ textDecoration: "none" }}>
                    Web Team '24-25
                  </a>
                </strong>
                <p className="rights">
                  <span>© </span>
                  <span className="copyright-year">
                    {new Date().getFullYear()}
                  </span>
                  <span> RECursion</span>
                  <span>. </span>
                  <span>All Rights Reserved.</span>
                </p>
              </div>
            </div>
            <br></br>
            <hr style={{ flex: 1, color: "ffffff", fontWeight: "bold" }}></hr>
            <br></br>
            <div className="col-md-4">
              <h2>
                <strong>Contacts</strong>
              </h2>
              <dl className="contact-list">
                <div>Address:</div>
                <div className="flex mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="18"
                    viewBox="0 0 576 512"
                    className="mr-0" 
                  >
                    <path
                      fill="#ffffff"
                      d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                    />
                  </svg>
                  <a>NIT Durgapur, Durgapur, W.B.</a>
                </div>
              </dl>
              <dl className="contact-list">
                <dt>Email:</dt>
                <dd className="flex mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                    className="mr-0"
                  >
                    <path
                      fill="#ffffff"
                      d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
                    />
                  </svg>
                  <a href="mailto:recursion.nit@gmail.com">
                    recursion.nit@gmail.com
                  </a>
                </dd>
              </dl>
              <dl className="contact-list">
                <dt>Phones:</dt>
                <dd className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"
                    />
                  </svg>
                  <a href="tel:+919475738842">
                    {" "}
                    Akshay A Baiju: +919475738842{" "}
                  </a>
                </dd>
              </dl>
            </div>
            <br></br>
            <hr style={{ flex: 1, color: "ffffff", fontWeight: "bold" }}></hr>
            <br></br>
            <div className="col-md-4 col-xl-3">
              <h2 className="ml-0">
                <strong>Links:</strong>
              </h2>
              <ul className="nav-list ml-1">
                {/* <li>
                  <a href="/list_questions" style={{ textDecoration: "none" }}>
                    AskREC
                  </a>
                </li>
                <li>
                  <a href="/list_blogs" style={{ textDecoration: "none" }}>
                    Blog
                  </a>
                </li> */}
                <li>
                  <a href="/events" style={{ textDecoration: "none" }}>
                    Events
                  </a>
                </li>
                <li>
                  <a href="/get_started" style={{ textDecoration: "none" }}>
                    Get Started
                  </a>
                </li>
                {/* <li>
                  <a href="/faculty" style={{ textDecoration: "none" }}>
                    Faculty Advisors
                  </a>
                </li> */}
                <li>
                  <a href="/team" style={{ textDecoration: "none" }}>
                    Team
                  </a>
                </li>
                <li>
                  <a href="/experience" style={{ textDecoration: "none" }}>
                    Interview Experiences
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
