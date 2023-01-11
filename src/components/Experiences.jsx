/* eslint-disable */
import React, { useEffect, useState } from "react";
import { GetExperiences, GetNextExperiences } from "../api/experiences";

const Experiences = () => {
  const [InterviewExperiences, setInterviewExperiences] = useState();
  useEffect(async () => {
    const results = await GetExperiences();
    setInterviewExperiences(results);
  }, []);
  return (
    <div>
      {InterviewExperiences?.results?.map((interview, key) => {
        return (
          <>
            <h1 key={key}>{interview.id}</h1>
          </>
        );
      })}
      {/* For Next 10 Experiences. */}
      {InterviewExperiences ? (
        <button
          onClick={async () => {
            const results = await GetNextExperiences(InterviewExperiences?.next);
            setInterviewExperiences(results);
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
