/* eslint-disable */
import { Text, Center, Image } from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React, { useEffect, useState } from "react";
import { getSubTopicDetails } from "../../api/getStarted";
import useContent from "../../hooks/useContent";
import { Box } from "@chakra-ui/react";

function TextWithLineBreaks({ text }) {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, index) => (
        <Text key={index} mb={"15px"}>
          {line}
        </Text>
      ))}
    </>
  );
}

const SubtopicDetails = () => {
  const { subTopicSelected } = useContent();
  const [subtopic, setSubtopic] = useState();
  useEffect(() => {
    getSubTopicDetails(subTopicSelected).then((res) => {
      setSubtopic(res);
      console.log(res);
    });
  }, [subTopicSelected]);

  return (
    <div className="sub text-white w-3/4 ml-[25vw] mt-[5vh] pd-12 p-5">
      <div className="text-5xl font-head font-bold">{subtopic?.sub_topic}</div>
      <div className="pt-12">
        {subtopic?.note?.map((item, idx) => (
          <Box key={idx} marginBottom="4vh">
            {item?.Description && item?.Image1 && (
              <div className="flex rounded bg-surface mb-5 p-5">
                <Box flex="1">
                  <TextWithLineBreaks text={item?.Description} />
                </Box>
                <Box flex="1">
                  <Center>
                    <Image
                      src={item?.Image1}
                      alt=""
                      maxH="auto"
                      maxW="450px"
                      width="100%"
                    />
                  </Center>
                </Box>
              </div>
            )}

            {item?.Description && item?.Image2 && (
              <div className="flex rounded bg-surface mb-5 p-5">
                <Box flex="1" marginBottom="4vh">
                  <Center>
                    <Image
                      src={item?.Image2}
                      alt=""
                      maxH="auto"
                      maxW="450px"
                      width="100%"
                    />
                  </Center>
                </Box>
                <Box flex="1" marginBottom="2vh">
                  <TextWithLineBreaks text={item?.Description} />
                </Box>
              </div>
            )}

            {item?.Image1 && item?.Image2 && (
              <div
                className="flex rounded bg-surface mb-5 p-5"
                marginBottom="4vh"
              >
                <Box flex="1">
                  <Center>
                    <Image
                      rounded={"5px"}
                      src={item?.Image1}
                      alt=""
                      maxH="auto"
                      maxW="450px"
                      width="100%"
                    />
                  </Center>
                </Box>
                <Box flex="1">
                  <Center>
                    <Image
                      rounded={"5px"}
                      src={item?.Image2}
                      alt=""
                      maxH="auto"
                      maxW="450px"
                      width="100%"
                    />
                  </Center>
                </Box>
              </div>
            )}

            {item?.Description && item?.Code_snippet && (
              <div
                className="flex rounded bg-surface mb-5 p-5"
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
                marginBottom="4vh"
              >
                <pre style={{ width: "50%", display: "flex" }}>
                  <SyntaxHighlighter
                    children={item?.Code_snippet}
                    language="cpp"
                    style={tomorrowNight}
                  />
                </pre>

                <Box width={"50%"} padding={"10px"}>
                  <TextWithLineBreaks text={item?.Description} />
                </Box>
              </div>
            )}

            {item?.Image1 && item?.Code_snippet && (
              <div
                className="flex rounded bg-surface mb-5 p-5"
                marginBottom="4vh"
              >
                <Box flex="1" marginBottom="4vh">
                  <SyntaxHighlighter
                    children={item?.Code_snippet}
                    language="cpp"
                    style={tomorrowNight}
                  />
                </Box>
                <Box flex="1" marginBottom="4vh">
                  <Center>
                    <Image
                      src={item?.Image1}
                      alt=""
                      maxH="auto"
                      maxW="450px"
                      width="100%"
                    />
                  </Center>
                </Box>
              </div>
            )}

            {!item.Code_snippet &&
              !item.Image1 &&
              !item.Image2 &&
              item?.Description && (
                <Box marginBottom="1vh">
                  <TextWithLineBreaks text={item?.Description} />
                </Box>
              )}

            {!item.Code_snippet &&
              !item.Image1 &&
              !item.Image2 &&
              !item?.Description && (
                <Box height="1em" marginBottom="1vh">
                  <br />
                </Box>
              )}

            {!item.Code_snippet &&
              item.Image1 &&
              !item.Image2 &&
              !item?.Description && (
                <Box marginBottom="3vh">
                  <Center>
                    <Image
                      src={item?.Image1}
                      alt=""
                      maxH="auto"
                      maxW="450px"
                      width="100%"
                    />
                  </Center>
                </Box>
              )}

            {item.Code_snippet &&
              !item.Image1 &&
              !item.Image2 &&
              !item?.Description && (
                <Box marginBottom="1vh">
                  <pre style={{ marginLeft: "3vw", marginRight: "3vw" }}>
                    <SyntaxHighlighter
                      children={item?.Code_snippet}
                      language="cpp"
                      style={tomorrowNight}
                    />
                  </pre>
                </Box>
              )}
          </Box>
        ))}
      </div>
    </div>
  );
};

export default SubtopicDetails;
