import React from "react";
import React,{ useEffect, useState } from "react";
import { getEvents,getNextEvents } from "../api/events";

const Events = () => {
  return <div>Events</div>;
  const [Events, setEvents] = useState([]);
  useEffect = () => {
    (async () => {
      try {
        const response = await getEvents();
      } catch(error) {
        console.log(error);
      }
      setEvents(response);
    },[])};
    return (
      <div>
        {Events?.response?.map((event, key) => {
          return (
            <>
              <h1 key={key}>{event.id}</h1>
            </>
          );
        })}
        {Events ? (
          <button
            onClick={async () => {
              const response = await getNextEvents(Events?.next);
              setEvents(response);
            }}
            >
              Next 
              </button>
        ) : (
          <></>
        )} 
      </div>
    );
  };

export default Events;
