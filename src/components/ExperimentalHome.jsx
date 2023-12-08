import homepageCodeSnippet from "../assets/images/homepageCodeSnippet.png";

import { useEffect, useLayoutEffect, useState } from "react";
import {
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import { getHome } from "../api/home";
import Loader from "./Loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../test.css";
import "../App.css";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const { user } = useAuth();
  const { loading, setLoading } = useLoading();
  const [homeData, setHomeData] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (!user) return;
    toast({
      title: `Welcome ${user?.username}.`,
      position: "top-right",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }, [user]);

  // for gsap animation
  useLayoutEffect(() => {
    gsap.set(".container", { autoAlpha: 1 });

    const animate = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".container01",
          pin: ".headContainer",
          start: "top top",
          end: "bottom 40%",
          scrub: true,
          invalidateOnRefresh: true,
        },
        defaults: { duration: 1, ease: "ease-in" },
      })
      .to(".head", {
        scale: 0.75,
      })
      .to(".head", {
        color: "#E9F841",
        duration: 0.1,
      });

    () => {
      animate.kill();
    };
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    getHome()
      .then((data) => {
        setHomeData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="container headContainer">
        <div className="head">
          <h1
            style={{
              fontWeight: "500",
            }}
          >
            <strong>REC</strong>ursion
          </h1>
        </div>
      </div>

      <div className="container container01"></div>

      <div className="container container02">
        <div className="content">
          <h2
            style={{
              color: "white",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "30px",
            }}
          >
            Programming Community of NIT Durgapur
          </h2>
          <div className="homepageLayout">
            <div className="homepageLeft">
              <p className="homepageCard">
                We are programming community of NIT Durgapur, with focus on
                improving coding culture institute wide by conducting regular
                lectures from beginner to advance topics of programming. Our
                goal is to increase student&apos;s participation in
                inter-collegiate contest like ACM-ICPC and help them get better.
              </p>
              <div className="features">
                <div
                  style={{
                    padding: "1em",
                    margin: "1em",
                    borderRight: "solid white 1px",
                  }}
                >
                  <h1>Have a Ques ? </h1>
                  <Button style={{ color: "black", backgroundColor: "yellow" }}>
                    AskREC
                  </Button>
                </div>
                <div>
                  <h1>New to programming ? </h1>
                  <Button style={{ color: "black", backgroundColor: "yellow" }}>
                    get Started
                  </Button>
                </div>
              </div>
            </div>
            <img
              style={{
                position: "relative",
                transform: "translateY(-1em)",
              }}
              src={homepageCodeSnippet}
              width="400px"
              height="400px"
            />
          </div>

          <p>{homeData?.years_of_experience} years of teaching </p>
          <Menu
            className="menu"
            style={{
              margin: "1em",
              padding: "2em",
              display: "flex",
            }}
          >
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Upcoming Events
            </MenuButton>
            <MenuList>
              {/* {homeData?.upcoming_events.map((event) => (
                <MenuItem key={event.id}>{event.title}</MenuItem>
              ))} */}
              <MenuItem key="1">event.title </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <div className="content2">
        <h2 style={{ color: "white", margin: "2em" }}>Who are we ?</h2>
        <div className="WhoAreWeCard">
          <p style={{ color: "white" }}>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nisl. Nullam condimenlorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
            ultricieslorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam
            nisl, eu tincidunt nisl nisl lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
            nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum
            dolor sit amet, consectetur adipiscing elit. Nullam condimentum,
            nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl
            nisl euismod nilorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nullam condimentum, nisl ut ultricies lacinia, nisl nisl
            aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor sit
            amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
            euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam
            nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nieuismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod ni
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nitum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nisl.
          </p>
        </div>
      </div>

      <div className="content">
        <h2>Who are we ?</h2>
        <div className="whoAreWeCard">
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nisl. Nullam condimenlorem ipsum dolor
            sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
            ultricieslorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam
            nisl, eu tincidunt nisl nisl lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
            nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum
            dolor sit amet, consectetur adipiscing elit. Nullam condimentum,
            nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl
            nisl euismod nilorem ipsum dolor sit amet, consectetur adipiscing
            elit. Nullam condimentum, nisl ut ultricies lacinia, nisl nisl
            aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor sit
            amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
            ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
            euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam
            nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nieuismod nilorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod ni
            lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
            nitum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
            tincidunt nisl nisl euismod nisl.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Home;
