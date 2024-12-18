import React from "react";
/* eslint-disable */
import { Link } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import msLogo from "../../assets/images/ms-logo.png";
import profile from "../../assets/images/profile.png";
import { type } from "@testing-library/user-event/dist/type";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

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
        <div className="justify-center items-start flex font-sub p-4 w-full mt-1 mb-1 h-fit bg-surface hover:border-[#3a3a3a] max-400:w-[300px]">
          <FaUserCircle className="text-onSurface h-[50px] w-[50px]" />
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
