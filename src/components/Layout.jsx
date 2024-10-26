import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Collapse,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Footer from "./Footer";

const Layout = () => {
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Change to true when scrolled down 50px, adjust this threshold as needed
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Flex
        h="8vh"
        backdropFilter="auto"
        backdropBlur="15px"
        alignItems="center"
        justifyContent="space-between"
        px={{ base: "1em", md: "2em" }}
        position="fixed"
        width="100%"
        zIndex="40"
        fontFamily="Open Sans"
        bg={isScrolled ? "#191919" : "transparent"} // Toggle background color
        transition="background-color 0.3s" // Smooth transition
      >
        {/* Left Side: Logo and Text */}
        <Flex display="flex" listStyleType="none" margin="0" padding="0">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="https://recursionnitd.in/static/image/logoInverted.png"
              alt="Logo"
              style={{
                marginRight: "10px",
                maxHeight: "5vh",
              }}
            />
            <Text
              fontSize="x-large"
              fontWeight="bold"
              color="#fff"
              fontFamily="Open Sans"
            >
              <strong>REC</strong>ursion
            </Text>
          </Link>
        </Flex>

        {/* Desktop Menu (visible on desktop) */}
        <Flex
          className="navbar-links"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          listStyleType="none"
          margin="0"
          padding="0"
          fontWeight="bold"
        >
          <MenuItem to="/experience" noButton>
            Interview Experiences
          </MenuItem>
          <MenuItem to="/events" noButton>
            Events
          </MenuItem>
          <MenuItem to="/get_started" noButton>
            Getting Started
          </MenuItem>
          <MenuItem to="/team" noButton>
            Team
          </MenuItem>
        </Flex>

        <Flex
          className="navbar-links"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          listStyleType="none"
          margin="0"
          padding="0"
        >
          {!user ? (
            <MenuItem to="/login">
              <Button
                variant="solid"
                bg="transparent"
                color="#58CDFF"
                fontWeight="bold"
                borderRadius="5px"
                margin="5px"
                padding="10px"
                border="2px solid"
                borderColor="#58CDFF"
                _hover={{ bg: "#58CDFF", color: "black" }}
                marginRight="60px"
                fontFamily="Open Sans"
              >
                Login
              </Button>
            </MenuItem>
          ) : (
            <Button
              onClick={logoutUser}
              variant="solid"
              bg="#58CDFF"
              color="black"
              fontWeight="bold"
              borderRadius="5px"
              margin="5px"
              padding="10px"
              marginRight="60px"
              fontFamily="Open Sans"
            >
              Logout
            </Button>
          )}
        </Flex>

        {/* Hamburger Menu Icon (visible on mobile) */}
        <IconButton
          color="whitesmoke"
          display={{ base: "block", md: "none" }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Menu"
          variant="ghost"
          onClick={toggleMenu}
          fontFamily="Open Sans"
        />
      </Flex>

      {/* Collapsible Menu (visible on mobile) */}
      <Collapse in={isOpen} onClick={() => setIsOpen(false)}>
        <Box
          bg="#212121"
          top="8vh"
          bottom="0"
          left="0"
          right="0"
          textAlign="center"
          position="fixed"
          zIndex="10"
        >
          <VStack spacing="4" mt="5vh">
            <MenuItem to="/experience">Interview Experiences</MenuItem>
            <MenuItem to="/events">Events</MenuItem>
            <MenuItem to="/get_started">Getting Started</MenuItem>
            <MenuItem to="/team">Team</MenuItem>
            {!user ? (
              <MenuItem to="/login">
                <Button
                  variant="solid"
                  bg="transparent"
                  color="#58CDFF"
                  fontWeight="bold"
                  borderRadius="5px"
                  border="2px solid"
                  borderColor="#58CDFF"
                  margin="5px"
                  padding="10px"
                  fontFamily="Open Sans"
                >
                  Login
                </Button>
              </MenuItem>
            ) : (
              <Button
                onClick={logoutUser}
                variant="solid"
                bg="#58CDFF"
                color="black"
                fontWeight="bold"
                borderRadius="5px"
                margin="5px"
                padding="10px"
                fontFamily="Open Sans"
              >
                Logout
              </Button>
            )}
          </VStack>
        </Box>
      </Collapse>

      <div className="App">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

// MenuItem component with Open Sans font
const MenuItem = ({ to, children, noButton }) => (
  <Text style={{ marginRight: noButton ? "20px" : "0" }} fontFamily="Open Sans">
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "#fff",
        fontSize: "18px",
        transition: "color 0.3s",
        marginRight: "10px",
        marginBottom: "0",
        fontFamily: "Open Sans",
      }}
    >
      {children}
    </Link>
  </Text>
);

export default Layout;
