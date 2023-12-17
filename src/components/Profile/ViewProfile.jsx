/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, Image, Link, Icon } from "@chakra-ui/react";
import { FaUniversity, FaLeanpub, FaClock } from "react-icons/fa";
import { getProfile } from "../../api/userInfo";
import codechefIcon from '../../assets/images/codechefIcon.png'
import codeforcesIcon from '../../assets/images/codeforcesIcon.svg'
import hackerrankIcon from '../../assets/images/hackerrankIcon.png'
import spojIcon from '../../assets/images/spojIcon.svg'
import Loader from "../Loader";

const ViewProfile = () => {

  const formatDate = (dateTimeString) => {
      const date = new Date(dateTimeString);
      const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
      };
      return date.toLocaleString('en-US', options);
  };

  const [profileData, setProfileData] = useState({
      name: "",
      username: "",
      college: "",
      branch: "",
      codechef: "",
      codeforces: "",
      spoj: "",
      hackerrank: "",
      image: null,
      createdAt: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfileInfo = async () =>{
    setIsLoading(true);
    const data = await getProfile();
    console.log(data);
    const userData = {
      name: data.name,
      username: data.user.username,
      college: data.college,
      branch: data.dept,
      codechef: data.url_CodeChef,
      codeforces: data.url_Codeforces,
      spoj: data.url_SPOJ,
      hackerrank: data.url_HackerRank,
      image: data.image,
      createdAt: data.created_at,
    };
    setProfileData(userData);
    setIsLoading(false);
  }
  
  useEffect(() => {
    fetchProfileInfo();
},[]);
  

if(!isLoading){
  return (
    <Box className="h-screen w-full flex items-center justify-center" pt={12}>
      
      <Box
        mx="auto"
        rounded="lg"
        overflow="hidden"
        bg="#BDE0FF"
        boxShadow="lg"
        className="w-[90%] md:w-2/5"
      >
        <Box borderBottom="1px" borderColor="gray.600" px={4}>
          <Flex direction="column" alignItems="center" my={4}>
            <Image
              className="h-32 w-32 rounded-full border-4 border-white"
              src={profileData?.image}
              alt="Profile Photo"
            />
            <Box textAlign="center" py={2}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                {profileData?.name}
              </Text>
              <Text as="h5" fontSize="sm" color="gray.500">
                @{profileData?.username}
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box borderBottom="1px" borderColor="gray.600" px={4} py={4}>
          <Flex gap={2} color="gray.800" mb={4} className="flex items-center justify-center">
            <FaUniversity className="ml-0 mr-0" />
            <Text>
              {profileData?.college}
            </Text>
          </Flex>
          <Flex gap={2} color="gray.800" mb={4} className="flex items-center justify-center">
            <FaLeanpub  className="ml-0 mr-0" />
            <Text>
              {profileData?.branch}
            </Text>
          </Flex>
          <Flex gap={2} color="gray.800" mb={4} className="flex items-center justify-center">
            <FaClock className="ml-0 mr-0" />
            <Text>
            {formatDate(profileData?.createdAt)}
            </Text>
          </Flex>
        </Box>

        <Box borderBottom="1px" borderColor="gray.600" px={4}>
          <Flex direction="column" alignItems="center" my={4}>
            <Box className="flex flex-col items-center justify-center w-full" py={2}>

              <Flex className="flex items-center justify-center w-full">
                      
                {profileData.codechef && (
                    <Link className="transition-transform transform-gpu hover:scale-110" href={profileData.codechef} isExternal>
                        <Image src={codechefIcon} alt="CodeChef" boxSize={12} mr={3} />
                    </Link>
                )}
                {profileData.codeforces && (
                    <Link className="transition-transform transform-gpu hover:scale-110" href={profileData.codeforces} isExternal>
                      <Image src={codeforcesIcon} alt="Codeforces" boxSize={12} mr={3} />
                    </Link>
                )}
                {profileData.hackerrank && (
                    <Link className="transition-transform transform-gpu hover:scale-110" href={profileData.hackerrank} isExternal>
                        <Image src={hackerrankIcon} alt="HackerRank" boxSize={12} mr={3} />
                    </Link>
                )}
                {profileData.spoj && (
                    <Link className="transition-transform transform-gpu hover:scale-110" href={profileData.spoj} isExternal>
                    <Image src={spojIcon} alt="SPOJ" boxSize={12} mr={3} />
                </Link>
                )}
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
else{
  return <Loader/>
}
};

export default ViewProfile;
