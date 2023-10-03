/* eslint-disable */
import { Flex, Heading, Text, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getContents, getSubTopicDetails } from "../../api/getStarted";
import useLoading from "../../hooks/useLoading";
import Sidebar from "./Sidebar";
import SubtopicDetails from "./SubtopicDetails";
import Loader from "../Loader";
import { ContentProvider } from "../../context/ContentContext";
import { useParams } from "react-router-dom";

const GetStarted = () => {
  const { subtopicId } = useParams();
  const { loading } = useLoading(true);
  const [isFullScreen, setFullScreen] = useState(false);

  return loading ? (
    <Loader />
  ) : (
    <ContentProvider>
      <div className="flex justify-start h-auto mt-[8vh] items-start w-full bg-background">
        <Sidebar
          subtopicId={subtopicId}
          isFullScreen={isFullScreen}
          setFullScreen={setFullScreen}
        />
        <SubtopicDetails />
      </div>
    </ContentProvider>
  );
};

export default GetStarted;
