import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  HStack,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Avatar,
  Link,
  Spinner,
  Icon,
  useToast,
  Tooltip,
  Select,
} from "@chakra-ui/react";
import {
  FaSearch,
  FaSyncAlt,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { SiCodeforces, SiCodechef } from "react-icons/si";
import {
  getLeaderboard,
  refreshLeaderboard,
  getLeaderboardCooldown,
} from "../../api/leaderboard";
import "./Leaderboard.css";

// Official Codeforces rating & rank color mapping
const getCodeforcesRankStyle = (rank, rating) => {
  const r = (rank || "").toLowerCase();
  const val = Number(rating) || 0;

  if (r.includes("legendary") || r.includes("grandmaster") || val >= 2400) {
    return {
      color: "#FF3333",
      bg: "rgba(255, 51, 51, 0.12)",
      border: "#FF3333",
    };
  }
  if (r.includes("master") || val >= 2100) {
    return {
      color: "#FF8C00",
      bg: "rgba(255, 140, 0, 0.12)",
      border: "#FF8C00",
    };
  }
  if (r.includes("candidate") || val >= 1900) {
    return {
      color: "#AA00AA",
      bg: "rgba(170, 0, 170, 0.12)",
      border: "#AA00AA",
    };
  }
  if (r.includes("expert") || val >= 1600) {
    return {
      color: "#3B82F6",
      bg: "rgba(59, 130, 246, 0.12)",
      border: "#3B82F6",
    };
  }
  if (r.includes("specialist") || val >= 1400) {
    return {
      color: "#03A89E",
      bg: "rgba(3, 168, 158, 0.12)",
      border: "#03A89E",
    };
  }
  if (r.includes("pupil") || val >= 1200) {
    return {
      color: "#22C55E",
      bg: "rgba(34, 197, 94, 0.12)",
      border: "#22C55E",
    };
  }
  return {
    color: "#9CA3AF",
    bg: "rgba(156, 163, 175, 0.12)",
    border: "#6B7280",
  };
};

// Official CodeChef stars & rating color mapping
const getCodeChefStarStyle = (stars, rating) => {
  const s = (stars || "").trim();
  const val = Number(rating) || 0;

  if (s.includes("7★") || val >= 2500) {
    return {
      color: "#DC2626",
      bg: "rgba(220, 38, 38, 0.15)",
      border: "#DC2626",
    };
  }
  if (s.includes("6★") || val >= 2200) {
    return {
      color: "#EA580C",
      bg: "rgba(234, 88, 12, 0.15)",
      border: "#EA580C",
    };
  }
  if (s.includes("5★") || val >= 2000) {
    return {
      color: "#F59E0B",
      bg: "rgba(245, 158, 11, 0.15)",
      border: "#F59E0B",
    };
  }
  if (s.includes("4★") || val >= 1800) {
    return {
      color: "#A855F7",
      bg: "rgba(168, 85, 247, 0.15)",
      border: "#A855F7",
    };
  }
  if (s.includes("3★") || val >= 1600) {
    return {
      color: "#3B82F6",
      bg: "rgba(59, 130, 246, 0.15)",
      border: "#3B82F6",
    };
  }
  if (s.includes("2★") || val >= 1400) {
    return {
      color: "#22C55E",
      bg: "rgba(34, 197, 94, 0.15)",
      border: "#22C55E",
    };
  }
  return {
    color: "#9CA3AF",
    bg: "rgba(156, 163, 175, 0.15)",
    border: "#6B7280",
  };
};

const Leaderboard = () => {
  const [platform, setPlatform] = useState("codeforces");
  const [dataPlatform, setDataPlatform] = useState("codeforces");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [cooldownSec, setCooldownSec] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const toast = useToast();

  // Debounce only search input typing (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch Cooldown status
  const fetchCooldown = useCallback(async () => {
    try {
      const res = await getLeaderboardCooldown();
      if (!res.can_refresh && res.remaining_seconds > 0) {
        setCooldownSec(res.remaining_seconds);
      } else {
        setCooldownSec(0);
      }
    } catch {
      // Ignore cooldown fetch failure
    }
  }, []);

  // Cooldown countdown timer effect
  useEffect(() => {
    fetchCooldown();
  }, [fetchCooldown]);

  useEffect(() => {
    if (cooldownSec <= 0) return;
    const interval = setInterval(() => {
      setCooldownSec((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownSec]);

  // Fetch Standings immediately whenever platform, debouncedSearch, or showInactive changes
  const fetchStandings = useCallback(async (targetPlatform, targetSearch, targetInactive) => {
    setLoading(true);
    try {
      const res = await getLeaderboard({
        platform: targetPlatform,
        search: targetSearch,
        showInactive: targetInactive,
      });
      setData(res.results || []);
      setDataPlatform(targetPlatform);
      setCurrentPage(1);
    } catch (err) {
      toast({
        title: "Error loading leaderboard",
        description:
          err.response?.data?.error || "Could not fetch college standings.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStandings(platform, debouncedSearch, showInactive);
  }, [platform, debouncedSearch, showInactive, fetchStandings]);

  // Manual Refresh Handler
  const handleRefresh = async () => {
    if (cooldownSec > 0 || syncing) return;
    setSyncing(true);
    try {
      const res = await refreshLeaderboard();
      toast({
        title: "Leaderboard Synced!",
        description: res.message || "Updated standings from CF & CC.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setCooldownSec(res.cooldown_seconds || 300);
      fetchStandings(platform, debouncedSearch, showInactive);
    } catch (err) {
      const remaining = err.response?.data?.remaining_seconds;
      if (remaining) {
        setCooldownSec(remaining);
      }
      toast({
        title: "Sync Limited",
        description:
          err.response?.data?.error ||
          "Please wait for the cooldown to finish.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setSyncing(false);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Check if data is synchronized with the selected platform
  const isDataReady = !loading && dataPlatform === platform;

  // Pagination calculations
  const totalItems = isDataReady ? data.length : 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    if (!isDataReady) return [];
    const startIndex = (validCurrentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [data, validCurrentPage, pageSize, isDataReady]);

  // Generate page numbers for pagination controls
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, validCurrentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Box
      className="leaderboard-root"
      minH="100vh"
      bg="#1e1e1e"
      color="#ffffff"
      pt={{ base: "90px", md: "110px" }}
      pb={20}
    >
      <Container maxW="7xl" px={{ base: 3, md: 8 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Heading
            as="h1"
            className="leaderboard-title"
            fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
            fontWeight="900"
            color="#58CDFF"
            letterSpacing="tight"
            mb={3}
          >
            CP Leaderboard
          </Heading>
          <Text
            color="#B3B1AD"
            fontSize={{ base: "sm", md: "lg" }}
            maxW="2xl"
            mx="auto"
          >
            Live college standings of National Institute of Technology, Durgapur
            across Codeforces and CodeChef.
          </Text>
        </Box>

        {/* Controls Bar */}
        <div className="leaderboard-controls-card">
          <div className="leaderboard-controls-flex">
            {/* Left: Platform Switcher */}
            <div className="leaderboard-controls-left">
              <div className="leaderboard-platform-switch">
                <Button
                  size="md"
                  leftIcon={<SiCodeforces />}
                  variant={platform === "codeforces" ? "solid" : "ghost"}
                  bg={platform === "codeforces" ? "#58CDFF" : "transparent"}
                  color={platform === "codeforces" ? "#000000" : "#ffffff"}
                  fontWeight={platform === "codeforces" ? "bold" : "medium"}
                  _hover={{
                    bg:
                      platform === "codeforces"
                        ? "#34aaff"
                        : "#313131",
                  }}
                  borderRadius="md"
                  onClick={() => {
                    if (platform !== "codeforces") {
                      setPlatform("codeforces");
                      setLoading(true);
                      setCurrentPage(1);
                    }
                  }}
                  m="0"
                >
                  Codeforces
                </Button>
                <Button
                  size="md"
                  leftIcon={<SiCodechef />}
                  variant={platform === "codechef" ? "solid" : "ghost"}
                  bg={platform === "codechef" ? "#58CDFF" : "transparent"}
                  color={platform === "codechef" ? "#000000" : "#ffffff"}
                  fontWeight={platform === "codechef" ? "bold" : "medium"}
                  _hover={{
                    bg:
                      platform === "codechef"
                        ? "#34aaff"
                        : "#313131",
                  }}
                  borderRadius="md"
                  onClick={() => {
                    if (platform !== "codechef") {
                      setPlatform("codechef");
                      setLoading(true);
                      setCurrentPage(1);
                    }
                  }}
                  m="0"
                >
                  CodeChef
                </Button>
              </div>
            </div>

            {/* Right: Show Inactive Users Switch + Search Input & Sync Button */}
            <div className="leaderboard-controls-right">
              {/* "Show inactive users" Custom Switch */}
              <div
                className="custom-toggle-container"
                onClick={() => {
                  setShowInactive((prev) => !prev);
                  setCurrentPage(1);
                }}
              >
                <div
                  className={`custom-toggle-switch ${
                    showInactive ? "checked" : ""
                  }`}
                  role="switch"
                  aria-checked={showInactive}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      setShowInactive((prev) => !prev);
                      setCurrentPage(1);
                    }
                  }}
                >
                  <div className="custom-toggle-knob" />
                </div>
                <Text
                  mb="0"
                  ml={3}
                  fontSize="sm"
                  fontWeight="medium"
                  color={showInactive ? "#ffffff" : "#B3B1AD"}
                  userSelect="none"
                  whiteSpace="nowrap"
                >
                  Show inactive users
                </Text>
              </div>

              {/* Search Box */}
              <InputGroup className="leaderboard-search-group" m="0">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} color="#B3B1AD" />
                </InputLeftElement>
                <Input
                  placeholder="Search coder..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  bg="#313131"
                  color="#ffffff"
                  border="1px solid #424242"
                  borderRadius="lg"
                  _placeholder={{ color: "#B3B1AD" }}
                  _hover={{ borderColor: "#58CDFF" }}
                  _focus={{
                    borderColor: "#58CDFF",
                    boxShadow: "0 0 0 1px #58CDFF",
                  }}
                  m="0"
                />
              </InputGroup>

              {/* Dedicated Refresh Button with Cooldown */}
              <Tooltip
                label={
                  cooldownSec > 0
                    ? `Next refresh available in ${formatTime(cooldownSec)}`
                    : "Fetch live updates from Codeforces & CodeChef"
                }
                hasArrow
                placement="top"
              >
                <Button
                  className="leaderboard-sync-btn"
                  leftIcon={<Icon as={FaSyncAlt} />}
                  isLoading={syncing}
                  loadingText="Syncing..."
                  isDisabled={cooldownSec > 0}
                  bg={cooldownSec > 0 ? "#313131" : "#58CDFF"}
                  color={cooldownSec > 0 ? "#B3B1AD" : "#000000"}
                  fontWeight="semibold"
                  border={
                    cooldownSec > 0
                      ? "1px solid #424242"
                      : "1px solid #58CDFF"
                  }
                  _hover={{
                    bg: cooldownSec > 0 ? "#313131" : "#34aaff",
                  }}
                  borderRadius="lg"
                  px={4}
                  onClick={handleRefresh}
                  m="0"
                >
                  {cooldownSec > 0
                    ? `Cooldown (${formatTime(cooldownSec)})`
                    : "Sync Standings"}
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Standings Table: Loading Spinner shown cleanly while switching */}
        {!isDataReady ? (
          <Flex justify="center" align="center" minH="340px">
            <Flex direction="column" align="center" gap={4}>
              <Spinner size="xl" color="#58CDFF" thickness="4px" />
              <Text color="#B3B1AD" fontSize="sm">
                Loading {platform === "codeforces" ? "Codeforces" : "CodeChef"} standings...
              </Text>
            </Flex>
          </Flex>
        ) : data.length === 0 ? (
          <Box
            textAlign="center"
            py={16}
            bg="#212121"
            borderRadius="xl"
            border="1px dashed #424242"
          >
            <Icon as={FaSearch} boxSize={10} color="#B3B1AD" mb={4} />
            <Heading size="md" color="#ffffff" mb={2}>
              No coders found
            </Heading>
            <Text color="#B3B1AD" mb={6}>
              {showInactive
                ? "Try searching with another name or handle."
                : "No active coders found. Try enabling 'Show inactive users'."}
            </Text>
            <Button
              variant="outline"
              color="#58CDFF"
              borderColor="#58CDFF"
              _hover={{ bg: "#58CDFF", color: "#000000" }}
              onClick={() => {
                setSearch("");
                setShowInactive(true);
              }}
            >
              Reset Filters
            </Button>
          </Box>
        ) : (
          <div className="leaderboard-table-card">
            <div className="leaderboard-table-wrapper">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th className="leaderboard-col-rank">
                      RANK
                    </th>
                    <th className="leaderboard-col-coder">
                      CODER
                    </th>
                    <th className="leaderboard-col-rating">
                      RATING & RANK
                    </th>
                    <th className="leaderboard-col-profile">
                      PROFILE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((coder) => {
                    const rating =
                      platform === "codeforces"
                        ? coder.codeforces_rating
                        : coder.codechef_rating;

                    const handle =
                      platform === "codeforces"
                        ? coder.codeforces_handle
                        : coder.codechef_handle;

                    const rankBadge =
                      platform === "codeforces"
                        ? coder.codeforces_rank
                        : coder.codechef_stars;

                    const profileUrl =
                      platform === "codeforces"
                        ? `https://codeforces.com/profile/${coder.codeforces_handle}`
                        : `https://www.codechef.com/users/${coder.codechef_handle}`;

                    const isUserActive =
                      platform === "codeforces"
                        ? coder.codeforces_is_active
                        : coder.codechef_is_active;

                    // Platform specific rank styling
                    const rankStyle =
                      platform === "codeforces"
                        ? getCodeforcesRankStyle(coder.codeforces_rank, rating)
                        : getCodeChefStarStyle(coder.codechef_stars, rating);

                    return (
                      <tr
                        key={coder.id}
                        style={{
                          opacity: !isUserActive ? 0.6 : 1,
                        }}
                      >
                        {/* 1. Rank (Center Aligned) */}
                        <td className="leaderboard-col-rank">
                          <Flex align="center" justify="center" m="0">
                            {coder.rank === 1 ? (
                              <Badge
                                bg="rgba(245, 158, 11, 0.2)"
                                color="#F59E0B"
                                border="1px solid #F59E0B"
                                px={2.5}
                                py={0.5}
                                borderRadius="md"
                                fontWeight="bold"
                                m="0"
                              >
                                🥇 #1
                              </Badge>
                            ) : coder.rank === 2 ? (
                              <Badge
                                bg="rgba(148, 163, 184, 0.2)"
                                color="#E2E8F0"
                                border="1px solid #94A3B8"
                                px={2.5}
                                py={0.5}
                                borderRadius="md"
                                fontWeight="bold"
                                m="0"
                              >
                                🥈 #2
                              </Badge>
                            ) : coder.rank === 3 ? (
                              <Badge
                                bg="rgba(180, 83, 9, 0.2)"
                                color="#FDBA74"
                                border="1px solid #B45309"
                                px={2.5}
                                py={0.5}
                                borderRadius="md"
                                fontWeight="bold"
                                m="0"
                              >
                                🥉 #3
                              </Badge>
                            ) : (
                              <Text fontWeight="semibold" color="#B3B1AD" m="0">
                                #{coder.rank}
                              </Text>
                            )}
                          </Flex>
                        </td>

                        {/* 2. Coder Info (Strictly Left Aligned) */}
                        <td className="leaderboard-col-coder">
                          <Flex align="center" justify="flex-start" gap={{ base: "10px", md: "14px" }} m="0">
                            <Avatar
                              size="sm"
                              src={coder.avatar_url}
                              name={coder.name}
                              border="1px solid #424242"
                              m="0"
                              flexShrink={0}
                            />
                            <Flex direction="column" align="flex-start" justify="center" m="0">
                              <Flex align="center" gap="8px" m="0" flexWrap="wrap">
                                <Text
                                  fontWeight="semibold"
                                  color="#ffffff"
                                  m="0"
                                  textAlign="left"
                                  lineHeight="1.3"
                                  fontSize={{ base: "sm", md: "md" }}
                                >
                                  {coder.name}
                                </Text>
                                {!isUserActive && (
                                  <Badge
                                    fontSize="10px"
                                    bg="#313131"
                                    color="#B3B1AD"
                                    border="1px solid #424242"
                                    borderRadius="md"
                                    px={1.5}
                                    m="0"
                                  >
                                    Inactive
                                  </Badge>
                                )}
                              </Flex>
                              <Text
                                fontSize="xs"
                                color="#B3B1AD"
                                m="0"
                                textAlign="left"
                                lineHeight="1.3"
                              >
                                @{handle}
                              </Text>
                            </Flex>
                          </Flex>
                        </td>

                        {/* 3. Rating & Rank (Center Aligned) */}
                        <td className="leaderboard-col-rating">
                          <Flex align="center" justify="center" gap="10px" m="0" flexWrap="wrap">
                            <Text
                              fontWeight="bold"
                              color={rankStyle.color}
                              fontSize={{ base: "sm", md: "md" }}
                              m="0"
                            >
                              {rating > 0 ? rating : "Unrated"}
                            </Text>
                            {rankBadge && (
                              <Badge
                                bg={rankStyle.bg}
                                color={rankStyle.color}
                                border={`1px solid ${rankStyle.border}`}
                                fontSize="xs"
                                px={2}
                                py={0.5}
                                borderRadius="md"
                                m="0"
                              >
                                {rankBadge}
                              </Badge>
                            )}
                          </Flex>
                        </td>

                        {/* 4. Profile Link (Center Aligned) */}
                        <td className="leaderboard-col-profile">
                          <Flex justify="center" align="center" m="0">
                            <Link href={profileUrl} isExternal m="0">
                              <Button
                                size="xs"
                                variant="outline"
                                color="#58CDFF"
                                borderColor="#58CDFF"
                                _hover={{
                                  bg: "#58CDFF",
                                  color: "#000000",
                                }}
                                rightIcon={<FaExternalLinkAlt />}
                                m="0"
                              >
                                View
                              </Button>
                            </Link>
                          </Flex>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalItems > 0 && (
              <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align="center"
                p={4}
                bg="#191919"
                borderTop="1px solid #313131"
                gap={4}
                m="0"
              >
                {/* Items Range & Page Size */}
                <HStack spacing={3} m="0" justify={{ base: "center", md: "flex-start" }} w={{ base: "100%", md: "auto" }}>
                  <Text fontSize="sm" color="#B3B1AD" m="0">
                    Showing{" "}
                    <Text as="span" fontWeight="semibold" color="#ffffff">
                      {(validCurrentPage - 1) * pageSize + 1}
                    </Text>{" "}
                    to{" "}
                    <Text as="span" fontWeight="semibold" color="#ffffff">
                      {Math.min(validCurrentPage * pageSize, totalItems)}
                    </Text>{" "}
                    of{" "}
                    <Text as="span" fontWeight="semibold" color="#ffffff">
                      {totalItems}
                    </Text>{" "}
                    coders
                  </Text>
                  <Select
                    size="xs"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    w="80px"
                    bg="#313131"
                    color="#ffffff"
                    borderColor="#424242"
                    borderRadius="md"
                    m="0"
                  >
                    <option value={15} style={{ background: "#212121" }}>
                      15 / pg
                    </option>
                    <option value={30} style={{ background: "#212121" }}>
                      30 / pg
                    </option>
                    <option value={50} style={{ background: "#212121" }}>
                      50 / pg
                    </option>
                  </Select>
                </HStack>

                {/* Page Navigation Buttons */}
                <HStack spacing={1} m="0" justify={{ base: "center", md: "flex-end" }} w={{ base: "100%", md: "auto" }} flexWrap="wrap">
                  <IconButton
                    size="sm"
                    icon={<FaAngleDoubleLeft />}
                    aria-label="First page"
                    isDisabled={validCurrentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    variant="ghost"
                    color="#B3B1AD"
                    _hover={{ bg: "#313131", color: "#ffffff" }}
                    m="0"
                  />
                  <IconButton
                    size="sm"
                    icon={<FaChevronLeft />}
                    aria-label="Previous page"
                    isDisabled={validCurrentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    variant="ghost"
                    color="#B3B1AD"
                    _hover={{ bg: "#313131", color: "#ffffff" }}
                    m="0"
                  />

                  {getPageNumbers().map((pageNum) => (
                    <Button
                      key={pageNum}
                      size="sm"
                      variant={
                        validCurrentPage === pageNum ? "solid" : "ghost"
                      }
                      bg={
                        validCurrentPage === pageNum
                          ? "#58CDFF"
                          : "transparent"
                      }
                      color={
                        validCurrentPage === pageNum ? "#000000" : "#B3B1AD"
                      }
                      fontWeight={
                        validCurrentPage === pageNum ? "bold" : "normal"
                      }
                      _hover={{
                        bg:
                          validCurrentPage === pageNum
                            ? "#34aaff"
                            : "#313131",
                        color:
                          validCurrentPage === pageNum
                            ? "#000000"
                            : "#ffffff",
                      }}
                      onClick={() => setCurrentPage(pageNum)}
                      minW="32px"
                      px={2}
                      m="0"
                    >
                      {pageNum}
                    </Button>
                  ))}

                  <IconButton
                    size="sm"
                    icon={<FaChevronRight />}
                    aria-label="Next page"
                    isDisabled={validCurrentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(totalPages, prev + 1)
                      )
                    }
                    variant="ghost"
                    color="#B3B1AD"
                    _hover={{ bg: "#313131", color: "#ffffff" }}
                    m="0"
                  />
                  <IconButton
                    size="sm"
                    icon={<FaAngleDoubleRight />}
                    aria-label="Last page"
                    isDisabled={validCurrentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    variant="ghost"
                    color="#B3B1AD"
                    _hover={{ bg: "#313131", color: "#ffffff" }}
                    m="0"
                  />
                </HStack>
              </Flex>
            )}
          </div>
        )}
      </Container>
    </Box>
  );
};

export default Leaderboard;
