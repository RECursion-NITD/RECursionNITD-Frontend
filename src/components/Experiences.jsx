/* eslint-disable */
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GetExperiences, GetNextExperiences } from "../api/experiences";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import { Container } from '@chakra-ui/react';
import Entries from "./InterviewExperiences/Entries";
import SearchExperiences from "./InterviewExperiences/SearchExperiences";

const Experiences = () => {
  const [InterviewExperiences, setInterviewExperiences] = useState();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    GetExperiences().then((results) => {
      setInterviewExperiences(results);
      setLoading(false);
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

  const getDate = (created_at) => {
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const date = new Date(created_at);
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const dateString = day + ' ' + month + ', ' + year;
    console.log(dateString);
    return dateString;
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
        <div>
          <h1 className="text-onSurface font-head text-3xl mb-2">Interview Experiences</h1>
          <p className="text-onSurface font-sub italic"> Nothing ever becomes real'til it is experienced - John Keats </p>
        </div>
        <div>
          {SearchExperiences({setInterviewExperiences})}
        </div>
        <Container minW='container.sm' p={0} pt='4px'  borderBottom = '0px' maxW='container.xm' w='45vw' minH='container.sm' h='50vh'>
        {InterviewExperiences?.results?.map((interview, key) => {
          return (
            Entries({key,interview})
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
      </Container>
    </div>
  );
};

export default Experiences;
