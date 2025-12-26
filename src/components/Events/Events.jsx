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
import ContestList from "./ContestList";

const Events = () => {
  const [Events, setEvents] = useState([]);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { loading, setLoading } = useLoading();
  const [SearchQuery, setSearchQuery] = useState("");
  const [EventType, setEventType] = useState("All");
  const {user} = useAuth();

  const dummyEvents = {
    count: 3,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        title: "BIT MANIPULATION",
        date: "Sep 12, 2024, 6:15 PM",
        duration: "1 hour 45 minutes",
      },
      {
        id: 2,
        title: "ALGORITHMS - DYNAMIC PROGRAMMING",
        date: "Sep 14, 2024, 5:00 PM",
        duration: "2 hours",
      },
      {
        id: 3,
        title: "DATA STRUCTURES - TREES",
        date: "Sep 16, 2024, 3:30 PM",
        duration: "1 hour 30 minutes",
      },
      {
        id: 2,
        title: "ALGORITHMS - DYNAMIC PROGRAMMING",
        date: "Sep 14, 2024, 5:00 PM",
        duration: "2 hours",
      },
      {
        id: 3,
        title: "DATA STRUCTURES - TREES",
        date: "Sep 16, 2024, 3:30 PM",
        duration: "1 hour 30 minutes",
      },
      {
        id: 2,
        title: "ALGORITHMS - DYNAMIC PROGRAMMING",
        date: "Sep 14, 2024, 5:00 PM",
        duration: "2 hours",
      }
    ],
  };

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
        // console.log("The event type is : ", Events[0]?.event_type);
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
    <Flex mt={"2%"} height={"100%"} width={"100%"} flexDirection={"row"} alignItems={"flex-start"} justifyContent={"flex-start"} >
      <Box
        // marginTop={"8vh"}
        // marginLeft={isMobile ? "0vw" : "20vw"}
        // marginLeft={"0vw"}
        // width={"100%"}
        // minHeight={"92vh"}
        display={"flex"}   //added flex caused the white line to shrink
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"left"}
        height={"100%"} width={"100%"}
        pl={"4%"}
        pr={"4%"}
      >
        <Box
          width={"86%"}
          padding={"12px"}
          ml={0}
        >
          <Box mt="2%" mb="2%">
            <Heading
              as="h1"
              fontSize="3xl"
              textAlign="left"
              color="#34aaff"
            >
              Events
            </Heading>
            <link
              href="https://fonts.googleapis.com/css?family=Pacifico&display=swap"
              rel="stylesheet"
            />
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
        </Box>

        {/*The main box with all the event cards */}
        <SimpleGrid
          // mt={5}
          ml={0}
          spacing={1}
          minChildWidth={"400px"}
          width={"100%"}
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
      <ContestList/>
    </Flex>
    </>
  );
};

export default Events;
