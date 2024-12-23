import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Container,
  Button,
  Collapse,
  Box,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { getContents } from "../../api/getStarted";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";

const darkenColor = (hex, amount) => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  const num = parseInt(color, 16);

  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00ff) - amount;
  let b = (num & 0x0000ff) - amount;

  r = r < 0 ? 0 : r;
  g = g < 0 ? 0 : g;
  b = b < 0 ? 0 : b;

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

const ContentsPage = () => {
  const [contents, setContents] = useState(null);
  const { loading, setLoading } = useLoading();
  const [visibleContainer, setVisibleContainer] = useState(null);
  const [reduceContainerSize, setReduceContainerSize] = useState(false);
  const [openTopic, setOpenTopic] = useState(null);

  const [isMobile] = useMediaQuery("(max-width: 1013px)");

  const toggleVisibility = (index) => {
    setVisibleContainer(visibleContainer === index ? null : index);
    setReduceContainerSize((prevState) =>
      prevState && visibleContainer === index ? false : true
    );
  };

  const toggleTopic = (levelIndex, topicIndex) => {
    const newOpenTopic = `level${levelIndex}_topic${topicIndex}`;
    setOpenTopic((prev) => (prev === newOpenTopic ? "" : newOpenTopic));
  };

  useEffect(() => {
    setLoading(true);
    getContents().then((result) => {
      setContents(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (isMobile) {
    return (
      <Flex
        minHeight="92vh"
        minWidth="90vw"
        margin={0}
        padding="15px"
        mt="8vh"
        width="100%"
        textColor="white"
        flexDirection="column"
        background="gray.800"
        paddingBottom={"50px"}
      >
        <Container
          textAlign="left"
          marginTop="3vh"
          minWidth="90vw"
          padding="15px"
          background="grey.50"
          borderRadius="8px"
        >
          <Heading fontSize="34px" textAlign={"center"}>
            Getting Started
          </Heading>
          <p
            className="text-whitesmoke font-sub italic"
            style={{
              fontWeight: "bold",
              marginTop: "0.5em",
              marginBottom: "2em",
              textAlign: "center",
            }}
          >
            The best way to learn is to get started
          </p>
          <Text textAlign="left">
            Whether you&apos;re a beginner or an experienced coder, this
            collection provides in-depth insights into algorithms and data
            structures crucial for competitive programming. We&apos;re dedicated
            to expanding our knowledge base by enhancing existing articles and
            adding new ones, all aimed at empowering programmers in their coding
            journey.
          </Text>
        </Container>

        <Link to="/get_started/1">
          <Button
            marginTop="1em"
            marginBottom="0"
            padding="1em"
            height="fit-content"
            background="linear-gradient(180deg, #00A5EC 0%, #007BEC 100%);"
            _hover={{
              background: "linear-gradient(180deg, #2d88dd 0%, #027ee8 100%);",
            }}
            color="#FFFFFF"
          >
            Take me to the articles 🚀
          </Button>
        </Link>

        {contents?.length > 0 && (
          <Flex flexDirection="column" alignItems="center" marginTop="2em">
            {contents.map((level, levelIndex) => (
              <React.Fragment key={levelIndex}>
                <Container
                  width="95vw"
                  style={{
                    background: `#${level.Color}`,
                    color: "#F4FBFF",
                    margin: "0",
                    padding: "1em",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleVisibility(levelIndex)}
                >
                  <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    {level.Level_title}
                  </Text>
                </Container>
                <AnimatePresence>
                  {visibleContainer === levelIndex && (
                    <motion.div
                      key={levelIndex}
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: "0" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.7,
                      }}
                      style={{
                        width: "100%",
                        background: `#${level.Color}`,
                        color: "#F4FBFF",
                        margin: "0",
                        padding: "1em",
                        overflow: "hidden",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {level?.topic?.map((topic, topicIndex) => (
                        <Box key={topicIndex} marginY="5px">
                          <Flex alignItems="center">
                            <IconButton
                              size="sm"
                              background={`#${level.Color}`}
                              _hover={{
                                background: darkenColor(`#${level.Color}`, 40),
                              }}
                              icon={
                                openTopic ===
                                `level${levelIndex}_topic${topicIndex}` ? (
                                  <ChevronUpIcon />
                                ) : (
                                  <ChevronDownIcon />
                                )
                              }
                              onClick={() =>
                                toggleTopic(levelIndex, topicIndex)
                              }
                              aria-label={
                                openTopic ===
                                `level${levelIndex}_topic${topicIndex}`
                                  ? "Collapse"
                                  : "Expand"
                              }
                            />
                            <Box
                              as="button"
                              onClick={() =>
                                toggleTopic(levelIndex, topicIndex)
                              }
                              _hover={{ cursor: "pointer" }}
                              padding="15px"
                            >
                              <Text
                                fontSize="md"
                                fontWeight="bold"
                                color="#10344F"
                              >
                                {topic.Topic_title}
                              </Text>
                            </Box>
                          </Flex>
                          <Collapse
                            in={
                              openTopic ===
                              `level${levelIndex}_topic${topicIndex}`
                            }
                          >
                            {topic?.subtopic?.map((subtopic, subtopicIndex) => (
                              <Text
                                fontSize="md"
                                key={subtopicIndex}
                                width="90%"
                                marginLeft="1em"
                                padding="3px"
                                borderRadius="8px"
                                _hover={{
                                  background: darkenColor(
                                    `#${level.Color}`,
                                    40
                                  ),
                                }}
                              >
                                <Link to={`/get_started/${subtopic.id}`}>
                                  <Text color="#10344F" fontWeight="bold">
                                    • {subtopic.sub_topic}
                                  </Text>
                                </Link>
                              </Text>
                            ))}
                          </Collapse>
                        </Box>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </Flex>
        )}
      </Flex>
    );
  }

  return (
    <Flex
      minHeight="92vh"
      margin={0}
      padding="15px"
      mt="8vh"
      width="100%"
      textColor="white"
      flexDirection="column"
      background="gray.800"
      paddingBottom={"50px"}
    >
      <Flex>
        <Container
          textAlign="left"
          marginTop="3vh"
          minWidth="70vw"
          padding="15px"
          background="grey.50"
          borderRadius="8px"
        >
          <Heading fontSize="34px">Getting Started</Heading>
          <p
            className="text-gray-800 font-sub italic"
            style={{
              fontWeight: "bold",
              marginTop: "0.5em",
              marginBottom: "1em",
              color: "whitesmoke",
            }}
          >
            The best way to learn is to get started
          </p>
          <Text textAlign="left">
            Whether you&apos;re a beginner or an experienced coder, this
            collection provides in-depth insights into algorithms and data
            structures crucial for competitive programming. We&apos;re dedicated
            to expanding our knowledge base by enhancing existing articles and
            adding new ones, all aimed at empowering programmers in their coding
            journey.
          </Text>
        </Container>

        <Link to="/get_started/1">
          <Button
            marginTop="1em"
            marginBottom="0"
            padding="1em"
            height="fit-content"
            background="linear-gradient(180deg, #00A5EC 0%, #007BEC 100%);"
            _hover={{
              background: "linear-gradient(180deg, #2d88dd 0%, #027ee8 100%);",
            }}
            color="#FFFFFF"
          >
            Take me to the articles 🚀
          </Button>
        </Link>
      </Flex>
      {loading ? (
        <Loader />
      ) : (
        contents?.length > 0 && (
          <Flex
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            marginTop="2em"
          >
            {contents.map((level, levelIndex) => (
              <React.Fragment key={levelIndex}>
                <Container
                  width={reduceContainerSize ? "5.5vw" : "8vw"}
                  height="650px"
                  style={{
                    background: `#${level.Color}`,
                    color: "#F4FBFF",
                    margin: "0",
                    padding: "1em",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleVisibility(levelIndex)}
                >
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    style={{
                      transform: "rotate(90deg)",
                      transformOrigin: "center center",
                      whiteSpace: "nowrap",
                      textOrientation: "upright",
                      marginTop: "10em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {level.Level_title}
                  </Text>
                </Container>
                <AnimatePresence>
                  {visibleContainer === levelIndex && (
                    <motion.div
                      key={levelIndex}
                      initial={{ width: 0 }}
                      animate={{ width: "370px" }}
                      exit={{ width: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.7,
                      }}
                      style={{
                        height: "650px",
                        background: `#${level.Color}`,
                        color: "#F4FBFF",
                        margin: "0",
                        padding: "1em",
                        overflow: "hidden",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {level?.topic?.map((topic, topicIndex) => (
                        <Box key={topicIndex} marginY="5px">
                          <Flex alignItems="center">
                            <IconButton
                              size="sm"
                              background={`#${level.Color}`}
                              _hover={{
                                background: darkenColor(`#${level.Color}`, 40),
                              }}
                              icon={
                                openTopic ===
                                `level${levelIndex}_topic${topicIndex}` ? (
                                  <ChevronUpIcon />
                                ) : (
                                  <ChevronDownIcon />
                                )
                              }
                              onClick={() =>
                                toggleTopic(levelIndex, topicIndex)
                              }
                              aria-label={
                                openTopic ===
                                `level${levelIndex}_topic${topicIndex}`
                                  ? "Collapse"
                                  : "Expand"
                              }
                            />
                            <Box
                              as="button"
                              onClick={() =>
                                toggleTopic(levelIndex, topicIndex)
                              }
                              _hover={{ cursor: "pointer" }}
                              padding="15px"
                            >
                              <Text
                                fontSize="md"
                                fontWeight="bold"
                                color="#10344F"
                              >
                                {topic.Topic_title}
                              </Text>
                            </Box>
                          </Flex>
                          <Collapse
                            in={
                              openTopic ===
                              `level${levelIndex}_topic${topicIndex}`
                            }
                          >
                            {topic?.subtopic?.map((subtopic, subtopicIndex) => (
                              <Text
                                fontSize="md"
                                key={subtopicIndex}
                                width="90%"
                                marginLeft="4em"
                                padding="3px"
                                borderRadius="8px"
                                _hover={{
                                  background: darkenColor(
                                    `#${level.Color}`,
                                    40
                                  ),
                                }}
                              >
                                <Link to={`/get_started/${subtopic.id}`}>
                                  <Text color="#10344F" fontWeight="bold">
                                    • {subtopic.sub_topic}
                                  </Text>
                                </Link>
                              </Text>
                            ))}
                          </Collapse>
                        </Box>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </Flex>
        )
      )}
    </Flex>
  );
};

export default ContentsPage;
