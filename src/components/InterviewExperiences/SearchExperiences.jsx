/* eslint-disable */
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { SearchExp } from "../../api/experiences";
import { FiSearch } from "react-icons/fi";
import { Button } from '@chakra-ui/react';

const SearchExperiences = ({ setInterviewExperiences,setSearch,setCompany,setInterviewType,FilterHandler,Company,InterviewType }) => {
  const { loading, setLoading } = useLoading();

  const companies = [
    "Company",
    "Microsoft",
    "Adobe",
    "Wells Fargo",
    "BNY",
    "Texas Instruments",
    "Oracle",
    "JP Morgan",
  ];
  const interviewType = ["All", "Internship", "Full Time"];
  return (
    <div className="mt-4 mb-4 flex flex-col justify-between w-full">
      <div className="relative flex w-full justify-start">
      <input
        className="h-12 m-1 w-full outline-none border-outline rounded-3xl ps-12 pe-4 text-black bg-surface font-poppins"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search..."
      />
      <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-black text-[#326B94] text-2xl" />
    </div>
      <div className="flex max-900:flex-col max-900:justify-center justify-start items-center">
        <select
          onChange={(e) => setCompany(e.target.value==="Company" ? null : e.target.value)}
          value={Company === null ? "Company" : Company}
          className="h-9 w-full m-1 border-outline rounded-lg ps-3 pe-2 bg-surface text-[#9ca3af] 900px:hidden"
        >
          {companies.map((company, idx) => {
            return (
              <option key={idx} value={company}>
                {company}
              </option>
            );
          })}
        </select>
        <select
          className="h-9 w-full 900px:w-[200px] rounded-lg ps-3 pe-2 m-1 bg-surface text-[#9ca3af]"
          onChange={(e) => setInterviewType(e.target.value==="All" ? null : e.target.value)}
          value={InterviewType === null ? "All" : InterviewType}
        >
          {interviewType.map((type, idx) => {
            return (
              <option key={idx} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <Link to="/experience/add">
          <button className="w-full h-9 mt-2 mb-2 ml-1 mr-1 bg-secondary text-onSurface font-bold px-4 rounded-lg whitespace-nowrap">
            Post Experience
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchExperiences;
