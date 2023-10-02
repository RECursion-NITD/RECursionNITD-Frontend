import { Container, Text, Heading } from '@chakra-ui/layout'
import React from 'react'

const Heading = () => {
  return (
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
  )
}

export default Heading