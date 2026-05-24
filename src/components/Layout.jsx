import React, { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Collapse,
  VStack,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem as ChakraMenuItem,
  MenuDivider,
  Avatar,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Footer from "./Footer";
import { getProfile } from "../api/userInfo"; // Added import

const APP_PACKAGE_NAME = 'com.recursionnitd.app';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=' + APP_PACKAGE_NAME;

const Layout = () => {
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
  const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenApp = () => {
    const fallbackUrl = encodeURIComponent(PLAY_STORE_URL);
    
    // Chrome requires a 'scheme' to trigger the intent. 
    // IMPORTANT: For this to work, the RECursion Android app's AndroidManifest.xml MUST have an intent-filter
    // with <category android:name="android.intent.category.BROWSABLE" /> for this scheme.
    const intentUrl = `intent://#Intent;scheme=recursionnitd;package=${APP_PACKAGE_NAME};S.browser_fallback_url=${fallbackUrl};end`;
    
    window.location.href = intentUrl;
  };

  // Enforce Profile Completeness "Jail"
  useEffect(() => {
    const checkProfile = async () => {
      // If no user, we consider profile "complete" for navigation purposes (public access)
      if (!user) {
        setIsProfileComplete(true);
        return;
      }

      // User exists, verify profile
      try {
        const profile = await getProfile();
        const isNameMissing = !profile.name || (typeof profile.name === "string" && profile.name.trim() === "");
        const isCollegeMissing = !profile.college || (typeof profile.college === "string" && profile.college.trim() === "");

        const incomplete = isNameMissing || isCollegeMissing;
        setIsProfileComplete(!incomplete);

        // Redirect if incomplete and trying to go elsewhere
        if (incomplete && location.pathname !== "/profile/edit") {
          toast({
            title: "Profile Incomplete",
            description: "You must complete your profile (Name & College) to continue.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          navigate("/profile/edit", { replace: true });
        }
      } catch (error) {
        console.error("Profile check failed", error);
        // Fallback: If error, maybe keep locked or unlock? 
        // Safer to keep locked or handle gracefully. For now, assume incomplete/error maintains lock if default was false.
        // But if default was false, and api fails, menus never show.
        // Let's assume on error we might want to let them browse or retry.
        // For security/jail, we keeps it closed.
      }
    };
    checkProfile();
  }, [user, location.pathname, navigate, toast]);

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
          display={{ base: "none", lg: "flex" }}
          alignItems="center"
          listStyleType="none"
          margin="0"
          padding="0"
          fontWeight="bold"
        >
          {isProfileComplete && (
            <>
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
            </>
          )}
        </Flex>

        {/* Login Button */}
        <Flex
          className="navbar-links"
          display={{ base: "none", lg: "flex" }}
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
            <>
              <Box marginRight="60px">
                <Menu isOpen={isProfileOpen}>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                    onMouseEnter={onProfileOpen}
                    onMouseLeave={onProfileClose}
                  >
                    <Avatar
                      size="sm"
                      name={user?.username}
                      bg="#58CDFF"
                      color="black"
                    />
                  </MenuButton>
                  <MenuList
                    bg="#212121"
                    borderColor="gray.700"
                    zIndex={50}
                    onMouseEnter={onProfileOpen}
                    onMouseLeave={onProfileClose}
                  >
                    <ChakraMenuItem as={Link} to="/profile/view" _hover={{ bg: "#58CDFF", color: "black" }} bg="#212121" color="white" fontFamily="Open Sans">
                      View Profile
                    </ChakraMenuItem>
                    <ChakraMenuItem as={Link} to="/profile/edit" _hover={{ bg: "#58CDFF", color: "black" }} bg="#212121" color="white" fontFamily="Open Sans">
                      Edit Profile
                    </ChakraMenuItem>
                    <MenuDivider borderColor="gray.600" />
                    <ChakraMenuItem onClick={onLogoutOpen} _hover={{ bg: "#58CDFF", color: "black" }} bg="#212121" color="white" fontFamily="Open Sans">
                      Logout
                    </ChakraMenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </>
          )}
        </Flex>

        {/* Open App CTA (visible on mobile only) */}
        <Button
          display={{ base: "flex", lg: "none" }}
          onClick={handleOpenApp}
          size="sm"
          bg="#58CDFF"
          color="black"
          fontWeight="bold"
          fontFamily="Open Sans"
          borderRadius="20px"
          px={4}
          _hover={{ bg: "#3ab8f0", transform: "scale(1.04)" }}
          _active={{ transform: "scale(0.97)" }}
          transition="all 0.2s"
          aria-label="Open RECursion app"
          id="mobile-open-app-btn"
        >
          Open app
        </Button>

        {/* Hamburger Menu Icon (visible on mobile) */}
        <IconButton
          color="whitesmoke"
          display={{ base: "block", lg: "none" }}
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
            {isProfileComplete && (
              <>
                <MenuItem to="/experience">Interview Experiences</MenuItem>
                <MenuItem to="/events">Events</MenuItem>
                <MenuItem to="/get_started">Getting Started</MenuItem>
                <MenuItem to="/team">Team</MenuItem>
              </>
            )}
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
              <>
                <MenuItem to="/profile/edit" noHoverEffect>
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
                    Edit Profile
                  </Button>
                </MenuItem>
                <MenuItem to="/profile/view" noHoverEffect>
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
                    View Profile
                  </Button>
                </MenuItem>
                <Button
                  onClick={onLogoutOpen}
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
              </>
            )}
          </VStack>
        </Box>
      </Collapse>

      <div className="App">
        <Outlet />
      </div>
      <Footer />

      <AlertDialog
        isOpen={isLogoutOpen}
        leastDestructiveRef={cancelRef}
        onClose={onLogoutClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="#212121" color="white">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onLogoutClose} bg="transparent" border="1px solid #58CDFF" color="#58CDFF" _hover={{ bg: "#58CDFF", color: "black" }}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => {
                logoutUser();
                onLogoutClose();
              }} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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
          className={`relative text-xl w-fit block ${!noHoverEffect
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
