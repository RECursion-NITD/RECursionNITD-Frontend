/* eslint-disable */
import React, { useEffect, useState } from "react";
import { GetExperiences, GetNextExperiences } from "../../api/experiences";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import IECard from "./IECard";
import SearchExperiences from "./SearchExperiences";
import { SearchExp } from "../../api/experiences";

const Experiences = () => {
  const [InterviewExperiences, setInterviewExperiences] = useState();
  const { loading, setLoading } = useLoading();

  const [search, setSearch] = useState("");
  const [Company, setCompany] = useState(null);
  const [InterviewType, setInterviewType] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    setLoading(true);
    GetExperiences().then((results) => {
      setInterviewExperiences(results);
      setLoading(false);
    });
  }, []);

  const FilterHandler = () => {
    setLoading(true);
    SearchExp(Company, InterviewType, search)
      .then((response) => {
        setInterviewExperiences(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    FilterHandler();
  }, [Company, InterviewType]);

  const NextExperiences = async (url) => {
    const results = await GetNextExperiences(url);
    setInterviewExperiences(results);
  };

  const getYear = (created_at) => {
    const date = new Date(created_at);
    return date.getFullYear();
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
    return `${day} ${month}, ${year}`;
  };

  const companies = [
    "Microsoft",
    "Adobe",
    "Wells Fargo",
    "BNY",
    "Texas Instruments",
    "Oracle",
    "JP Morgan",
  ];

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setCompany(company);
    if (company === null) {
        setSearch("");
    }
  };

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="flex no-align items-stretch">
      <div
        className="m-0 p-16 flex flex-col justify-center items-center min-h-screen bg-background w-[70vw] max-900:w-full max-570:pl-4 max-570:pr-4"
      >
        <div className="text-left w-full p-1 m-4">
          <h1 className="text-secondary font-poppins font-semibold text-3xl mb-2">
            Interview Experiences
          </h1>
          <p className="text-white font-poppins italic">
            Nothing ever becomes real&apos;til it is experienced - John Keats
          </p>
        </div>

        <div className="w-full flex m-0">
          <SearchExperiences
            search={search}
            setInterviewExperiences={setInterviewExperiences}
            setSearch={setSearch}
            setCompany={setCompany}
            setInterviewType={setInterviewType}
            FilterHandler={FilterHandler}
            Company={Company}
            InterviewType={InterviewType}
          />
        </div>

        <div className="w-full m-0 items-start">
          {InterviewExperiences?.results?.map((interview, id) => {
            return <IECard key={id} interview={interview} />;
          })}

          <div className="flex justify-center align-center">
            {InterviewExperiences?.previous && (
              <button
                className="m-4 w-24 p-2 rounded-lg text-white font-bold bg-secondary"
                onClick={() => {
                  NextExperiences(InterviewExperiences?.previous);
                }}
              >
                Previous
              </button>
            )}

            {InterviewExperiences?.next && (
              <button
                className="m-4 w-20 p-2 rounded-lg text-white font-bold bg-secondary"
                onClick={() => {
                  NextExperiences(InterviewExperiences?.next);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="pt-16 pl-3 pr-2 pb-2 bg-surfaceVariant rounded-lg ml-4 flex-1 font-semibold max-900:hidden m-0">
        <h2 className="text-white font-semibold text-lg mb-4 mt-1">Search for companies</h2>
        <div className="flex flex-wrap gap-1">
          <button
            className={`p-2 rounded-lg ${
              selectedCompany === null ? "bg-primary text-onPrimary" : "bg-tertiary text-white"
            }`}
            onClick={() => handleCompanyClick(null)}
          >
            All
          </button>
          {companies.map((company, idx) => (
            <button
              key={idx}
              className={`p-2 rounded-lg ${
                selectedCompany === company ? "bg-primary text-onPrimary" : "bg-tertiary text-white"
              }`}
              onClick={() => handleCompanyClick(company)}
            >
              {company}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
