/* eslint-disable */
import React, { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { SearchExp } from "../../api/experiences";

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
    <div className="w-full mt-4 mb-4 flex flex-col md:flex-row justify-between">
      <div className="flex w-full md:w-1/2 justify-start ml-0 mr-3">
        <input
          className="h-9 w-full outline-none me-2 border-outline rounded-lg ps-3 pe-2 text-black"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search by title"
        />
        <button
          className="h-9 w-3/10 md:w-1/6 bg-primary text-white rounded-lg font-alt p-1 font-semibold"
          onClick={FilterHandler}
        >
          Search
        </button>
      </div>
      <div className="flex w-full md:w-1/2 justify-between md:justify-end mt-4 md:mt-0">
        <select
          onChange={(e) => setCompany(e.target.value==="Company" ? null : e.target.value)}
          value={Company === null ? "Company" : Company}
          className="h-9 w-2/6 me-2 border-outline rounded-lg ps-3 pe-2"
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
          className="h-9 w-2/6 rounded-lg ps-3 pe-2"
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
      </div>
    </div>
  );
};

export default SearchExperiences;
