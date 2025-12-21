/* eslint-disable */
import algo_zenith from "../assets/images/algo_zenith.png";
import cloudsploit from "../assets/images/cloudsploit.png";
import codechef from "../assets/images/codechef.png";
import digital_ocean from "../assets/images/digital_ocean.png";
import hackerrank from "../assets/images/hackerrank.png";
import hiredive from "../assets/images/hiredive.jpg";
import jetbrain from "../assets/images/jetbrain.svg.png";
import nutrichef from "../assets/images/nutrichef.png";
import workat_tech from "../assets/images/workat-tech.png";
import mgif from "../assets/images/xRemoved.gif";
import teaching from "../assets/images/500teaching.svg";
import bulb from "../assets/images/bulb.svg";
import angularr from "../assets/images/angular.svg";
import people from "../assets/images/people.svg";

import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Image,
  useToast,
  HStack,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import FlipCard from "./FlipCard";
import CarouselWithContent from "./CarouselHome";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { getHome } from "../api/home";
import "../test.css";
import "../App.css";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const { user } = useAuth();
  const { loading, setLoading } = useLoading();
  const [homeData, setHomeData] = useState(null);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const toast = useToast();

  const StackComponent = useBreakpointValue({ base: VStack, md: HStack });
  const screenWidth = window.innerWidth;

  return loading ? (
    <Loader />
  ) : (
    <div className="App">
      <div className="main-name w-full mt-10">
        <div className="flex justify-center md:justify-start w-full">
          <svg
            className="xl:ml-28 lg:ml-12 mt-16 ml-28 sm-28"
            style={{
              display: "block",
              maxWidth: "100%", // Allows SVG to scale down responsively
              height: "auto", // Maintains aspect ratio based on width
            }}
            width="714" // Initial width, acts as max-width on larger screens
            viewBox="0 0 714 130" // Ensures consistent scaling
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.244 98V36.4H36.964C40.8947 36.4 44.444 37.2507 47.612 38.952C50.8387 40.6533 53.3613 43 55.18 45.992C56.9987 48.9253 57.908 52.2693 57.908 56.024C57.908 59.896 56.9987 63.3867 55.18 66.496C53.3613 69.5467 50.868 71.952 47.7 73.712C44.532 75.472 40.9533 76.352 36.964 76.352H23.5V98H9.244ZM43.388 98L27.724 70.192L43.036 67.992L60.46 98H43.388ZM23.5 64.912H35.644C37.1693 64.912 38.4893 64.5893 39.604 63.944C40.7773 63.24 41.6573 62.272 42.244 61.04C42.8893 59.808 43.212 58.4 43.212 56.816C43.212 55.232 42.86 53.8533 42.156 52.68C41.452 51.448 40.4253 50.5093 39.076 49.864C37.7853 49.2187 36.2013 48.896 34.324 48.896H23.5V64.912ZM71.0331 98V36.4H113.977V49.16H85.5531V85.24H114.857V98H71.0331ZM78.0731 72.744V60.6H110.017V72.744H78.0731ZM155.736 98.88C151.101 98.88 146.818 98.1173 142.888 96.592C139.016 95.008 135.642 92.808 132.768 89.992C129.893 87.1173 127.664 83.744 126.08 79.872C124.554 75.9413 123.792 71.6293 123.792 66.936C123.792 62.36 124.613 58.136 126.256 54.264C127.898 50.392 130.157 47.048 133.032 44.232C135.965 41.3573 139.397 39.128 143.328 37.544C147.317 35.96 151.658 35.168 156.352 35.168C159.285 35.168 162.16 35.5493 164.976 36.312C167.792 37.0747 170.402 38.2187 172.808 39.744C175.272 41.2107 177.384 42.9707 179.144 45.024L169.992 55.496C168.76 54.2053 167.44 53.0907 166.032 52.152C164.682 51.1547 163.186 50.392 161.544 49.864C159.901 49.336 158.141 49.072 156.264 49.072C153.917 49.072 151.688 49.512 149.576 50.392C147.522 51.2133 145.704 52.416 144.12 54C142.594 55.5253 141.392 57.4027 140.512 59.632C139.632 61.8613 139.192 64.3547 139.192 67.112C139.192 69.8107 139.632 72.2747 140.512 74.504C141.392 76.6747 142.624 78.552 144.208 80.136C145.792 81.72 147.698 82.9227 149.928 83.744C152.216 84.5653 154.738 84.976 157.496 84.976C159.373 84.976 161.162 84.712 162.864 84.184C164.565 83.656 166.12 82.952 167.528 82.072C168.994 81.1333 170.285 80.0773 171.4 78.904L178.616 90.344C177.149 91.9867 175.184 93.4533 172.72 94.744C170.314 96.0347 167.616 97.0613 164.624 97.824C161.69 98.528 158.728 98.88 155.736 98.88ZM203.285 98.968C199.824 98.968 196.861 98.2347 194.397 96.768C191.992 95.2427 190.115 93.072 188.765 90.256C187.475 87.44 186.829 84.0667 186.829 80.136V51.272H200.997V78.2C200.997 80.0773 201.291 81.6907 201.877 83.04C202.464 84.3893 203.344 85.4453 204.517 86.208C205.691 86.912 207.099 87.264 208.741 87.264C209.973 87.264 211.088 87.0587 212.085 86.648C213.141 86.2373 214.021 85.68 214.725 84.976C215.488 84.2133 216.075 83.3627 216.485 82.424C216.896 81.4267 217.101 80.3413 217.101 79.168V51.272H231.269V98H217.981L217.365 88.408L220.005 87.352C219.301 89.5813 218.128 91.576 216.485 93.336C214.843 95.0373 212.877 96.416 210.589 97.472C208.301 98.4693 205.867 98.968 203.285 98.968ZM243.818 98V51.272H257.194L257.81 66.496L255.17 63.592C255.874 61.0693 257.018 58.8107 258.602 56.816C260.245 54.8213 262.152 53.2373 264.322 52.064C266.493 50.8907 268.81 50.304 271.274 50.304C272.33 50.304 273.298 50.392 274.178 50.568C275.117 50.744 275.968 50.9493 276.73 51.184L272.858 66.76C272.213 66.3493 271.333 66.0267 270.218 65.792C269.162 65.4987 268.048 65.352 266.874 65.352C265.584 65.352 264.381 65.5867 263.266 66.056C262.152 66.4667 261.213 67.0827 260.45 67.904C259.688 68.7253 259.072 69.6933 258.602 70.808C258.192 71.9227 257.986 73.184 257.986 74.592V98H243.818ZM299.617 98.88C295.041 98.88 290.993 98.1467 287.473 96.68C284.012 95.2133 281.255 93.248 279.201 90.784L287.737 83.392C289.556 85.2107 291.609 86.56 293.897 87.44C296.185 88.2613 298.356 88.672 300.409 88.672C301.231 88.672 301.964 88.584 302.609 88.408C303.255 88.232 303.783 87.9973 304.193 87.704C304.663 87.352 305.015 86.9707 305.249 86.56C305.484 86.0907 305.601 85.5627 305.601 84.976C305.601 83.8027 305.073 82.8933 304.017 82.248C303.489 81.9547 302.609 81.6027 301.377 81.192C300.145 80.7813 298.561 80.312 296.625 79.784C293.868 79.08 291.463 78.2587 289.409 77.32C287.415 76.3227 285.772 75.1787 284.481 73.888C283.308 72.656 282.399 71.3067 281.753 69.84C281.108 68.3147 280.785 66.6133 280.785 64.736C280.785 62.5653 281.284 60.6 282.281 58.84C283.337 57.08 284.716 55.5547 286.417 54.264C288.177 52.9733 290.172 52.0053 292.401 51.36C294.689 50.656 297.036 50.304 299.441 50.304C302.023 50.304 304.487 50.5973 306.833 51.184C309.18 51.7707 311.351 52.592 313.345 53.648C315.399 54.704 317.217 55.9653 318.801 57.432L311.409 65.704C310.353 64.7067 309.151 63.8267 307.801 63.064C306.511 62.2427 305.161 61.5973 303.753 61.128C302.345 60.6587 301.055 60.424 299.881 60.424C299.001 60.424 298.209 60.512 297.505 60.688C296.86 60.8053 296.303 61.04 295.833 61.392C295.364 61.6853 295.012 62.0667 294.777 62.536C294.543 62.9467 294.425 63.4453 294.425 64.032C294.425 64.6187 294.572 65.176 294.865 65.704C295.217 66.232 295.687 66.672 296.273 67.024C296.86 67.376 297.799 67.7867 299.089 68.256C300.38 68.6667 302.14 69.1947 304.369 69.84C307.127 70.6027 309.503 71.4533 311.497 72.392C313.492 73.3307 315.076 74.4453 316.249 75.736C317.188 76.7333 317.892 77.9067 318.361 79.256C318.831 80.5467 319.065 81.9547 319.065 83.48C319.065 86.472 318.215 89.1413 316.513 91.488C314.871 93.776 312.583 95.5947 309.649 96.944C306.716 98.2347 303.372 98.88 299.617 98.88ZM328.228 98V51.272H342.308V98H328.228ZM335.268 42.032C332.628 42.032 330.545 41.416 329.02 40.184C327.553 38.8933 326.82 37.0747 326.82 34.728C326.82 32.616 327.582 30.8853 329.108 29.536C330.633 28.1867 332.686 27.512 335.268 27.512C337.908 27.512 339.961 28.1573 341.428 29.448C342.894 30.68 343.628 32.44 343.628 34.728C343.628 36.8987 342.865 38.6587 341.34 40.008C339.873 41.3573 337.849 42.032 335.268 42.032ZM377.537 98.88C372.668 98.88 368.326 97.824 364.513 95.712C360.758 93.6 357.766 90.7253 355.537 87.088C353.366 83.4507 352.281 79.2853 352.281 74.592C352.281 69.8987 353.366 65.7333 355.537 62.096C357.766 58.4587 360.758 55.584 364.513 53.472C368.326 51.36 372.668 50.304 377.537 50.304C382.406 50.304 386.718 51.36 390.473 53.472C394.286 55.584 397.278 58.4587 399.449 62.096C401.62 65.7333 402.705 69.8987 402.705 74.592C402.705 79.2853 401.62 83.4507 399.449 87.088C397.278 90.7253 394.286 93.6 390.473 95.712C386.718 97.824 382.406 98.88 377.537 98.88ZM377.537 86.736C379.649 86.736 381.526 86.208 383.169 85.152C384.812 84.096 386.102 82.6587 387.041 80.84C387.98 79.0213 388.42 76.9387 388.361 74.592C388.42 72.2453 387.98 70.1627 387.041 68.344C386.102 66.4667 384.812 65 383.169 63.944C381.526 62.888 379.649 62.36 377.537 62.36C375.425 62.36 373.518 62.888 371.817 63.944C370.174 65 368.884 66.4667 367.945 68.344C367.006 70.1627 366.566 72.2453 366.625 74.592C366.566 76.9387 367.006 79.0213 367.945 80.84C368.884 82.6587 370.174 84.096 371.817 85.152C373.518 86.208 375.425 86.736 377.537 86.736ZM411.912 98V51.272H425.288L425.728 60.776L422.912 61.832C423.557 59.72 424.701 57.8133 426.344 56.112C428.045 54.352 430.069 52.944 432.416 51.888C434.763 50.832 437.227 50.304 439.808 50.304C443.328 50.304 446.291 51.0373 448.696 52.504C451.101 53.912 452.92 56.0533 454.152 58.928C455.384 61.744 456 65.2053 456 69.312V98H441.832V70.456C441.832 68.5787 441.568 67.024 441.04 65.792C440.512 64.56 439.691 63.6507 438.576 63.064C437.52 62.4187 436.2 62.1253 434.616 62.184C433.384 62.184 432.24 62.3893 431.184 62.8C430.128 63.152 429.219 63.7093 428.456 64.472C427.693 65.176 427.077 65.9973 426.608 66.936C426.197 67.8747 425.992 68.9013 425.992 70.016V98H419.04C417.397 98 415.989 98 414.816 98C413.643 98 412.675 98 411.912 98Z"
              fill="#58CDFF"
            />
          </svg>
        </div>
      </div>
      <div className="main-part flex flex-col md:flex-row justify-between w-full">
        <div
          className="left-content mt-0 w-full md:w-6/12 px-4 md:px-0"
          style={{
            color: "white",
            fontSize: "27px",
            textAlign: "left",
          }}
        >
          <div className="sub-title font-bold text-center md:text-left md:text-[27px] text-md">
            The Official Programming Community of NIT Durgapur
          </div>
          <div className="details-title text-lg md:text-2xl mt-4 md:mt-10 text-center md:text-left">
            We are programming community of NIT Durgapur, with focus on
            improving coding culture institute wide by conducting regular
            lectures from beginner to advance topics of programming. Our goal is
            to increase student's participation in inter-collegiate contest like
            ACM-ICPC and help them get better.
          </div>
          <div className="first-button mt-12 hidden md:block">
            <Link to="/get_started" className="flex">
              <button
                type="button"
                class="flex items-center text-white bg-[#2B8BB5] hover:bg-[#205F7A] focus:ring-4 focus:ring-[#2B8BB5] font-medium rounded-lg text-xl px-7 py-3 me-2 mb-2 dark:bg-[#2B8BB5] dark:hover:bg-[#205F7A] focus:outline-none dark:focus:ring-[#2B8BB5]"
              >
                <div>Get Started</div>
                <div>
                  <svg
                    width="2em"
                    height="1.3em"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="right-content">
          <img
            src={mgif}
            alt="RECursion"
            style={{
              width: "300px",
              height: "300px",
            }}
          />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="who-are-we p-10 mt-20 w-full"
      >
        <h1 className="text-white font-mullish font-extrabold md:text-[36px] text-[24px]">
          WHO ARE WE
        </h1>
      </motion.div>
      <FlipCard></FlipCard>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="our-activities p-10 mt-20 w-full"
      >
        <h1 className="text-white font-mullish font-extrabold md:text-[36px] text-[24px] ">
          OUR ACTIVITIES
        </h1>
        <CarouselWithContent></CarouselWithContent>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="our-activities p-10 mt-3 w-full"
      >
        <h1 className="text-white font-mullish font-extrabold md:text-[36px] text-[24px]">
          SO FAR WE HAVE WITNESSED
        </h1>
        <div className="outer-div flex flex-col md:flex-row text-white mt-10">
          <div className="inner-div-1 flex flex-col items-center text-center mb-8 md:mb-0">
            <img src={teaching} alt="Teaching" className="w-36 h-36" />
            <div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold">594+</p>
              <p className="text-lg">hours of teaching</p>
            </div>
          </div>
          <div className="inner-div-2 flex flex-col items-center text-center mb-8 md:mb-0">
            <img src={bulb} alt="Experience" className="w-36 h-36" />
            <div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold">10+</p>
              <p className="text-lg">years of experience</p>
            </div>
          </div>
          <div className="inner-div-3 flex flex-col items-center text-center mb-8 md:mb-0">
            <img src={angularr} alt="Contests" className="w-36 h-36" />
            <div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold">69+</p>
              <p className="text-lg">Online/Offline Contests</p>
            </div>
          </div>
          <div className="inner-div-4 flex flex-col items-center text-center mb-8 md:mb-0">
            <img src={people} alt="Users" className="w-36 h-36" />
            <div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold">
                2000+
              </p>
              <p className="text-lg">Users</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="our-activities p-10 mt-32 w-10/12 mb-12"
      >
        <h1 className="text-white font-mullish font-extrabold md:text-[36px] text-[24px]">
          OUR PAST SPONSORS
        </h1>
        <div className="outer-sponsor-div mt-10">
          <div className="line-1 flex flex-col md:flex-row w-full">
            <a
              href="https://www.hackerrank.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-[160px] max-h-[160px] mx-auto md:mx-0 mb-10 md:mb-0" // Add mb-4 for bottom margin on small screens
                src={hackerrank}
                alt="HackerRank"
              />
            </a>
            <a
              href="https://cloudsploit.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-[160px] max-h-[160px] mx-auto md:mx-0 mb-10 md:mb-0"
                src={cloudsploit}
                alt="CloudSploit"
              />
            </a>
            <a
              href="https://www.codechef.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-[160px] max-h-[160px] mx-auto md:mx-0 mb-10 md:mb-0"
                src={codechef}
                alt="CodeChef"
              />
            </a>
            <a
              href="https://workat.tech/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-[160px] max-h-[160px] mx-auto md:mx-0 mb-10 md:mb-0"
                src={workat_tech}
                alt="WorkAt Tech"
              />
            </a>
            <a
              href="https://www.facebook.com/hiredive/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-[160px] max-h-[160px] mx-auto md:mx-0 mb-10 md:mb-0"
                src={hiredive}
                alt="HireDive"
              />
            </a>
          </div>
          <div className="line-2 flex flex-col md:flex-row">
            <a
              href="https://www.facebook.com/nutrichef.ie/?ref=search&__tn__=%2Cd%2CP-R&eid=ARDTDJ4hXrAW-2WMWQ8pJF8H6bGOJwbca2ee0kDmWC8cbSwVJ7RA1F-upYN4dNK66eWp-9HvxWlsJcKY"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-[160px] max-h-[160px] mx-auto md:mx-0 mb-10 md:mb-0"
                src={nutrichef}
                alt="Nutrichef"
              />
            </a>
            <a
              href="https://www.jetbrains.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-[160px] max-h-[160px] mx-auto md:mx-0 mb-10 md:mb-0"
                src={jetbrain}
                alt="JetBrain"
              />
            </a>
            <a
              href="https://algozenith.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-[160px] max-h-[160px] mx-auto md:mx-0 mb-10 md:mb-0"
                src={algo_zenith}
                alt="Algo Zenith"
              />
            </a>
            <a
              href="https://www.digitalocean.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="sponsorImg ml-4 max-w-[160px] max-h-[160px] mx-auto md:mx-0 mb-10 md:mb-0"
                src={digital_ocean}
                alt="Digital Ocean"
              />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
