import React, { useEffect, useState } from "react";
import { getEvents, getNextEvents } from "../api/events";

const Events = () => {
  const [Events, setEvents] = useState([]);

  useEffect(() => {
    getEvents()
      .then((response) => {
        setEvents(response);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {Events?.results?.map((event, id) => (
        <div key={id}>{event.description}</div>
      ))}

      {Events?.previous ? (
        <button
          style={{ margin: "10px", border: "1px solid black" }}
          onClick={async () => {
            const response = await getNextEvents(Events?.previous);
            setEvents(response);
          }}
        >
          Prev
        </button>
      ) : (
        <></>
      )}

      {Events?.next ? (
        <button
          style={{ margin: "10px", border: "1px solid black" }}
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
