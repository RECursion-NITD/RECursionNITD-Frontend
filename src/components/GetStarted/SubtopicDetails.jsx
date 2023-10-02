// import { Flex, Heading, Text } from "@chakra-ui/react";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
/* eslint-disable */
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
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
    <div className="sub text-white w-1/2 mt-[5vh] h-screen pd-12 ">
      <div className="text-5xl font-head font-bold">
        {subtopic?.sub_topic}
      </div>
      <div className="pt-12">
        {
          subtopic?.note?.map((item,idx)=>{
            return(
              <div>
                <ReactMarkdown
                  children={item?.Description}
                  className="font-sub text-sm lg:text-lg"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                />
                <ReactMarkdown
                  children={item?.Code_snippet}
                  className="font-sub text-sm lg:text-lg bg-codeSnippet pl-5 pb-3 pt-3 mt-6 rounded-xl"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                />
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default SubtopicDetails;
