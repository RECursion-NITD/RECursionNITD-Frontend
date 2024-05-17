// import { Link } from "react-router-dom";
import React from "react";
// import { getEvents, getNextEvents } from "../api/events";
import { Box, Button, Image, Heading, Text, Icon } from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
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
        p={3}
        m={"5px auto"}
        display="flex"
        justifyContent="center"
        width="300px"
        height="450px"
        cursor="pointer"
      >
        <Box
          className="card item-card card-block"
          _hover={{ transform: "scale(1.05)", transition: "ease-in 0.3s" }}
          p={3}
          borderWidth="0.5px"
          borderColor="#343A40"
          rounded="md"
          textAlign="center"
          width="100%"
          height="100%"
          bg="whiteAlpha.200"
          // boxShadow="2px 2px 4px #BDE0FF"
        >
          {event.image ? (
            <Image
              borderRadius={"8px"}
              src={event.image}
              alt="RECursion Event Poster"
              height="200px"
              width="100%"
              mb={3}
            />
          ) : (
            <Image
              src="{% static 'image/logo_event.png'%}"
              alt="RECursion Event Poster"
              height="200px"
              width="200px"
              mb={3}
            />
          )}

          <Heading as="h5" fontSize="20px" color="lightBlue" mb={3}>
            <a textDecoration="none">{event.title}</a>
            {perms && (
              <>
                <br />
                <a>(Update)</a>
              </>
            )}
          </Heading>

          <Text color="white">
            <strong>{event.event_type}</strong>: {event.target_year}
          </Text>

          <Text color="white">
            <Icon as={SlCalender} />
            <span style={{ paddingLeft: "10px" }}>
              {formatDate(event.start_time)}
            </span>
          </Text>

          <Text color="lightBlue">
            <Icon as={IoLocationSharp} />
            {event.venue}
          </Text>

          <Button
            as="a"
            mt={3}
            p={2}
            sx={{
              borderRadius: "8px",

              backgroundImage:
                "linear-gradient(to right, #BDE0FF 50%, #596274 50%)",
              backgroundSize: "200% 100%",
              transition: "background-position .5s ease-out",
              backgroundPosition: "right",
              color: "white", // Add text color
              textAlign: "center", // Center text
              textDecoration: "none", // Remove underline
              cursor: "pointer", // Change cursor on hover
              "&:hover": {
                backgroundImage:
                  "linear-gradient(to right, #BDE0FF 50%, #596274 50%)",
                backgroundPosition: "left",
                color: "black",
                fontWeight: "bold",
                boxShadow: "2px 2px 3px #1a202c",
                backgroundSize: "200% 100%",
              },
            }}
          >
            Know more
          </Button>
        </Box>
      </Box>
    </Link>
  );
};

export default EventCard;
