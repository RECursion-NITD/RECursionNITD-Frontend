// import { Link } from "react-router-dom";
import React from "react";
// import { getEvents, getNextEvents } from "../api/events";
import { Box, Button, Image, Heading, Text, Icon } from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import FallbackImage from "../../assets/images/REC_BLACK_with_white_background.png";
const perms = false;

const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();

  const period = hour >= 12 ? "p.m." : "a.m.";

  const formattedHour = hour % 12 || 12;

  const formattedDate = `${month} ${day}, ${year}, ${formattedHour} ${period}`;

  return formattedDate;
};

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/detail/${event.id}`}>
      <Box
        className="col-md-4 lg-4 col-sm-6 item"
        // p={3}
        m={"17px 10px"}
        display="flex"
        justifyContent="center"
        width={{ base: "300px", md: "400px" }}
        // height="470px"
        cursor="pointer"
        backgroundColor='#313131'
      >
        <Box
          className="card item-card card-block"
          _hover={{ transform: "scale(1.05)", transition: "ease-in 0.15s" }}
          p={3}
          rounded="md"
          textAlign="center"
          width="100%"
          height="100%"
          // boxShadow="2px 2px 4px #BDE0FF"
        >
          {event.image ? (
            <Image
              src={event.image}
              alt="RECursion Event Poster"
              height="260px"
              width="260px"
              // mb={3}
            />
          ) : (
            <Image
              src={FallbackImage}
              alt="RECursion Event Poster"
              height="200px"
              width="200px"
              // mb={3}
            />
          )}

          <Text color="white" fontFamily="Mulish"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
            Title: {event.title}
            {perms && (
              <>
                <br />
                <a>(Update)</a>
              </>
            )}
          </Text>

          <Text color="white" fontFamily="Mulish">
            Date: {formatDate(event.start_time)}
          </Text>

          <Text color="white" fontFamily="Mulish">
            Duration: {event.duration}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default EventCard;
