/* eslint-disable */
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GetExperiences, GetNextExperiences } from "../../api/experiences";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";
import { Container } from "@chakra-ui/react";
import IECard from "./IECard";
import SearchExperiences from "./SearchExperiences";
import { SearchExp } from "../../api/experiences";
import { Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons'

const Experiences = () => {
  const [InterviewExperiences, setInterviewExperiences] = useState();
  const { loading, setLoading } = useLoading();

  const [search, setSearch] = useState("");
  const [Company, setCompany] = useState(null);
  const [InterviewType, setInterviewType] = useState(null);

  useEffect(() => {
    setLoading(true);
    GetExperiences().then((results) => {
      setInterviewExperiences(results);
      setLoading(false);
    });
  }, []);

  const FilterHandler = () => {
    // console.log("Inside filterHandler", Company, InterviewType, search);
    setLoading(true);
    SearchExp(Company, InterviewType, search)
      .then((response) => {
        console.log(response);
        setInterviewExperiences(response);
        setLoading(false);
        // setSearch("");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // console.log("Useeffect called now");
    FilterHandler();
  }, [Company, InterviewType]);

  const NextExperiences = async (url) => {
    const results = await GetNextExperiences(url);
    setInterviewExperiences(results);
  };

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
    console.log(dateString);
    return dateString;
  };

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

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="flex">
      <div
        // className="mt-[8vh] p-4 bg-background min-w-full min-h-screen max-h-fit"
        className="m-0 p-16 flex flex-3 flex-col justify-center items-center min-h-screen bg-background w-[70vw] max-900:w-full max-570:pl-6 max-570:pr-6"
      >
        {/* Top heading */}
        <div className="text-left w-full p-1 m-4">
          <h1 className="text-secondary font-poppins font-semibold text-3xl mb-2">
            Interview Experiences
          </h1>
          <p className="text-white font-poppins italic">
            {" "}
            Nothing ever becomes real'til it is experienced - John Keats{" "}
          </p>
        </div>

        {/*Search Area */}
        <div className="w-full flex">
          <SearchExperiences
            setInterviewExperiences={setInterviewExperiences}
            setSearch={setSearch}
            setCompany={setCompany}
            setInterviewType={setInterviewType}
            FilterHandler={FilterHandler}
            Company={Company}
            InterviewType={InterviewType}
          />
          {/* <Link to="/experience/add">
            <Button colorScheme='teal' variant='outline'>
                Post Experience
            </Button>
          </Link> */}
        </div>
        
        <div className="w-full">
          {InterviewExperiences?.results?.map((interview, id) => {
            return <IECard key={id} interview={interview} />;
          })}

          <div className="flex justify-center align-center">
            {/* For Previous 10 Experiences. */}
            {InterviewExperiences?.previous && (
              <button
                className="m-4 w-20 p-4 shadow-[3px_3px_0px_#BDE0FF] border border-[#BDE0FF]"
                onClick={() => {
                  NextExperiences(InterviewExperiences?.previous);
                }}
              >
                Prev
              </button>
            )}

            {/* For Next 10 Experiences. */}

            {InterviewExperiences?.next && (
              <button
                className="m-4 w-20 p-4 shadow-[3px_3px_0px_#BDE0FF] border border-[#BDE0FF] rounded-lg text-[#BDE0FF]"
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

      <div className="pt-16 pl-3 pr-2 pb-2 bg-surfaceVariant rounded-lg ml-4 flex-1 font-semibold max-900:hidden">
          <h2 className="text-white font-semibold text-lg mb-4">Search for companies</h2>
          <div className="flex flex-wrap gap-1">
            <button
              className="p-2 bg-primary rounded-lg text-onPrimary"
              onClick={() => setCompany(null)}
            >
              All
            </button>
            {companies.map((company, idx) => (
              <button
                key={idx}
                className="p-2 bg-tertiary rounded-lg text-white"
                onClick={() => setCompany(company)}
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
