import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailExperience } from "../api/experiences";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const DetailExperience = () => {
  const { loading, setLoading } = useLoading();
  const { experienceId } = useParams();
  const [experience, setExperience] = useState();

  useEffect(() => {
    setLoading(true);
    GetDetailExperience(experienceId)
      .then((res) => {
        setExperience(res);
        setLoading(false);
      })
      .catch((e) => console.log("error fetching detailed exp ", e));
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="detailexperience_container">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {experience?.interview_Questions}
      </ReactMarkdown>
    </div>
  );
};

export default DetailExperience;
