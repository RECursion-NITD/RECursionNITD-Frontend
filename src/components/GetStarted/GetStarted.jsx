import {
  Flex,
  Heading,
  Text,
  Container,
  Box,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { getContents } from "../../api/getStarted";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";

const GetStarted = () => {
  const [contents, setContents] = useState(null);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    getContents().then((result) => {
      setContents(result);
      setLoading(false);
    });
  }, []);

  const [openTopics, setOpenTopics] = useState([]);

  const toggleTopic = (levelIndex, topicIndex) => {
    const topicKey = `level${levelIndex}_topic${topicIndex}`;
    if (openTopics.includes(topicKey)) {
      setOpenTopics(openTopics.filter((key) => key !== topicKey));
    } else {
      setOpenTopics([...openTopics, topicKey]);
    }
  };

  return (
    <Flex
      minHeight={"92vh"}
      margin={0}
      padding={"15px"}
      mt={"8vh"}
      width={"100%"}
      textColor={"white"}
      flexDirection={"column"}
      background={"gray.800"}
    >
      <Container
        textAlign="center"
        marginTop={"5vh"}
        minWidth={"90vw"}
        padding={"15px"}
        background={"whiteAlpha.50"}
        borderRadius={"8px"}
      >
        <Heading> Getting Started</Heading>
        <p
          className="text-gray-300 font-sub italic"
          style={{
            fontWeight: "bold",
            marginBottom: "1em",
          }}
        >
          The best way to learn is to get started
        </p>
        <Text>
          Whether you{"'"}re a beginner or an experienced coder, this collection
          provides in-depth insights into algorithms and data structures crucial
          for competitive programming. We{"'"}re dedicated to expanding our
          knowledge base by enhancing existing articles and adding new ones, all
          aimed at empowering programmers in their coding journey.
        </Text>
      </Container>

      <Container
        borderRadius={"8px"}
        background={"gray.700"}
        padding={"15px"}
        minWidth={"90vw"}
        margin={"15px"}
        textAlign="left"
      >
        {loading && <Loader />}
        {contents?.length > 0 && (
          <Container flexDirection={"column"} minWidth={"80vw"}>
            {contents.map((level, levelIndex) => (
              <Box key={levelIndex} marginY="10px">
                <Text
                  borderRadius={"8px"}
                  background={"gray.600"}
                  color={`#${level.Color}`}
                  fontSize="xl"
                  fontWeight="bold"
                  marginBottom="5px"
                >
                  LEVEL {levelIndex} : {level.Level_title}
                </Text>
                {level?.topic?.map((topic, topicIndex) => (
                  <Box key={topicIndex} marginY="5px">
                    <Flex alignItems="center">
                      <IconButton
                        size="sm"
                        background={"gray.900"}
                        _hover={{ background: "gray.800" }}
                        icon={
                          openTopics.includes(
                            `level${levelIndex}_topic${topicIndex}`
                          ) ? (
                            <ChevronUpIcon />
                          ) : (
                            <ChevronDownIcon />
                          )
                        }
                        onClick={() => toggleTopic(levelIndex, topicIndex)}
                        aria-label={
                          openTopics.includes(
                            `level${levelIndex}_topic${topicIndex}`
                          )
                            ? "Collapse"
                            : "Expand"
                        }
                      />
                      <Text fontSize="md" padding={"15px"} fontWeight="bold">
                        {topic.Topic_title}
                      </Text>
                    </Flex>
                    <Collapse
                      in={openTopics.includes(
                        `level${levelIndex}_topic${topicIndex}`
                      )}
                    >
                      {topic?.subtopic?.map((subtopic, subtopicIndex) => (
                        <Text
                          fontSize="md"
                          key={subtopicIndex}
                          width={"90%"}
                          marginLeft={"4em"}
                          padding={"5px"}
                          borderRadius={"8px"}
                          _hover={{ background: "gray.600" }}
                        >
                          <Link to={`/get_started/${subtopic.id}`}>
                            <Text>• {subtopic.sub_topic}</Text>
                          </Link>
                        </Text>
                      ))}
                    </Collapse>
                  </Box>
                ))}
              </Box>
            ))}
          </Container>
        )}
      </Container>
    </Flex>
  );
};

export default GetStarted;
