import React from "react";
/* eslint-disable */
import { Link } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import msLogo from "../../assets/images/ms-logo.png";
import profile from "../../assets/images/profile.png";
import { type } from "@testing-library/user-event/dist/type";
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
    <Container
      w="95%"
      className="mt-2 mb-5 p-0 min-w-[95%] border-[1px] rounded-xl h-fit border-outline"
      boxShadow={"3px 3px #80CBC4"}
      bg={"whiteAlpha.200"}
    >
      <Link to={`/experience/detail/${interview.id}`}>
        <div className="justify-start flex font-sub p-2 text-xl">
          <div className="h-[50px] w-[50px] me-2 ms-0">
            <img
              src={msLogo}
              alt="company logo"
              className="h-[50px] w-[50px] object-cover rounded-md"
            />
          </div>
          <div className="w-full font-bold">
            <div className="w-full font-bold flex">
              <div className="w-full font-bold font-head text-sm lg:text-xl text-onSurface">
                <div>
                  {" "}
                  {interview.company} Interview Experience{" "}
                  {getYear(interview.created_at)} | #{interview.id}{" "}
                </div>
                <div className="text-xs lg:text-sm text-onSurface">
                  SWE /{" "}
                  <span className="text-[#EF6041]">
                    {" "}
                    {interview.job_Profile}{" "}
                  </span>
                </div>
              </div>
              <div className="font-head text-teal-200 font-bold text-xs lg:text-sm">
                SELECTED
              </div>
            </div>
          </div>
        </div>
        <div className="justify-start flex font-sub p-2 pb-4 text-xl">
          <div className="h-[50px] w-[50px] me-2 ms-0">
            <img
              src={profile}
              alt="company logo"
              className="h-[50px] w-[50px] object-cover rounded-full"
            />
          </div>
          <div className="w-full font-bold flex">
            <div className="w-full font-bold text-xs md:text-sm text-secondaryText">
              <div> Added By {interview.user.username} </div>
              <div>
                {" "}
                <i className="text-sm material-icons">date_range</i>{" "}
                {getDate(interview.created_at)}{" "}
              </div>
            </div>
            <div className="font-sub font-bold text-secondaryText text-xs md:text-sm flex justify-end w-2/6">
              {interview.no_of_Rounds}{" "}
              {interview.no_of_Rounds > 1 ? "Rounds" : "Round"}
            </div>
          </div>
        </div>
      </Link>
    </Container>
  );
};

export default IECard;
