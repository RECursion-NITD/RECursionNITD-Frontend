// import {
//   Heading,
//   Image,
//   Link,
//   Text,
//   Card,
//   CardBody,
//   Stack,
//   Flex,
// } from "@chakra-ui/react";
// import { FaLinkedin } from "react-icons/fa";
// const AlumniCard = ({ alumni }) => (
//   <Card
//     // direction={{ base: "column", sm: "row" }}
//     w="400px"
//     h="150px"
//     // p="50px"
//     m="10px"
//     display="flex"
//     flexDirection="row"
//     overflow="hidden"
//     variant="outline"
//     bg="whiteAlpha.200"
//     border="solid"
//     borderColor="white"
//     borderWidth="1px"
//     // boxShadow="2px 2px 4px #BDE0FF"
//     _hover={{ transform: "scale(1.05)", transition: "ease-in 0.3s" }}
//     mb="15px"
//   >
//     <Image
//       objectFit="cover"
//       // maxW={{ base: "100%", sm: "200px" }}
//       src={alumni.image}
//       alt={alumni.name}
//       width="40%"
//     />

//     <Stack width="60%">
//       <CardBody fontSize={{ base: "15px", md: "25px", lg: "15px" }}>
//         <Heading color="#add8e6" size="md">
//           {alumni.name}
//         </Heading>

//         <Text color="white" py="2">
//           B.Tech. in {alumni.branch}
//         </Text>
//         <Link
//           href={alumni.url_LinkedIn}
//           target="_blank"
//           rel="noopener noreferrer"
//           color="blue.500"
//           fontSize="sm"
//           display="flex"
//           alignItems="center"
//         >
//           {/* <FaLinkedin style={{ marginRight: "0.5rem", alignItems:"center"}} /> LinkedIn Profile */}
//           <Flex alignItems="center">
//             <FaLinkedin style={{ marginRight: "0.5rem" }} />
//             <span>LinkedIn Profile</span>
//           </Flex>
//         </Link>
//       </CardBody>
//     </Stack>
//   </Card>
// );

// export default AlumniCard;
import { FaLinkedin } from "react-icons/fa";

const AlumniCard = ({ alumni }) => (
  <div className="flex w-full sm:w-[300px] md:w-[400px] h-[160px] m-2 overflow-hidden border border-white rounded-lg bg-white bg-opacity-20 hover:scale-105 transition-transform ease-in-out duration-300 shadow-md">
    <img
      src={alumni.image}
      alt={alumni.name}
      className="object-cover w-1/3 sm:w-1/2 h-full"
    />
    <div className="w-2/3 sm:w-3/5 p-2 sm:p-3 flex flex-col justify-center space-y-1">
      <h2 className="text-sm sm:text-lg text-white font-mulish font-semibold">
        {alumni.name}
      </h2>

      <p className="text-base sm:text-lg text-white">
        B.Tech. in {alumni.branch}
      </p>

      <a
        href={alumni.url_LinkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-xs sm:text-sm flex items-center hover:text-blue-400"
      >
        <FaLinkedin className="ml-7" />
        <span>LinkedIn Profile</span>
      </a>
    </div>
  </div>
);

export default AlumniCard;
