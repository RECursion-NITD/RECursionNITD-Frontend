import React from "react";
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
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Flex
        h="8vh"
        bg="#171923"
        alignItems="space-around"
        justifyContent="space-between"
        px={{ base: "1em", md: "2em" }}
        position="fixed"
        width="100%"
        zIndex="5"
      >
        {/* Left Side: Logo and Text */}
        <Flex display="flex" listStyleType="none" margin="0" padding="0">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
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
            <Text fontSize="x-large" fontWeight="bold" color="#ccc">
              <strong>REC</strong>ursion
            </Text>
          </Link>
        </Flex>

        {/* Desktop Menu (visible on desktop) */}
        <Flex
          className="navbar-links"
          display={{ base: "none", md: "flex" }}
          listStyleType="none"
          margin="0"
          padding="0"
        >
          <MenuItem to="/experience">Interview Experiences</MenuItem>
          <MenuItem to="/events">Events</MenuItem>
          <MenuItem to="/get_started">Getting Started</MenuItem>
          <MenuItem to="/team">Team</MenuItem>
          {!user ? (
            <MenuItem to="/login">
              <Button
                onClick={logoutUser}
                variant="solid"
                bg="lightGreen"
                color="black"
                fontWeight="bold"
                borderRadius="8px"
                margin="5px"
                padding="5px"
              >
                Login
              </Button>
            </MenuItem>
          ) : (
            <Button
              onClick={logoutUser}
              variant="solid"
              bg="#ff6c2f"
              color="white"
              fontWeight="bold"
              borderRadius="8px"
              margin="5px"
              padding="5px"
            >
              Logout
            </Button>
          )}
        </Flex>

        {/* Hamburger Menu Icon (visible on mobile) */}
        <IconButton
          color={"whitesmoke"}
          display={{ base: "block", md: "none" }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Menu"
          variant="ghost"
          onClick={toggleMenu}
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
          <VStack spacing="2" mt="5vh">
            <MenuItem to="/experience">Interview Experiences</MenuItem>
            <MenuItem to="/events">Events</MenuItem>
            <MenuItem to="/get_started">Getting Started</MenuItem>
            <MenuItem to="/team">Team</MenuItem>
            {!user ? (
              <MenuItem to="/login">
                <Button
                  onClick={logoutUser}
                  variant="solid"
                  bg="lightGreen"
                  color="black"
                  fontWeight="bold"
                  borderRadius="8px"
                  margin="5px"
                  padding="5px"
                >
                  Login
                </Button>
              </MenuItem>
            ) : (
              <Button
                onClick={logoutUser}
                variant="solid"
                bg="#ff6c2f"
                color="white"
                fontWeight="bold"
                borderRadius="8px"
                margin="5px"
                padding="5px"
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

const MenuItem = ({ to, children }) => (
  <Text>
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "#ccc",
        fontSize: "18px",
        transition: "color 0.3s",
        marginRight: "10px",
        marginBottom: "10px",
      }}
    >
      {children}
    </Link>
  </Text>
);

export default Layout;
