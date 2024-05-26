import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailEvent } from "../../api/events";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { format, addHours } from "date-fns";
import {
  Box,
  Flex,
  // IconButton,
  // Input,
  // useColorModeValue,
  UnorderedList,
  ListItem,
  // Link,
  Center,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  FaCalendar,
  FaUserTie,
  FaCalendarCheck,
  FaCalendarMinus,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const adjustedDate = addHours(date, date.getTimezoneOffset() / 60);
  const formattedDate = format(adjustedDate, "MMM. dd, yy, h a");
  return formattedDate;
}

const DetailEvent = () => {
  const { loading, setLoading } = useLoading();
  const { eventId } = useParams();
  const [event, setEvent] = useState();

  useEffect(() => {
    setLoading(true);
    GetDetailEvent(eventId)
      .then((res) => {
        setEvent(res);
        setLoading(false);
      })
      .catch((e) => console.log("error fetching details of event ", e));
  }, []);

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return loading ? (
    <Loader />
  ) : (
    <Flex
      // justifyContent={{ base: "start", md: "center" }}
      justifyContent={"start"}
      alignItems="start"
      width="100%"
      height={"100%"}
      bg="rgb(35 39 47)"
      padding={4}
      mt="3rem"
      flexDirection={{ base: "column", md: "row" }}
      // flexDirection={"row"}
      // flexWrap={"wrap"}
    >
      <Box
        // width="100%"
        width={isMobile ? "100%" : "750px"}
        // width="600px"
        // maxHeight="90%"
        bg="rgb(52 58 70)"
        borderRadius="lg"
        marginRight={2}
        mt={4}
        mb={{ base: "10px" }}
        mr={4}
        // flex="1"
        // boxShadow="2px 2px 4px #BDE0FF"
      >
        <Box
          width="100%"
          fontSize="35px"
          mb={1}
          textDecoration={"underline"}
          color="lightblue"
        >
          {event?.title}
        </Box>

        <UnorderedList
          fontSize="100%"
          listStyleType="none"
          mr={4}
          padding={3}
          border="1px solid lightblue"
          borderRadius={"lg"}
        >
          <ListItem display="flex" justifyContent="start" alignItems="center">
            <Box as={FaCalendar} width="10%" m={0} color="white" />
            <Box
              as="b"
              m={0}
              width={{ base: "40%", md: "30%" }}
              color="#f5f3f3"
              fontSize="17px"
            >
              {"Category:"}{" "}
            </Box>

            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              className="markdown-style w-3/5"
            >
              {event?.event_type}
            </ReactMarkdown>
          </ListItem>
          <ListItem display="flex" justifyContent="start" alignItems="center">
            <Box as={FaUserTie} width="10%" m={0} color="white" />
            <Box
              as="b"
              m={0}
              width={{ base: "40%", md: "30%" }}
              color="#f5f3f3"
              fontSize="17px"
            >
              Open To:{" "}
            </Box>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              className="markdown-style w-3/5"
            >
              {event?.target_year}
            </ReactMarkdown>
          </ListItem>
          <ListItem display="flex" justifyContent="start" alignItems="center">
            <Box as={FaCalendarCheck} width="10%" m={0} color="white" />
            <Box
              as="b"
              m={0}
              width={{ base: "40%", md: "30%" }}
              color="#f5f3f3"
              fontSize="17px"
            >
              Start Time:{" "}
            </Box>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              className="markdown-style w-3/5"
            >
              {event?.start_time && formatDate(event.start_time)}
            </ReactMarkdown>
          </ListItem>
          <ListItem display="flex" justifyContent="start" alignItems="center">
            <Box as={FaCalendarMinus} width="10%" m={0} color="white" />
            <Box
              as="b"
              m={0}
              width={{ base: "40%", md: "30%" }}
              color="#f5f3f3"
              fontSize="17px"
            >
              End Time:{" "}
            </Box>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              className="markdown-style w-3/5"
            >
              {event?.end_time && formatDate(event.end_time)}
            </ReactMarkdown>
          </ListItem>
          <ListItem display="flex" justifyContent="start" alignItems="center">
            <Box as={FaClock} width="10%" m={0} color="white" />
            <Box
              as="b"
              m={0}
              width={{ base: "40%", md: "30%" }}
              color="#f5f3f3"
              fontSize="17px"
            >
              Duration:{" "}
            </Box>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              className="markdown-style w-3/5"
            >
              {event?.duration}
            </ReactMarkdown>
          </ListItem>
          <ListItem display="flex" justifyContent="start" alignItems="center">
            <Box as={FaMapMarkerAlt} width="10%" m={0} color="white" />
            <Box
              as="b"
              m={0}
              width={{ base: "40%", md: "30%" }}
              color="#f5f3f3"
              fontSize="17px"
            >
              Venue:{" "}
            </Box>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              className="markdown-style w-3/5"
            >
              {event?.venue}
            </ReactMarkdown>
          </ListItem>
        </UnorderedList>

        {event?.image && (
          <Box
            mt={4}
            mb={4}
            height={{ base: "300px", md: "400px" }}
            width="95%"
          >
            <Center height="100%" width="100%">
              <Image
                src={event.image}
                alt="Event Image"
                height="100%"
                borderRadius="lg"
                width="100%"
              />
            </Center>
          </Box>
        )}
      </Box>
      <Box
        // width={{ base: "100%", md: "50%", "2xl": "65%" }}
        width="100%"
        height="100%"
        // maxHeight="90%"
        bg="rgb(52 58 70)"
        borderRadius="lg"
        marginRight={2}
        mt={4}
        // flex="1"
        // boxShadow="2px 2px 4px #BDE0FF"
      >
        <Box
          width="100%"
          color="lightblue"
          fontSize="30px"
          mb={4}
          textDecoration={"underline"}
          // borderBottom="1px solid white"
          pl={4}
        >
          {event?.event_type === "Class"
            ? event?.event_type + " Materials"
            : event?.event_type + " Description"}
        </Box>

        <Box width="100%" fontSize="17px" mb={4} pl={4}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            className="markdown-style"
          >
            {event?.description}
          </ReactMarkdown>
        </Box>
      </Box>
    </Flex>
  );
};

export default DetailEvent;
