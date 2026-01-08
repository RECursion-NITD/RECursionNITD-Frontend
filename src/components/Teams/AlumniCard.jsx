import {
  Heading,
  Image,
  Link,
  Text,
  Card,
  CardBody,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";
const AlumniCard = ({ alumni }) => (
  <Card
    // direction={{ base: "column", sm: "row" }}
    w="400px"
    h="150px"
    // p="50px"
    m="10px"
    display="flex"
    flexDirection="row"
    overflow="hidden"
    variant="outline"
    bg="whiteAlpha.200"
    border="none"
    // boxShadow="2px 2px 4px #BDE0FF"
    _hover={{ transform: "scale(1.05)", transition: "ease-in 0.3s" }}
    mb="15px"
    sx={{
      "@media (max-width: 450px)": {
        flexDirection: "column",
        height: "auto",
        width: "90%",
      },
    }}
  >
    <Image
      objectFit="cover"
      // maxW={{ base: "100%", sm: "200px" }}
      src={alumni.image}
      alt={alumni.name}
      width="40%"
      sx={{
        "@media (max-width: 450px)": {
          width: "100%",
          height: "100%",
          aspectRatio: "1/1",
        },
      }}
    />

    <Stack 
      width="60%"
      sx={{
        "@media (max-width: 450px)": {
          width: "100%",
        },
      }}
    >
      <CardBody fontSize={{ base: "15px", md: "17px", lg: "15px" }}>
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
          {/* <FaLinkedin style={{ marginRight: "0.5rem", alignItems:"center"}} /> LinkedIn Profile */}
          <Flex alignItems="center">
            <FaLinkedin style={{ marginRight: "0.5rem" }} />
            <span>LinkedIn Profile</span>
          </Flex>
        </Link>
      </CardBody>
    </Stack>
  </Card>
);

export default AlumniCard;
