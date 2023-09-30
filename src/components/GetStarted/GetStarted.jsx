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

const GetStarted = () => {
  const [contents, setContents] = useState(null);

  useEffect(() => {
    getContents().then((result) => {
      setContents(result);
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
      padding={0}
      mt={"8vh"}
      width={"100%"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      background={"gray.800"}
    >
      <Container textAlign="center" marginTop={"5vh"}>
        <Heading> Getting Started</Heading>
        <Text>The best way to learn is to get started</Text>
      </Container>

      <Container
        border={"solid 1px gray"}
        borderRadius={"8px"}
        background={"gray.700"}
        padding={"15px"}
        minWidth={"90vw"}
        margin={"15px"}
      >
        <Heading size="lg">Contents</Heading>
        {!contents && <Text>Loading...</Text>}
        {contents?.length > 0 && (
          <Flex flexDirection={"column"}>
            {contents.map((level, levelIndex) => (
              <Box key={levelIndex} marginY="10px">
                <Text
                  color={`#${level.Color}`}
                  fontSize="xl"
                  fontWeight="bold"
                  marginBottom="5px"
                >
                  {level.Level_title}
                </Text>
                {level?.topic?.map((topic, topicIndex) => (
                  <Box key={topicIndex} marginY="5px">
                    <Flex alignItems="center">
                      <IconButton
                        size="sm"
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
                      <Text fontSize="md">{topic.Topic_title}</Text>
                    </Flex>
                    <Collapse
                      in={openTopics.includes(
                        `level${levelIndex}_topic${topicIndex}`
                      )}
                    >
                      {topic?.subtopic?.map((subtopic, subtopicIndex) => (
                        <Text fontSize="md" key={subtopicIndex}>
                          <Link to={`/get_started/${subtopic.id}`}>
                            <Text fontWeight={"bold"} marginLeft={"3em"}>
                              {subtopic.sub_topic}
                            </Text>
                          </Link>
                        </Text>
                      ))}
                    </Collapse>
                  </Box>
                ))}
              </Box>
            ))}
          </Flex>
        )}
      </Container>
    </Flex>
  );
};

export default GetStarted;
