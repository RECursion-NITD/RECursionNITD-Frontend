/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailExperience, GetExperiences } from "../api/experiences";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import Entries from "./InterviewExperiences/Entries";
import Details from "./InterviewExperiences/Details";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

const DetailExperience = () => {
  const { loading, setLoading } = useLoading();
  const { experienceId } = useParams();
  const [experience, setExperience] = useState();
  const [InterviewExperiences, setInterviewExperiences] = useState();

  useEffect(() => {
    setLoading(true);
    GetExperiences().then((results) => {
      setInterviewExperiences(results);
    });
    GetDetailExperience(experienceId)
      .then((res) => {
        setExperience(res);
        setLoading(false);
      })
      // eslint-disable-next-line
      .catch((e) => console.log("error fetching detailed exp ", e));
  }, [experienceId]);

  return loading ? (
    <Loader />
  ) : (
    <div className="mt-[10vh] w-screen flex items-start justify-start flex-col flex-row lg:flex-row">
      {Details({ experience })}
      <div className="h-screen w-full lg:w-1/3 min-w-[500px] h-screen mt-0">
        {InterviewExperiences?.results?.map((interview, key) => {
          if(interview.id != experienceId){
            return (
              Entries({key,interview})
            );
          }
        })}
      </div>
    </div>
  );
};

export default DetailExperience;
