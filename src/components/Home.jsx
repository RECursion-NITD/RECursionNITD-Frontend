import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import "../App.css";

function Home() {
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (!user) return;
    toast({
      title: `Welcome ${user?.username}.`,
      position: "top-right",
      status: "success",
      duration: 2500,
      isClosable: false,
    });
  }, [user]);

  return (
    <div className="App">
      <div className="heading">
        <h1>
          <strong>REC</strong>ursion 2023
        </h1>
      </div>
      <div className="content">
        <h4>Programming Community of NIT Durgapur</h4>

        <p>
          We are programming community of NIT Durgapur, with focus on improving
          coding culture institute wide by conducting regular lectures from
          beginner to advance topics of programming. Our goal is to increase
          student&apos;s participation in inter-collegiate contest like ACM-ICPC
          and help them get better.
        </p>
      </div>
      <div className="about"></div>
      <div className="content2">
        <h2 style={{ color: "white", margin: "2em" }}>Who are we ?</h2>

        <p style={{ color: "white" }}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nisl. Nullam condimenlorem ipsum dolor sit
          amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricieslorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
          nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
          euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
          nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nilorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
          nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
          euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
          nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nilorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
          nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
          euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
          nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nieuismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod ni
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod nitum,
          nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl
          nisl euismod nisl.
        </p>
      </div>
      <div className="content">
        <h2>Who are we ?</h2>

        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nisl. Nullam condimenlorem ipsum dolor sit
          amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricieslorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
          nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
          euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
          nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nilorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
          nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
          euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
          nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nilorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam condimentum, nisl ut ultricies lacinia, nisl
          nisl aliquam nisl, eu tincidunt nisl nisl euismod nilorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nullam condimentum, nisl ut
          ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl
          euismod nilorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nullam condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl,
          eu tincidunt nisl nisl euismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod
          nilorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          condimentum, nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu
          tincidunt nisl nisl euismod nieuismod nilorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nullam condimentum, nisl ut ultricies
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod ni
          lacinia, nisl nisl aliquam nisl, eu tincidunt nisl nisl euismod nitum,
          nisl ut ultricies lacinia, nisl nisl aliquam nisl, eu tincidunt nisl
          nisl euismod nisl.
        </p>
      </div>
    </div>
  );
}
export default Home;
