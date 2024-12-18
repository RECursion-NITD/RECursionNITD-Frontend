import React from "react";
/* eslint-disable */
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike, AiOutlineRight } from "react-icons/ai";

const IECard = ({ interview }) => {
  const getYear = (created_at) => {
    const date = new Date(created_at);
    const year = date.getFullYear();
    return year;
  };

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
    <div className="flex flex-col">
      <Link to={`/experience/detail/${interview.id}`} className="m-0">
        <div className="justify-center items-start flex font-sub p-4 w-full mt-4 mb-4 max-570:m-0 h-fit bg-[#121212] hover:border-[#3a3a3a] relative">
          {/* Arrow Icon */}
          <AiOutlineRight className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-xl text-bold" />

          <FaUserCircle className="text-onSurface h-[50px] w-[50px] ml-8" />
          <div className="w-full text-onSurface font-mulish flex flex-col ps-5 pe-5 text-xl">
            <div className="font-semibold text-left m-0">
              {interview.company} Interview Experience {getYear(interview.created_at)}
            </div>
            <div className="flex justify-between items-center m-0">
              <div className="text-sm font-mulish text-left text-[#787777] m-0">
                Posted By {interview.user.username} {getDate(interview.created_at)}
              </div>
              {/* Hide buttons on screens smaller than 570px */}
              <div className="max-570:hidden m-0">
                <button className="text-onSurface hover:text-green-500 transition-colors duration-300 delay-100">
                  <AiOutlineLike className="mr-4" />
                </button>
                <button className="text-onSurface hover:text-red-500 transition-colors duration-300 delay-100">
                  <AiOutlineDislike className="mr-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Separate div for Like/Dislike buttons on screens smaller than 570px */}
      <div className="hidden max-570:flex justify-center items-center space-x-4">
        <button className="text-onSurface hover:text-green-500 transition-colors duration-300 delay-100">
          <AiOutlineLike className="text-lg mb-4" />
        </button>
        <button className="text-onSurface hover:text-red-500 transition-colors duration-300 delay-100">
          <AiOutlineDislike className="text-lg mb-4" />
        </button>
      </div>
    </div>
  );
};

export default IECard;
