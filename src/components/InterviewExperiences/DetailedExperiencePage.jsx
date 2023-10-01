/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GetDetailExperience, GetExperiences } from "../../api/experiences";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import IECard from "./IECard";
import DetailedExperienceCard from "./DetailedExperienceCard";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

const DetailedExperiencePage = () => {
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
    <div
      className="mt-[8vh] pt-[8vh] flex items-start justify-start  flex-col lg:flex-row"
      style={{
        background: "#1A202C",
        minWidth: "100vw",
        height: "max-content",
        padding: "1em",
      }}
    >
      {DetailedExperienceCard({ experience })}

      <div className=" w-full lg:w-1/3 min-w-[500px]  mt-0">
        {InterviewExperiences?.results?.slice(0, 5).map((interview, id) => {
          if (interview.id != experienceId) {
            return <IECard key={id} interview={interview} />;
          }
        })}
      </div>
    </div>
  );
};

export default DetailedExperiencePage;
