/* eslint-disable */
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GetExperiences, GetNextExperiences } from "../api/experiences";

const Experiences = () => {
  const [InterviewExperiences, setInterviewExperiences] = useState();
  useEffect(() => {
    GetExperiences().then((results) => {
      setInterviewExperiences(results);
    });
  }, []);

  const NextExperiences = async (url) => {
    const results = await GetNextExperiences(url);
    setInterviewExperiences(results);
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
          <Link key={key} to={`detail/${interview.id}`}>
            <h1 style={{ margin: "1em" }}>
              <strong>
                {interview.company} interview Experience{" "}
                {getYear(interview.created_at)}
              </strong>
              #{interview.id}
            </h1>
          </Link>
        );
      })}

      {/* For Previous 10 Experiences. */}
      {InterviewExperiences?.previous && (
        <button
          style={{ margin: "1em", padding: "15px", border: "solid 1px" }}
          onClick={() => {
            NextExperiences(InterviewExperiences?.previous);
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
            NextExperiences(InterviewExperiences?.next);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Experiences;
