/* eslint-disable */
import React, { useEffect, useState } from "react";
import { GetExperiences, GetNextExperiences } from "../api/experiences";

const Experiences = () => {
  const [InterviewExperiences, setInterviewExperiences] = useState();
  useEffect(() => {
    GetExperiences().then((results) => {
      setInterviewExperiences(results);
    });
  }, []);
  const NextTenExperiences = async () => {
    const results = await GetNextExperiences(InterviewExperiences?.next);
    setInterviewExperiences(results);
  };
  return (
    <div>
      {InterviewExperiences?.results?.map((interview, key) => {
        return <h1 key={key}>{interview.id}</h1>;
      })}
      {/* For Next 10 Experiences. */}
      {InterviewExperiences ? (
        <button
          onClick={() => {
            NextTenExperiences();
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

export default Experiences;
