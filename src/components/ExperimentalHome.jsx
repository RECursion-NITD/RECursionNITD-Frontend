import homepageCodeSnippet from "../assets/images/homepageCodeSnippet.png";
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

      <div className="content2">
        <Text style={{ color: "white", margin: "2em", fontWeight: "bold" }}>
          Who are we ?
        </Text>
        <div ref={containerRef} className="WhoAreWeCard">
          <div className="card">
            <HStack spacing="24px" mt={10}>
              <Card
                className="missionCard"
                w="280px"
                height="420px"
                rounded="20px"
                overflow="hidden"
                bg="gray.700"
                mt={10}
              >
                <Image
                  src={logoInverted}
                  alt="Card Image"
                  boxSize="210px"
                ></Image>
                <Box p={5}>
                  <Stack align="center">
                    <Badge
                      variant="solid"
                      color="teal.100"
                      rounded="full"
                      px={2}
                    >
                      RECursion
                    </Badge>
                  </Stack>
                  <Stack align="center">
                    <Text as="h2" fontWeight="normal" my={2}>
                      Mission
                    </Text>
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
                height="420px"
                rounded="20px"
                overflow="hidden"
                bg="gray.700"
                mt={10}
              >
                <Image
                  src={logoInverted}
                  alt="Card Image"
                  boxSize="210px"
                ></Image>
                <Box p={5}>
                  <Stack align="center">
                    <Badge
                      variant="solid"
                      color="teal.100"
                      rounded="full"
                      px={2}
                    >
                      RECursion
                    </Badge>
                  </Stack>
                  <Stack align="center">
                    <Text as="h2" fontWeight="normal" my={2}>
                      Value
                    </Text>
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
              <Card
                className="valueCard"
                w="280px"
                height="420px"
                rounded="20px"
                overflow="hidden"
                bg="gray.700"
                mt={10}
              >
                <Image
                  src={logoInverted}
                  alt="Card Image"
                  boxSize="210px"
                ></Image>
                <Box p={5}>
                  <Stack align="center">
                    <Badge
                      variant="solid"
                      color="teal.100"
                      rounded="full"
                      px={2}
                    >
                      RECursion
                    </Badge>
                  </Stack>
                  <Stack align="center">
                    <Text as="h2" fontWeight="normal" my={2}>
                      Vision
                    </Text>
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
      </div>

      <div className="content">
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
    </div>
  );
}
export default Home;
