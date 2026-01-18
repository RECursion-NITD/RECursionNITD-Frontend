/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Heading,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";

import { getProfile, editProfile } from "../../api/userInfo";
import { getApiError } from "../../utils/getApiError";


const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    college: "",
    branch: "",
    codechef: "",
    codeforces: "",
    spoj: "",
    hackerrank: "",
    image: null,
  });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        const userData = {
          name: data.name ? data.name : "",
          college: data.college ? data.college : "",
          branch: data.dept ? data.dept : "",
          codechef: data.url_CodeChef ? data.url_CodeChef : "",
          codeforces: data.url_Codeforces ? data.url_Codeforces : "",
          spoj: data.url_SPOJ ? data.url_SPOJ : "",
          hackerrank: data.url_HackerRank ? data.url_HackerRank : "",
          image: data.image ? data.image : "",
        }
        setProfileData(userData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    try {
      const data = new FormData();
      data.append("image", imageFile);

      // Silent submit
      const response = await editProfile(data);

      if (response && response.image) {
        setProfileData((prevData) => ({
          ...prevData,
          image: response.image,
        }));

        toast({
          title: "Image Uploaded",
          description: "Your profile image has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMessage = getApiError(error);
      toast({
        title: "Upload Failed",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation for Name and College
    if (!profileData.name || profileData.name.trim() === "" || !profileData.college || profileData.college.trim() === "") {
      toast({
        title: "Required Fields",
        description: "Please provide your Name and College.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {

      const data = new FormData();
      data.append("name", profileData.name);
      data.append("college", profileData.college);
      data.append("dept", profileData.branch);
      data.append("url_CodeChef", profileData.codechef);
      data.append("url_Codeforces", profileData.codeforces);
      data.append("url_SPOJ", profileData.spoj);
      data.append("url_HackerRank", profileData.hackerrank);

      if (profileData.image instanceof File) {
        data.append("image", profileData.image);
      }


      const response = await editProfile(data);


      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Navigate to home page
      navigate('/');

    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage = getApiError(error);
      toast({
        title: "Update Failed",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-screen text-white" style={{ backgroundColor: "#171923" }}>

      <form
        onSubmit={handleSubmit}
        className="w-[90%] lg:w-3/5 border border-white p-4 rounded-lg mt-12" style={{ boxShadow: "3px 3px #BDE0FF", marginTop: "70px", marginBottom: "70px" }}
      >
        <Heading as="h1" size="lg" marginBottom="4" color="#BDE0FF">
          Edit Profile
        </Heading>

        <VStack spacing={4} align="flex-start">
          <FormControl className="flex">
            <FormLabel className="w-[30%] md:w-1/5" htmlFor="name">
              Name <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Input width={{ base: '70%', md: '80%' }}
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={profileData.name}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-[30%] md:w-1/5" htmlFor="college">
              College <span style={{ color: "red" }}>*</span>
            </FormLabel>
            <Input width={{ base: '70%', md: '80%' }}
              type="text"
              id="college"
              name="college"
              placeholder="Name of College"
              value={profileData.college}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-[30%] md:w-1/5" htmlFor="branch">Branch</FormLabel>
            <Input width={{ base: '70%', md: '80%' }}
              type="text"
              id="branch"
              name="branch"
              placeholder="Department/Branch"
              value={profileData.branch}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-[30%] md:w-1/5" htmlFor="codechef">CodeChef</FormLabel>
            <Input width={{ base: '70%', md: '80%' }}
              type="text"
              id="codechef"
              name="codechef"
              placeholder="Your Codechef URL"
              value={profileData.codechef}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-[30%] md:w-1/5" htmlFor="codeforces">Codeforces</FormLabel>
            <Input width={{ base: '70%', md: '80%' }}
              type="text"
              id="codeforces"
              name="codeforces"
              placeholder="Your Codeforces URL"
              value={profileData.codeforces}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-[30%] md:w-1/5" htmlFor="spoj">SPOJ</FormLabel>
            <Input width={{ base: '70%', md: '80%' }}
              type="text"
              id="spoj"
              name="spoj"
              placeholder="Your SPOJ URL"
              value={profileData.spoj}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl className="flex">
            <FormLabel className="w-[30%] md:w-1/5" htmlFor="hackerrank">HackerRank</FormLabel>
            <Input width={{ base: '70%', md: '80%' }}
              type="text"
              id="hackerrank"
              name="hackerrank"
              placeholder="Your Hackerrank URL"
              value={profileData.hackerrank}
              onChange={handleInputChange}
            />
          </FormControl>

          <div className="flex w-full flex-col md:flex-row">

            <FormControl className="flex w-2/5 mb-3 items-center justify-start">
              <FormLabel className="w-2/5 md:w-2/6 ml-0" htmlFor="currentImage">Current Image</FormLabel>
              {profileData.image !== "" && (
                <Button
                  as="a"
                  href={profileData.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 mt-0"
                >
                  View
                </Button>
              )}
            </FormControl>

            {/* <FormControl className="flex items-center">
          <FormLabel htmlFor="clearImage" className="ml-4">
            Clear
          </FormLabel>
          <Input 
            type="checkbox"
            id="clearImage"
            name="clearImage"
            onChange={(e) => {
              if (e.target.checked) {
                setProfileData((prevData) => ({
                  ...prevData,
                  image: "", // Clear the image when checkbox is checked
                }));
              }
            }}
          />
        </FormControl> */}

            <FormControl className="flex w-3/5">
              <FormLabel className="w-[62%] md:w-2/5" htmlFor="fileInput">Change Image</FormLabel>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                style={{ backgroundColor: "#171923", color: "white" }}
              />
            </FormControl>

          </div>

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

export default EditProfile;
