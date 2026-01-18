import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../api/userInfo";
/* eslint-disable */
import { Link } from "react-router-dom";
import { Container, Avatar } from "@chakra-ui/react";
import msLogo from "../../assets/images/ms-logo.png";
import profile from "../../assets/images/default_profile.png";
import { type } from "@testing-library/user-event/dist/type";



const IECard = ({ interview }) => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        if (interview.user.username) {
          const data = await getUserProfile(interview.user.username);
          setProfileImage(data.image);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    fetchProfileImage();
  }, [interview.user.username]);


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
          <Avatar 
            src={profileImage || profile} 
            name={interview.user.username} 
            size="md" 
            className="text-onSurface h-[50px] w-[50px]" 
            mr={4}
          />
          <div className="w-full text-onSurface font-mulish flex flex-col ps-5 pe-5 text-xl">
            <div className="font-semibold text-left mt-1 m-0">
              {interview.company} Interview Experience {getYear(interview.created_at)}
            </div>
            <div className="flex justify-between items-center m-0">
              <div className="text-sm font-mulish text-left text-[#787777] m-0">
                Posted By {interview.user.username} {getDate(interview.created_at)}
              </div>
              {/* Hide buttons on screens smaller than 570px */}
              <div className="max-570:hidden m-0">
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Separate div for Like/Dislike buttons on screens smaller than 570px */}
      <div className="hidden max-570:flex justify-center items-center space-x-4">
      </div>
    </div>
  );
};

export default IECard;
