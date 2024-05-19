/* eslint-disable */
import { IconButton, Button } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { getContents } from "../../api/getStarted";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Collapsible from "./Collapsible";
import useContent from "../../hooks/useContent";

const Sidebar = ({ subtopicId, isFullScreen, setFullScreen }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const {
    contents,
    setContents,
    levelSelected,
    setLevelSelected,
    topicSelected,
    setTopicSelected,
    setSubTopicSelected,
  } = useContent();

  useEffect(() => {
    async function fetch() {
      const result = await getContents();
      setContents(result);

      result?.forEach((level) => {
        let levelNumber = level.Number;
        level.topic?.forEach((curr_topic, idx) => {
          let topicNumber = idx;
          curr_topic.subtopic?.forEach((subTopic) => {
            if (subTopic.id == subtopicId) {
              setLevelSelected(levelNumber);
              setTopicSelected(topicNumber);
            }
          });
        });
      });
    }
    fetch();
    setSubTopicSelected(subtopicId);
  }, []);

  return isMobile ? (
    isFullScreen ? (
      <div className="w-full m-0 h-full fixed pt-3 overflow-scroll bg-surface">
        <IconButton
          color={"whitesmoke"}
          display={{ base: "block", md: "none" }}
          icon={<CloseIcon />}
          aria-label="Menu"
          variant="ghost"
          onClick={() => setFullScreen((full) => !full)}
        />
        {contents?.map((item, idx) => {
          return (
            <div key={idx}>
              <div
                className="font-head pl-6 rounded-r-xl cursor-pointer flex justify-between  pb-3 pt-3 font-semibold text-md text-secondaryText"
                style={{
                  backgroundColor: idx == levelSelected ? "#19486A" : "#23272F",
                  color: idx == levelSelected ? "#149ECA" : "#98A0B2",
                }}
                onClick={(e) => {
                  setLevelSelected(idx);
                  setTopicSelected(0);
                  setSubTopicSelected(contents[idx].topic[0].subtopic[0].id);
                }}
              >
                <div className="mx-0">{item.Level_title}</div>
                {idx == levelSelected ? (
                  <ChevronUpIcon className="ml-0 mr-3" />
                ) : (
                  <ChevronDownIcon className="ml-0 mr-3" />
                )}
              </div>
              <Collapsible key={idx} idx={idx} item={item} setFullScreen={setFullScreen} />
              <hr
                style={{
                  color: "#343a46",
                  width: "80%",
                  margin: "auto",
                  paddingTop: "5px",
                }}
              />
            </div>
          );
        })}
      </div>
    ) : (
      <IconButton
        p={"10px"}
        margin={"5px"}
        color={"whitesmoke"}
        position={"absolute"}
        display={{ base: "block", md: "none" }}
        icon={<HamburgerIcon />}
        aria-label="Menu"
        variant="ghost"
        onClick={() => setFullScreen((full) => !full)}
      />
    )
  ) : (
    <div className="w-3/12 max-w-[350px] m-0 h-full fixed pt-12 pb-24 overflow-scroll">
      {contents?.map((item, idx) => {
        return (
          <div key={idx}>
            <div
              className="font-head pl-6 rounded-r-xl cursor-pointer flex justify-between  pb-3 pt-3 font-semibold text-md text-secondaryText"
              style={{
                backgroundColor: idx == levelSelected ? "#19486A" : "#23272F",
                color: idx == levelSelected ? "#149ECA" : "#98A0B2",
              }}
              onClick={(e) => {
                setLevelSelected(idx);
                setTopicSelected(0);
                setSubTopicSelected(contents[idx].topic[0].subtopic[0].id);
              }}
            >
              <div className="mx-0">{item.Level_title}</div>
              {idx == levelSelected ? (
                <ChevronUpIcon className="ml-0 mr-3" />
              ) : (
                <ChevronDownIcon className="ml-0 mr-3" />
              )}
            </div>
            <Collapsible key={idx} idx={idx} item={item} setFullScreen={setFullScreen} />
            <hr
              style={{
                color: "#343a46",
                width: "80%",
                margin: "auto",
                paddingTop: "5px",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
