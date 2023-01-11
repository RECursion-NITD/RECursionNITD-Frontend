import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailExperience } from "../api/experiences";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
const DetailExperience = () => {
  const { experienceId } = useParams();
  const [experience, setExperience] = useState();

  useEffect(() => {
    console.log("hi");
    GetDetailExperience(experienceId)
      .then((res) => setExperience(res))
      .catch((e) => console.log("error fetching detailed exp ", e));
  }, []);

  return (
    <div>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {experience?.interview_Questions}
      </ReactMarkdown>
    </div>
  );
};

export default DetailExperience;
