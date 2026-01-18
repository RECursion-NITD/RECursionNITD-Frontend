/* eslint-disable */
import React from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import msLogo from "../../assets/images/ms-logo.png";
import oracleLogo from "../../assets/images/oracle-logo.png";
import profile from "../../assets/images/profile.png";
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, useToast, HStack } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { approveExperience, rejectExperience } from "../../api/experiences";
import { useState } from "react";
import { getApiError } from "../../utils/getApiError";

const DetailedExperienceCard = ({ experience }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rejectionReason, setRejectionReason] = useState("");
  const toast = useToast();

  const handleApprove = async () => {
    try {
      await approveExperience(experience.id);
      toast({
        title: "Experience Approved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
       toast({
        title: "Error approving experience",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReject = async () => {
    try {
      await rejectExperience(experience.id, rejectionReason);
      toast({
        title: "Changes Requested",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      window.location.reload();
    } catch (error) {
       const errorMessage = getApiError(error);
      toast({
        title: "Error requesting changes",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const getDate = (created_at) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(created_at);
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const dateString = day + " " + month + ", " + year;
    return dateString;
  };
  return (
    <div
      className="mb-0 w-full p-4 text-white bg-[#292929] p-10 mr-0 mt-0 ml-0"
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="text-secondary font-poppins font-semibold text-3xl text-left">
          Interview Experiences
        </h1>

      </div>
      <div className="flex flex-col p-4">
        <div class="bg-[#535353] text-white p-4 rounded-lg font-sans mt-2 mb-2 mr-0 ml-0 w-full">
          <div class="flex justify-between font-semibold text-lg flex">
            <div className="text-left m-0">Company Name: {experience?.company}</div>
            <div className="m-0">No of Rounds: {experience?.no_of_Rounds}</div>
          </div>
          <div class="text-base font-semibold">
            <p className="text-left">Role: {experience?.job_Profile}</p>
            <p className="text-left">Type: {experience?.role_Type}</p>
          </div>
        </div>

        <div className="flex justify-between items-center m-0 mb-2">
          <p className="m-0">Posted by {experience?.user.username} on {getDate(experience?.created_at)}{" "}</p>
          <div class={`font-semibold m-0 ${experience?.verification_Status === "Approved" ? "text-green-500" : "text-yellow-500"}`}>
            {experience?.verification_Status === "Approved" ? "✔️ Verified" : "⏳ Admin Verification Pending"}
          </div>
        </div>
        </div>
      {/* <blockquote
          className="text-onSurface font-sub mt-4"
        >
          {experience?.interview_Questions}
        </blockquote> */}
      <ReactMarkdown
        children={experience?.interview_Questions}
        className="font-Mulish text-lg text-justify p-4"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      />

      <div className="flex justify-end p-4 gap-4">
          {user?.role != 3 && experience?.verification_Status !== "Approved" && (
              <>
              <Button colorScheme="green" onClick={handleApprove}>
                  Accept
              </Button>
              <Button colorScheme="red" onClick={onOpen}>
                  Reject
              </Button>
              </>
          )}
          {user?.username === experience?.user?.username && (
          <Button
              variant="solid"
              bg="#58CDFF"
              color="black"
              fontWeight="bold"
              borderRadius="5px"
              margin="5px"
              padding="10px"
              fontFamily="Open Sans"
              _hover={{ bg: "#46badd" }}
              onClick={() =>
              navigate("/experience/add", {
                  state: { experience: experience, isEdit: true },
              })
              }
          >
              Update
          </Button>
          )}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Changes / Reject</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Enter reason for rejection/changes..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleReject}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div >
  );
};

export default DetailedExperienceCard;
