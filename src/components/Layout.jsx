import React, { useState, useEffect } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
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
  const [activeLink, setActiveLink] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
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
          {/* Render each link with the MenuItem component */}
          <MenuItem
            to="/experience"
            isActive={activeLink === "/experience"}
            onClick={() => setActiveLink("/experience")}
          >
            Interview Experiences
          </MenuItem>
          <MenuItem
            to="/events"
            isActive={activeLink === "/events"}
            onClick={() => setActiveLink("/events")}
          >
            Events
          </MenuItem>
          <MenuItem
            to="/get_started"
            isActive={activeLink === "/get_started"}
            onClick={() => setActiveLink("/get_started")}
          >
            Getting Started
          </MenuItem>
          <MenuItem
            to="/team"
            isActive={activeLink === "/team"}
            onClick={() => setActiveLink("/team")}
          >
            Team
          </MenuItem>
        </Flex>

        {/* Login Button */}
        <Flex
          className="navbar-links"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          listStyleType="none"
          margin="0"
          padding="0"
        >
          {!user ? (
            <MenuItem to="/login" noHoverEffect>
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
            {/* Same links as above */}
            <MenuItem to="/experience">Interview Experiences</MenuItem>
            <MenuItem to="/events">Events</MenuItem>
            <MenuItem to="/get_started">Getting Started</MenuItem>
            <MenuItem to="/team">Team</MenuItem>
            {!user ? (
              <MenuItem to="/login" noHoverEffect>
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

const MenuItem = ({ to, children, isActive, onClick, noHoverEffect }) => {
  return (
    <Text
      mr="20px"
      fontFamily="Open Sans"
      position="relative"
      onClick={onClick}
    >
      <NavLink
        to={to}
        style={({ isActive: routeIsActive }) => ({
          textDecoration: "none",
          color: routeIsActive ? "#58CDFF" : "#fff",
        })}
      >
        <Text
          as="span"
          className={`relative text-xl w-fit block ${
            !noHoverEffect
              ? isActive
                ? "after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#58CDFF] after:w-full after:scale-x-100"
                : "after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#ffffff] after:w-full after:scale-x-0 hover:after:scale-x-100"
              : ""
          } after:transition after:duration-300 after:origin-center`}
          fontSize="18px"
          transition="color 0.3s"
          _hover={{
            color: isActive ? "#58CDFF" : "#ffffff",
          }}
        >
          {children}
        </Text>
      </NavLink>
    </Text>
  );
};

export default Layout;
