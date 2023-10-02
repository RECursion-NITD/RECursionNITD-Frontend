/* eslint-disable */
import {
  Flex,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getContents, getSubTopicDetails } from "../../api/getStarted";
import useLoading from "../../hooks/useLoading";
import Sidebar from "./Sidebar";
import SubtopicDetails from "./SubtopicDetails";
import Loader from "../Loader";
import { ContentProvider } from "../../context/ContentContext";

const GetStarted = () => {

  const { loading, setLoading } = useLoading(true);
  
  





  return loading ? (
    <Loader />
  ):(
    <ContentProvider>
      <div className="flex justify-start h-auto mt-[8vh] items-start w-full bg-background">
        <Sidebar/>
        <SubtopicDetails/>
      </div>
    </ContentProvider>
  );
};

export default GetStarted;
