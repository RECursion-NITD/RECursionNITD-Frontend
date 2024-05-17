/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, FilterSearchEvents, getNextEvents } from "../../api/events";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import FilterEvent from "./FilterEvent";
import { Box, Flex, Heading, useMediaQuery, Text,Button, SimpleGrid } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'
import EventCard from "./EventCard";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../utils/roles";

const Events = () => {
  const [Events, setEvents] = useState([]);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { loading, setLoading } = useLoading();
  const [SearchQuery, setSearchQuery] = useState("");
  const [EventType, setEventType] = useState("All");
  const {user} = useAuth();

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
    FilterSearchHandler();
  }, [EventType]);

  const NextEvents = async (url) => {
    const results = await getNextEvents(url);
    setEvents(results);
  };

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
    <>
    <Box bg={"gray.800"} height={"100%"} width={"100%"}>
      <Box
        // marginTop={"8vh"}
        // marginLeft={isMobile ? "0vw" : "20vw"}
        // marginLeft={"0vw"}
        // width={"100%"}
        // minHeight={"92vh"}
        bg="gray.800"
        justifyContent={"center"}
        alignItems={"center"}
      >
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
            color="whitesmoke"
          >
            We don remember the dates, we remember events!
          </Text>
          <hr className="m-auto mt-[2em] w-[90%] d-flex align-center color-secondaryText " />
        </Box>
        { user?.role<=ROLES.MODERATOR &&
            <div>
              <Link to="/events/create">
                <Button colorScheme='teal' variant='outline' className="mt-4">
                    <EditIcon />
                    Add Event
                </Button>
              </Link>
            </div>
         
        }

        {
          <FilterEvent
            EventType={EventType}
            setEventType={setEventType}
            setSearchQuery={setSearchQuery}
            FilterSearchHandler={FilterSearchHandler}
          />
        }

        {/*The main box with all the event cards */}
        {/* <Flex
          // mt={5}
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          // maxWidth={isMobile ? "100%" : "80vw"}
          maxWidth={"100%"}
        >
          {Events?.results?.map((event, key) => (
            <EventCard key={key} event={event} />
          ))}
        </Flex> */}

        <SimpleGrid
          // mt={5}
          spacing={2}
          minChildWidth={"300px"}
          width={"86%"}
        >
          {Events?.results?.map((event, key) => (
            <EventCard key={key} event={event} />
          ))}
        </SimpleGrid>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* For Previous 10 Events. */}
          {Events?.previous && (
            <button
              style={{
                margin: "1em",
                width: "5em",
                padding: "15px",
                boxShadow: "3px 3px #BDE0FF",
                border: "solid 1px #BDE0FF",
                border: "solid 1px",
                color: "#BDE0FF",
              }}
              onClick={() => {
                NextEvents(Events?.previous);
              }}
            >
              Prev
            </button>
          )}

          {/* For Next 10 Events. */}

          {Events?.next && (
            <button
              style={{
                margin: "1em",
                width: "5em",
                padding: "15px",
                boxShadow: "3px 3px #BDE0FF",
                border: "solid 1px #BDE0FF",
                borderRadius: "8px",
                color: "#BDE0FF",
              }}
              onClick={() => {
                NextEvents(Events?.next);
              }}
            >
              Next
            </button>
          )}
        </div>
      </Box>
    </Box>
    </>
  );
};

export default Events;
