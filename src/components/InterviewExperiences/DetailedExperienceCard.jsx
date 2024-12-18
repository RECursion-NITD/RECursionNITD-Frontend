/* eslint-disable */
import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import msLogo from "../../assets/images/ms-logo.png";
import oracleLogo from "../../assets/images/oracle-logo.png";
import profile from "../../assets/images/profile.png";

const DetailedExperienceCard = ({ experience }) => {
  const getDate = (created_at) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(created_at);
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const dateString = day + " " + month + ", " + year;
    return dateString;
  };
  return (
    <div
      className="mb-0 w-full p-4 text-white bg-[#292929] p-10 mr-0 mt-0 ml-0"
    >
      <h1 className="text-secondary font-poppins font-semibold text-3xl mb-6 text-left p-4">
        Interview Experiences
      </h1>
      <div className="flex flex-col p-4">
        <div class="bg-[#535353] text-white p-4 rounded-lg font-sans mt-2 mb-2 mr-0 ml-0 w-full">
          <div class="flex justify-between font-semibold text-lg flex">
            <div className="m-0">Company Name:{experience?.company}</div>
            <div className="m-0">No of Rounds: 5</div>
          </div>
          <div class="text-base font-semibold">
            <p className="text-left">Role: SDE full time</p>
            <p className="text-left">Mode: On-Campus</p>
          </div>
        </div>

        <div className="flex justify-between items-center m-0 mb-2">
          <p className="m-0">Posted by {experience?.user.username} on {getDate(experience?.created_at)}{" "}</p>
          <div class="text-green-500 font-semibold m-0">✔️ Verified</div>
        </div>
        </div>
      {/* <blockquote
          className="text-onSurface font-sub mt-4"
        >
          {experience?.interview_Questions}
        </blockquote> */}
      <ReactMarkdown
        children={experience?.interview_Questions}
        className="font-Mulish text-lg text-justify p-4"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      />
    </div >
  );
};

export default DetailedExperienceCard;
