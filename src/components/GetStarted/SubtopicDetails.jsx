import { Flex, Heading, Text } from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { rainbow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React from "react";
/* eslint-disable */
const SubtopicDetails = () => {
  const subTopic = {
    id: 1,
    note: [
      {
        id: 1,
        Notes_topic: "For loop",
        Description:
          "A for loop is an iterative structure which has wide range of applications",
        Code_snippet:
          "int main()\r\n{\r\n   int n=10;\r\n   int fibArr[n];\r\n   fibArr[0]=fibArr[1]=1;\r\n   for(int i=2;i<n;i++)\r\n     {\r\n         fibArr[i]=fibArr[i-1]+fibArr[i-2];\r\n     }\r\n}",
        Image1: null,
        Image2: null,
        topic: 1,
        level: 1,
        subtopic: 1,
      },
    ],
    file: [],
    sub_topic: "Iterative statements",
    topic: 1,
    level: 1,
  };

  return (
    <Flex
      background={"gray.800"}
      marginTop={"8vh"}
      height={"92vh"}
      width={"100vw"}
      textColor={"white"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      <Heading>{subTopic.sub_topic}</Heading>
      <Text size="lg">{subTopic.note[0].Notes_topic}</Text>
      <SyntaxHighlighter
        children={subTopic.note[0].Code_snippet}
        language="cpp"
        style={rainbow}
      />
    </Flex>
  );
};

export default SubtopicDetails;
