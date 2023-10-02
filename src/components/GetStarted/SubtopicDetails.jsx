// import { Flex, Heading, Text } from "@chakra-ui/react";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { getSubTopicDetails } from "../../api/getStarted";
import { sub } from "date-fns";
import useContent from "../../hooks/useContent";
const SubtopicDetails = () => {

    const {subTopicSelected} = useContent();
    const [subtopic, setSubtopic] = useState(null);

    useEffect(() => {
      getSubTopicDetails(subTopicSelected).then((res)=>{
        setSubtopic(res);
        console.log(res);
      });
  }, [subTopicSelected]);
  
  return(
    <div className="sub text-white w-1/2 mt-[5vh]">
      <div className="text-5xl font-head font-bold">
        {subtopic?.sub_topic}
      </div>
      <div className="pt-12">
        {
          subtopic?.note?.map((item,idx)=>{
            return(
              <div>
                <div className="font-sub text-lg">
                  {item.Description}
                </div>
                <div>
                  {
                    item.Code_snippet
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default SubtopicDetails;
