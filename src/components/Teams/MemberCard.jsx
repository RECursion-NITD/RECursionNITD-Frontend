import {
  Box,
  Heading,
  Image,
  Link,
  Icon,
  List,
  ListItem,
} from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaPhoneSquare } from "react-icons/fa";

const TeamMember = ({ member }) => (
  <Box className="our-team">
    <Box className="pic" boxShadow="2px 2px 50px #0a0a0a">
      <Image
        src={member.image}
        alt={member.name}
        borderRadius="100%"
        borderColor="white"
        borderWidth="3px"
        borderStyle="solid"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
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

export default TeamMember;
