/* eslint-disable */
import React, { useEffect, useState } from "react";
import { GetExperiences, GetNextExperiences } from "../api/experiences";
import { getroute } from "../utils/GetRoute";
import { API_ROUTES } from "../utils/api_routes";

const Experiences = () => {
  const [InterviewExperiences, setInterviewExperiences] = useState();
  useEffect(() => {
    GetExperiences("").then((results) => {
      setInterviewExperiences(results);
    });
  }, []);

  const NextAndPrevExperiences = async (url) => {
    const route = getroute(url, API_ROUTES.EXPERIENCES); //Getting the route form the, because there is a URL insted of a route(eg: page1,page2)
    GetExperiences(route).then((results) => {
      setInterviewExperiences(results);
    });
  };

  const getYear = (created_at) => {
    const date = new Date(created_at);
    const year = date.getFullYear();
    return year;
  };

  return (
    <div>
      {InterviewExperiences?.results?.map((interview, key) => {
        return (
          <h1 key={key} style={{ margin: "1em" }}>
            <strong>
              {interview.company} interview Experience{" "}
              {getYear(interview.created_at)}
            </strong>
            #{interview.id}
          </h1>
        );
      })}

      {/* For Previous 10 Experiences. */}
      {InterviewExperiences?.previous && (
        <button
          style={{ margin: "1em", padding: "15px", border: "solid 1px" }}
          onClick={() => {
            NextAndPrevExperiences(InterviewExperiences?.previous);
          }}
        >
          Prev
        </button>
      )}

      {/* For Next 10 Experiences. */}

      {InterviewExperiences?.next && (
        <button
          style={{ margin: "1em", padding: "15px", border: "solid 1px" }}
          onClick={() => {
            NextAndPrevExperiences(InterviewExperiences?.next);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Experiences;
