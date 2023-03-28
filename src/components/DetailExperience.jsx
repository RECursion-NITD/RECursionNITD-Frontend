import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailExperience } from "../api/experiences";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

const DetailExperience = () => {
  const { loading, setLoading } = useLoading();
  const { experienceId } = useParams();
  const [experience, setExperience] = useState();

  useEffect(() => {
    setLoading(true);
    GetDetailExperience(experienceId)
      .then((res) => {
        setExperience(res);
        setLoading(false);
      })
      // eslint-disable-next-line
      .catch((e) => console.log("error fetching detailed exp ", e));
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div
      style={{
        marginTop: "5em",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          height: "100vh",
          marginRight: "15px",
          width: "15vw",
        }}
      >
        <ul
          style={{
            color: "white",
            listStyle: "none",
            textAlign: "center",
          }}
        >
          <li
            style={{
              border: "solid black 2px",
              borderRadius: "5px",
              margin: "1px",
            }}
          >
            Experience 1{" "}
          </li>
          <li
            style={{
              border: "solid black 2px",
              borderRadius: "5px",
              margin: "1px",
            }}
          >
            Experience 2
          </li>
          <li
            style={{
              border: "solid black 2px",
              borderRadius: "5px",
              margin: "1px",
            }}
          >
            Experience 3
          </li>
          <li
            style={{
              border: "solid black 2px",
              borderRadius: "5px",
              margin: "1px",
            }}
          >
            Experience 4
          </li>
          <li
            style={{
              border: "solid black 2px",
              borderRadius: "5px",
              margin: "1px",
            }}
          >
            Experience 5
          </li>
        </ul>
      </div>
      <div
        style={{
          height: "95vh",
          width: "70vw",
          backgroundColor: "#2B2E30",
          margin: "5px",
          borderRadius: "5px",
          padding: "10px",
          boxShadow: "10px 10px 25px #202324",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "15px" }}>
          MS Interview Experience
        </h2>
        <blockquote
          style={{ color: "white", fontFamily: "'Ubuntu', sans-serif" }}
        >
          {experience?.interview_Questions}
        </blockquote>
      </div>
    </div>
  );
};

export default DetailExperience;
