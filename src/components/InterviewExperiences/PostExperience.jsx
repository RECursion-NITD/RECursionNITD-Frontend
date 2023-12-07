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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { createExperience } from "../../api/experiences";

const PostExperience = () => {
  const [experienceData, setExperienceData] = useState({
    companyName: "",
    year: 2023,
    jobProfile: "",
    roleType: "",
    rounds: 1,
    details: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExperienceData({
      ...experienceData,
      [name]: value,
    });
  };

  const handleYearChange = (value) => {
    setExperienceData({
      ...experienceData,
      year: Number(value),
    });
  };

  const handleRoundChange = (value) => {
    setExperienceData({
      ...experienceData,
      rounds: Number(value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Inside handle Submit");
    console.log(experienceData);
    const  data={
        company:experienceData.companyName,
        year:Number(experienceData.year),
        role_Type:experienceData.roleType,
        no_of_Rounds:Number(experienceData.rounds),
        job_Profile:experienceData.jobProfile,
        interview_Questions:experienceData.details
    }
    console.log(data);
    const response = await createExperience(data);
    console.log(response); 
  };

  return (
    <div className="w-screen text-white" style={{ backgroundColor: "#171923" }}>
      
      <form
        onSubmit={handleSubmit}
        className="w-[90%] lg:w-3/5 border border-white p-4 rounded-lg mt-12" style={{boxShadow: "3px 3px #BDE0FF"}}
      >
        <Heading as="h1" size="lg" marginBottom="4" color="#BDE0FF">
            Interview Experience Form
        </Heading>

        <VStack spacing={4} align="flex-start">
          <FormControl className="flex">
            <FormLabel className="w-1/5" htmlFor="company">Company</FormLabel>
            <Input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter Company Name"
              value={experienceData.companyName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="flex">
            <FormLabel className="w-1/5" htmlFor="year">Year</FormLabel>
            <NumberInput
              onChange={handleYearChange}
              defaultValue={2023}
              className="w-[77%] md:w-[98%]"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper color="white"/>
                <NumberDecrementStepper color="white" />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl className="flex">
            <FormLabel className="w-1/5"htmlFor="job">Job Profile</FormLabel>
            <Input
              type="text"
              id="jobProfile"
              name="jobProfile"
              placeholder="Enter Job Profile"
              value={experienceData.jobProfile}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="flex">
            <FormLabel className="w-1/5"htmlFor="role">Role</FormLabel>
            <Select
              id="roleType"
              name="roleType"
              onChange={handleInputChange}
              value={experienceData.roleType}
              placeholder="Select role"
              style={{ backgroundColor: "#171923",color:"white" }}
            >
              <option value="Internship" style={{ backgroundColor: "#171923",color:"white" }}>Internship</option>
              <option value="Full Time" style={{ backgroundColor: "#171923",color:"white" }}>Full Time</option>
            </Select>
          </FormControl>
          <FormControl className="flex">
            <FormLabel className="w-1/5" htmlFor="rounds">Rounds</FormLabel>
            <NumberInput
              onChange={handleRoundChange}
              defaultValue={1}
              className="w-[77%] md:w-[98%]"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper color="white"/>
                <NumberDecrementStepper color="white" />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl className="flex items-start">
            <FormLabel className="w-1/5 mt-0" htmlFor="details">Details</FormLabel>
            <Textarea
              id="details"
              name="details"
              placeholder="Enter Details"
              value={experienceData.details}
              onChange={handleInputChange}
              size="lg"
              height="150px"
            />
            {/* <ReactMarkdown>{experienceData.details}</ReactMarkdown> */}
          </FormControl>
          <div className="flex w-full justify-center">
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
          </div>
        </VStack>
      </form>
    </div>
  );
};

export default PostExperience;
