import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getEvents, getNextEvents } from "../api/events";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";

const Events = () => {
  const [Events, setEvents] = useState([]);
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);
    getEvents()
      .then((response) => {
        setEvents(response);
        console.log("The event type is : ", Events[0]?.event_type);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      {Events?.results?.map((event, key) => {
        return (
          <Link key={key} to={`detail/${event.id}`}>
            <h1 style={{ margin: "10px" }}>
              <strong>{event.title}</strong>#{event.id}
            </h1>
          </Link>
        );
      })}
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
