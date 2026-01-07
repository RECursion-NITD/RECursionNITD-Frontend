/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GetDetailExperience, GetExperiences } from "../../api/experiences";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import IECardblack from "./IECardblack";
import DetailedExperienceCard from "./DetailedExperienceCard";
import Reviews from "./Reviews";
import useAuth from "../../hooks/useAuth";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

const DetailedExperiencePage = () => {
  const { loading, setLoading } = useLoading();
  const { experienceId } = useParams();
  const [experience, setExperience] = useState();
  const [InterviewExperiences, setInterviewExperiences] = useState();
  const { user } = useAuth();

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
      .catch((e) => {});
  }, [experienceId,user]);

  return loading ? (
    <Loader />
  ) : (
      <div
        className="mt-[7vh] pt-[1vh] flex items-start justify-start flex-col lg:flex-row w-screen mr-0 ml-0 no-align"
        >
        <DetailedExperienceCard experience={experience} />

        <div className="w-full lg:min-w-[500px] bg-[#313131] mt-0 mb-0 flex-1">
          {InterviewExperiences?.results?.slice(0, 5).map((interview, id) => {
            if (interview.id != experienceId) {
              return <IECardblack key={id} interview={interview} />;
            }
          })}
        </div>
      </div>
      
  );
};

export default DetailedExperiencePage;
