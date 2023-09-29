// import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getEvents, FilterSearchEvents } from "../api/events";
// import { getEvents, getNextEvents } from "../api/events";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import FilterEvent from "./Events/FilterEvent";
import {
  Box,
  Button,
  Icon,
  // Avatar,
  // Center,
  // Container,
  // Flex,
  Heading,
  // Stack,
  Text,
  Image,
  SimpleGrid,
  // Flex,
  // IconButton,
  // Input,
  // useColorModeValue,
} from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
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

const Card = ({ event }) => {
  return (
    <Box
      className="col-md-4 lg-4 col-sm-6 item"
      p={3}
      display="flex"
      justifyContent="center"
      width="300px"
      height="450px"
      cursor="pointer"
      // maxW={["100%", "50%", "33.33%"]}
    >
      <Box
        className="card item-card card-block"
        p={3}
        borderWidth="0.5px"
        borderColor="#343A40"
        rounded="md"
        textAlign="center"
        width="100%"
        height="100%"
        bg="#0e0d0d"
        boxShadow="2px 2px 50px #0a0a0a"
        color="grey"
      >
        {event.image ? (
          <Image
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

        <Heading as="h5" fontSize="20px" color="#adff2f" mb={3}>
          <a
            href={`{% url 'events_calendar:event_detail' ${event.id}  %}`}
            textDecoration="none"
            color="#323744"
          >
            {event.title}
          </a>
          {perms && (
            <>
              <br />
              <a href={`{% url 'events_calendar:event_update' ${event.id}  %}`}>
                (Update)
              </a>
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

        <Text color="#ebeb07">
          <Icon as={IoLocationSharp} />
          {event.venue}
        </Text>

        <Button
          as="a"
          href={`/events/detail/${event.id}`}
          mt={3}
          colorScheme="gray"
          color="black"
        >
          Know more
        </Button>
      </Box>
    </Box>
  );
};

const Events = () => {
  const [Events, setEvents] = useState([]);
  const { loading, setLoading } = useLoading();
  const [SearchQuery, setSearchQuery] = useState("");
  const [EventType, setEventType] = useState("All");

  const FilterSearchHandler = () => {
    console.log("Inside search handler", EventType, SearchQuery);
    setLoading(true);
    FilterSearchEvents(EventType, SearchQuery)
      .then((response) => {
        console.log(response);
        setEvents(response);
        setLoading(false);
        setSearchQuery("");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setLoading(true);
    getEvents()
      .then((response) => {
        console.log(response);
        setEvents(response);
        console.log("The event type is : ", Events[0]?.event_type);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log("Inside useffect 2");
    FilterSearchHandler();
  }, [EventType]);

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    // <div>
    //   {Events?.results?.map((event, key) => {
    //     return (
    //       <Link key={key} to={`detail/${event.id}`}>
    //         <h1 style={{ margin: "10px" }}>
    //           <strong>{event.title}</strong>#{event.id}
    //         </h1>
    //       </Link>
    //     );
    //   })}
    //   {Events?.previous ? (
    //     <button
    //       style={{ margin: "10px", border: "1px solid black" }}
    //       onClick={async () => {
    //         const response = await getNextEvents(Events?.previous);
    //         setEvents(response);
    //       }}
    //     >
    //       Prev
    //     </button>
    //   ) : (
    //     <></>
    //   )}

    //   {Events?.next ? (
    //     <button
    //       style={{ margin: "10px", border: "1px solid black" }}
    //       onClick={async () => {
    //         const response = await getNextEvents(Events?.next);
    //         setEvents(response);
    //       }}
    //     >
    //       Next
    //     </button>
    //   ) : (
    //     <></>
    //   )}
    // </div>

    <Box p={4} width="100%" bg="#3e3b3b">
      <Box mt="2%">
        <Heading
          as="h2"
          fontSize="2xl"
          marginTop="5rem"
          textAlign="center"
          color="white"
        >
          Events
        </Heading>
        <link
          href="https://fonts.googleapis.com/css?family=Pacifico&display=swap"
          rel="stylesheet"
        />
        <Text
          fontSize="sm"
          fontFamily="'Pacifico', cursive"
          textAlign="center"
          color="white"
        >
          We don remember the dates, we remember events!
        </Text>
      </Box>

      <FilterEvent
        setEventType={setEventType}
        setSearchQuery={setSearchQuery}
        FilterSearchHandler={FilterSearchHandler}
      />

      <Box mt={12} width="100%">
        <SimpleGrid columns={[1, 2, 3, 4]} justifyContent={"space-around"}>
          {Events?.results?.map((event, key) => (
            <Card key={key} event={event} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Events;
