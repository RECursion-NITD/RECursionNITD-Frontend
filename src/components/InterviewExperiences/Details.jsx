/* eslint-disable */
import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import parse from "html-react-parser";
import rehypeKatex from "rehype-katex";
import msLogo from "../../assets/images/ms-logo.png";
import oracleLogo from "../../assets/images/oracle-logo.png";
import profile from "../../assets/images/profile.png";

const Details = ({ experience }) => {
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
    <div className="h-full min-h-screen mb-20 w-1/2 bg-surface rounded-xl p-4 border-outline text-white">
      <div className="justify-start flex font-sub p-2 text-xl">
        <div className="h-[50px] w-[50px] me-2 ms-0">
          <img
            src={oracleLogo}
            alt="company logo"
            className="h-[50px] w-[50px] object-contain rounded-md"
          />
        </div>
        <div className="w-full font-bold">
          <div className="w-full font-bold flex">
            <div className="w-full font-head font-bold text-xl text-onSurface">
              <div>{experience?.company} Interview Experience </div>
              <div className="text-sm text-secondaryText">
                SWE /{" "}
                <span className="text-[#EF6041]">
                  {" "}
                  {experience?.job_Profile}{" "}
                </span>
              </div>
            </div>
            <div className="font-head text-green-500 font-bold text-sm">
              SELECTED
            </div>
          </div>
        </div>
      </div>
      {/* <blockquote
          className="text-onSurface font-sub mt-4"
        >
          {experience?.interview_Questions}
        </blockquote> */}
          <ReactMarkdown children={experience?.interview_Questions} className='font-sub text-lg' remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}/>
        <div className='flex justify-end w-full mt-5'>
          <div className = "w-full font-bold text-sm text-secondaryText">
            <div className='w-full text-right'> Added By {experience?.user.username} </div>
            <div className='w-full text-right'> <i className="text-sm material-icons">date_range</i> {getDate(experience?.created_at)} </div>
          </div>
        </div>
    </div>
  );
};

export default Details;
