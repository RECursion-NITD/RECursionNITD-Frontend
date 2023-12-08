/* eslint-disable */
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Heading,
  Select,
  VStack,
  Textarea,
  Button,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { createExperience } from "../../api/experiences";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { createEvent } from "../../api/events";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    eventType: "",
    targetYear: "",
    eventLink: "",
    venue: "",
    startTime:"",
    endTime:"",
    image:null,
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setEventData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Inside handle Submit");
    console.log(eventData);
    const  data={
        title:eventData.title,
        event_type:eventData.eventType,
        target_year:eventData.targetYear,
        link:eventData.eventLink,
        start_time:eventData.startTime,
        end_time:eventData.endTime,
        description:eventData.description,
        image:eventData.image,
        venue:eventData.venue,

    }
    console.log(data);
    const response = await createEvent(data);
    console.log(response); 
  };

  return (
    <div className="w-screen text-white" style={{ backgroundColor: "#171923" }}>
      
      <form
        onSubmit={handleSubmit}
        className="w-[90%] lg:w-3/5 border border-white p-4 rounded-lg mt-12" style={{boxShadow: "3px 3px #BDE0FF",marginTop:"70px",marginBottom:"70px"}}
      >
        <Heading as="h1" size="lg" marginBottom="4" color="#BDE0FF">
            Event Form
        </Heading>

        <VStack spacing={4} align="flex-start">
          <FormControl className="flex">
            <FormLabel className="w-1/5" htmlFor="company">Title</FormLabel>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Event Title"
              value={eventData.title}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-1/5"htmlFor="role">Event Type</FormLabel>
            <Select
              id="eventType"
              name="eventType"
              onChange={handleInputChange}
              value={eventData.eventType}
              placeholder="Select role"
              style={{ backgroundColor: "#171923",color:"white" }}
            >
              <option value="Class" style={{ backgroundColor: "#171923",color:"white" }}>Class</option>
              <option value="Contest" style={{ backgroundColor: "#171923",color:"white" }}>Contest</option>
              <option value="Event" style={{ backgroundColor: "#171923",color:"white" }}>Event</option>
            </Select>
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-1/5"htmlFor="role">Target Year</FormLabel>
            <Select
              id="targetYear"
              name="targetYear"
              onChange={handleInputChange}
              value={eventData.targetYear}
              placeholder="Select role"
              style={{ backgroundColor: "#171923",color:"white" }}
            >
              <option value="First Year" style={{ backgroundColor: "#171923",color:"white" }}>First Year</option>
              <option value="Second Year" style={{ backgroundColor: "#171923",color:"white" }}>Second Year</option>
              <option value="First and Second Year" style={{ backgroundColor: "#171923",color:"white" }}>First and Second Year</option>
              <option value="NIT Durgapur" style={{ backgroundColor: "#171923",color:"white" }}>NIT Durgapur</option>
              <option value="Global Participants" style={{ backgroundColor: "#171923",color:"white" }}>Global Participants</option>
            </Select>
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-1/5" htmlFor="company">Link</FormLabel>
            <Input
              type="text"
              id="eventLink"
              name="eventLink"
              placeholder="Enter Event Link (Optional)"
              value={eventData.eventLink}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-1/5" htmlFor="company">Venue</FormLabel>
            <Input
              type="text"
              id="venue"
              name="venue"
              placeholder="Enter Online or Specific Venue Name"
              value={eventData.venue}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-1/5" htmlFor="datetime">Start Time</FormLabel>
            <Input
            id="startTime"
            name="startTime"
            type="datetime-local"
            value={eventData.startTime}
            onChange={handleInputChange}
            style={{ backgroundColor: "#171923", color: "white" }}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-1/5" htmlFor="datetime">End Time</FormLabel>
            <Input
            id="endTime"
            name="endTime"
            type="datetime-local"
            value={eventData.endTime}
            onChange={handleInputChange}
            style={{ backgroundColor: "#171923", color: "white" }}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-1/5" htmlFor="fileInput">Image</FormLabel>
            <Input
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
            style={{ backgroundColor: "#171923", color: "white" }}
            />
        </FormControl>

          <FormControl className="flex flex-col items-start">
           
           <div className="flex justify-start items-center">
             <FormLabel className="mt-0" htmlFor="description">
             Description
             </FormLabel>
           </div>
           <div className="w-full flex flex-col md:flex-row items-center justify-center">
             <Textarea
               id="description"
               name="description"
               placeholder="Enter Description"
               value={eventData.description}
               onChange={handleInputChange}
               size="lg"
               height="150px"
               width={{ base: "100%", md: "50%" }}
             />
             <div className="w-full md:w-1/2 flex flex-col items-start justify-center border border-white rounded-lg mx-2 mt-4 md:mt-0">
               <Box w="100%">
                 <Heading as="h5" size="sm" textAlign="center" h="100%">
                   Preview
                 </Heading>
                 <Box borderBottom="1px solid white" />
               </Box>
               <div className="w-full h-[130px] text-left">
                 <ReactMarkdown
                   children={eventData.description}
                   className="font-sub text-md lg:text-lg ml-2 mt-2"
                   remarkPlugins={[remarkGfm]}
                   rehypePlugins={[rehypeRaw]}
                 />
               </div>
             </div>
           </div>
         </FormControl>

          <div className="flex w-full justify-center">
          <Button type="submit" colorScheme="blue">
            Save
          </Button>
          </div>
        </VStack>
      </form>
    </div>
  );
};

export default CreateEvent;
