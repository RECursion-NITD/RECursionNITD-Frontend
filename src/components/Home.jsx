import logoInverted from "../assets/images/logoInverted.png";
import { useEffect, useState } from "react";
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
  // SimpleGrid,
  Card,
  HStack,
  // Heading,
  // CardHeader,
  // CardBody,
  // CardFooter,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import { getHome } from "../api/home";
import "../App.css";

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

  return loading ? (
    <Loader />
  ) : (
    <div className="App">
      <div className="heading">
        <h1>
          <strong>REC</strong>ursion 2023
        </h1>
      </div>
      <div className="content">
        <h4>Programming Community of NIT Durgapur</h4>

        <p>
          We are programming community of NIT Durgapur, with focus on improving
          coding culture institute wide by conducting regular lectures from
          beginner to advance topics of programming. Our goal is to increase
          student&apos;s participation in inter-collegiate contest like ACM-ICPC
          and help them get better.
        </p>
        <div>
          <p>{homeData?.years_of_experience}+years of experience</p>
          <p>{homeData?.hours_teaching} + hours of teaching</p>
        </div>
      </div>
      <div className="card">
        <HStack spacing="24px" mt={10}>
          <Card
            w="280px"
            height="420px"
            rounded="20px"
            overflow="hidden"
            bg="gray.700"
            mt={10}
          >
            <Image src={logoInverted} alt="Card Image" boxSize="210px"></Image>
            <Box p={5}>
              <Stack align="center">
                <Badge variant="solid" color="teal.100" rounded="full" px={2}>
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
            w="280px"
            height="420px"
            rounded="20px"
            overflow="hidden"
            bg="gray.700"
            mt={10}
          >
            <Image src={logoInverted} alt="Card Image" boxSize="210px"></Image>
            <Box p={5}>
              <Stack align="center">
                <Badge variant="solid" color="teal.100" rounded="full" px={2}>
                  RECursion
                </Badge>
              </Stack>
              <Stack align="center">
                <Text as="h2" fontWeight="normal" my={2}>
                  Value
                </Text>
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
            height="420px"
            rounded="20px"
            overflow="hidden"
            bg="gray.700"
            mt={10}
          >
            <Image src={logoInverted} alt="Card Image" boxSize="210px"></Image>
            <Box p={5}>
              <Stack align="center">
                <Badge variant="solid" color="teal.100" rounded="full" px={2}>
                  RECursion
                </Badge>
              </Stack>
              <Stack align="center">
                <Text as="h2" fontWeight="normal" my={2}>
                  Vision
                </Text>
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
      <div className="about"></div>
      <div className="content2">
        <h2 style={{ color: "white", margin: "2em" }}>Who are we ?</h2>

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
      <div className="content">
        <h2>Who are we ?</h2>

        <p>
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
