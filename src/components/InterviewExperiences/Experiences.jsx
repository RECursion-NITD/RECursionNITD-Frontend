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

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <Container
      marginTop={"8vh"}
      padding={"1em"}
      bg={"gray.800"}
      minWidth={"100vw"}
      minHeight={"100vh"}
      maxHeight={"fit-content"}
    >
      <div style={{ textAlign: "center", marginTop: "4vh" }}>
        <h1 className="text-white font-head text-3xl mb-2">
          Interview Experiences
        </h1>
        <p className="text-whitesmoke font-sub italic">
          {" "}
          Nothing ever becomes real'til it is experienced - John Keats{" "}
        </p>
      </div>
      <div>
        <SearchExperiences
          setInterviewExperiences={setInterviewExperiences}
          setSearch={setSearch}
          setCompany={setCompany}
          setInterviewType={setInterviewType}
          FilterHandler={FilterHandler}
          Company={Company}
          InterviewType={InterviewType}
        />
      </div>
      <Container
        p={0}
        pt="4px"
        borderBottom="0px"
        width={"100vh"}
        maxWidth={"90vw"}
        minH="container.sm"
      >
        {InterviewExperiences?.results?.map((interview, id) => {
          return <IECard key={id} interview={interview} />;
        })}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* For Previous 10 Experiences. */}
          {InterviewExperiences?.previous && (
            <button
              style={{
                margin: "1em",
                width: "5em",
                padding: "15px",
                boxShadow: "3px 3px #80CBC4",
                border: "solid 1px #80CBC4",
                borderRadius: "8 px",

              }}
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
              style={{
                margin: "1em",
                width: "5em",
                padding: "15px",
                boxShadow: "3px 3px #80CBC4",
                border: "solid 1px #80CBC4",
                borderRadius: "8px",
                color:"#BDE0FF"
              }}
              onClick={() => {
                NextExperiences(InterviewExperiences?.next);
              }}
            >
              Next
            </button>
          )}
        </div>
      </Container>
    </Container>
  );
};

export default Experiences;
