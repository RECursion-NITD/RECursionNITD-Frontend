/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailExperience, GetExperiences } from "../api/experiences";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import Entries from "./InterviewExperiences/Entries";
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
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    GetDetailExperience(experienceId)
      .then((res) => {
        setExperience(res);
        setLoading(false);
      })
      // eslint-disable-next-line
      .catch((e) => console.log("error fetching detailed exp ", e));
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="mt-[10vh] w-5/6 flex">
      <div
        className="h-full min-h-screen mb-20 w-1/2 bg-surface rounded-xl p-4 border-outline"
      >
        <h2 style={{ color: "white", marginBottom: "15px" }}>
          MS Interview Experience
        </h2>
        <blockquote
          style={{ color: "white", fontFamily: "'Ubuntu', sans-serif" }}
        >
          {experience?.interview_Questions}
        </blockquote>
      </div>
      <div className="h-screen w-1/3 flex  items-start">
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
