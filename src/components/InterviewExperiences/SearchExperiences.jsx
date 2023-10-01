/* eslint-disable */
import React, { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { SearchExp } from "../../api/experiences";

const SearchExperiences = ({ setInterviewExperiences,setSearch,setCompany,setInterviewType,FilterHandler,Company,InterviewType }) => {
  const { loading, setLoading } = useLoading();
  // const [query, setQuery] = useState("Company");
  // const [search, setSearch] = useState("");
  // const [Company, setCompany] = useState(null);
  // const [InterviewType, setInterviewType] = useState(null);

  // const FilterHandler = () => {
  //   console.log("Inside filterHandler", Company, InterviewType, search);
  //   if (Company === null && InterviewType === null && search === "") return;
  //   setLoading(true);
  //   SearchExp(Company, InterviewType, search)
  //     .then((response) => {
  //       console.log(response);
  //       setInterviewExperiences(response);
  //       setLoading(false);
  //       // setSearch("");
  //     })
  //     .catch((err) => console.error(err));
  // };

  // useEffect(() => {
  //   console.log("Useeffect called now");
  //   FilterHandler();
  // }, [Company, InterviewType]);

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
    <div className="w-full mt-4 mb-4 flex justify-between">
      <div className="flex w-1/2 justify-start ml-0 mr-3">
        <input
          className="h-9 w-full outline-none me-2 border-outline rounded-lg ps-3 pe-2 text-onSurface"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search by title"
        />
        <button
          className="h-9 w-1/6 bg-primary text-onPrimary rounded-lg font-alt p-1 font-semibold"
          onClick={FilterHandler}
        >
          Search
        </button>
      </div>
      <div className="flex w-1/2 justify-end">
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
