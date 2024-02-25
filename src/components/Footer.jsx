import rocket from "../assets/images/rocket.png";
import { Image } from "@chakra-ui/react";
import "../App.css";

const Footer = () => {
  return (
    <div
      className="content6 mt-20"
      style={{
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <footer
        className="section footer-classic context-dark "
        style={{
          background:
            "linear-gradient(135deg, #3e4446 22%, rgba(255,0,0,0) 10%), linear-gradient(135deg, #2d3436 90%, #3e4446 1%), linear-gradient(45deg, #353b48 95%, rgba(0,0,255,0) 30%)",
          width: "100%",
        }}
      >
        <a
          id="goTop"
          style={{
            textAlign: "center",
          }}
        >
          <div
            className="circle"
            onClick={() => {
              window.scrollTo(0, -1000000);
            }}
          >
            <Image
              src={rocket}
              className="mt-1"
              alt="go Top"
              onClick={() => {
                window.scrollTo(0, -1000000);
              }}
            ></Image>
          </div>
        </a>
        <div
          style={{
            display: "flex",
            flerxDirection: "row",
            flexWrap: "wrap",
            padding: "0",
            justifyContent: "center",
            margin: "0",
            transform: "translateX(-2%)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column", // Display items below each other in mobile view
              padding: "20px", // Add space around the content
              textAlign: "center", // Center text
              justifyContent: "center", // Center content horizontally
              margin: "10px 0", // Add space around the container
            }}
          >
            <div className="col-md-4 m-0 d-flex">
              <h2>
                <strong>Contacts</strong>
              </h2>
              <dl className="contact-list">
                <div>Address:</div>
                <div className="flex mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="18"
                    viewBox="0 0 576 512"
                    className="mr-0"
                  >
                    <path
                      fill="#ffffff"
                      d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                    />
                  </svg>
                  <a>NIT Durgapur, Durgapur, W.B.</a>
                </div>
              </dl>
              <dl className="contact-list">
                <dt>Email:</dt>
                <dd className="flex mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                    className="mr-0"
                  >
                    <path
                      fill="#ffffff"
                      d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
                    />
                  </svg>
                  <a href="mailto:recursion.nit@gmail.com">
                    recursion.nit@gmail.com
                  </a>
                </dd>
              </dl>
              <dl className="contact-list">
                <dt>Phones:</dt>
                <dd className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z"
                    />
                  </svg>
                  <a href="tel:+919475738842">
                    {" "}
                    Akshay A Baiju: +919475738842{" "}
                  </a>
                </dd>
              </dl>
            </div>
          </div>
          <br></br>
          {/* <hr style={{ flex: 1, color: "ffffff", fontWeight: "bold" }}></hr> */}
          <br></br>

          <div
            style={{
              display: "flex",
              flexDirection: "column", // Display items below each other in mobile view
              padding: "20px", // Add space around the content
              textAlign: "center", // Center text
              justifyContent: "center", // Center content horizontally
              margin: "20px 5em", // Add space around the container
            }}
          >
            <div className="col-md-4 col-xl-5 m-0 d-flex">
              <div className="pr-xl-4">
                <strong>Contribute to this community</strong>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "fit-content",
                  }}
                >
                  <a
                    className="px-5"
                    href="https://www.facebook.com/recursion.nit/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="36"
                      width="26"
                      viewBox="0 0 512 512"
                      className="mx-0"
                    >
                      <path
                        fill="#ffffff"
                        d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                      />
                    </svg>
                  </a>
                  <a
                    className="px-5"
                    href="https://github.com/RECursion-NITD"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="36"
                      width="25.5"
                      viewBox="0 0 496 512"
                      className="mx-0"
                    >
                      <path
                        fill="#ffffff"
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                      />
                    </svg>
                  </a>
                </div>
                <br />
                <strong className="flex">
                  Developed & designed with &nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#f0474f"
                      d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                    />
                  </svg>
                  &nbsp; by &nbsp;
                  <a href="/team" style={{ textDecoration: "none" }}>
                    Web Team 24-25
                  </a>
                </strong>
                <p className="rights">
                  <span>© </span>
                  <span className="copyright-year">
                    2016 - {new Date().getFullYear()}
                  </span>
                  <span> RECursion</span>
                  <span>. </span>
                  <span>All Rights Reserved.</span>
                </p>
              </div>
            </div>
          </div>
          <br></br>
          {/* <hr style={{ flex: 1, color: "ffffff", fontWeight: "bold" }}></hr> */}
          <br></br>

          <div
            style={{
              display: "flex",
              flexDirection: "column", // Display items below each other in mobile view
              padding: "20px", // Add space around the content
              textAlign: "center", // Center text
              justifyContent: "center", // Center content horizontally
              margin: "10px 0", // Add space around the container
            }}
          >
            <div className="col-md-4 col-xl-3 m-0  d-flex">
              <h2 className="ml-0">
                <strong>Links:</strong>
              </h2>
              <ul className="nav-list ml-1">
                {/* <li>
          <a href="/list_questions" style={{ textDecoration: "none" }}>
            AskREC
          </a>
        </li>
        <li>
          <a href="/list_blogs" style={{ textDecoration: "none" }}>
            Blog
          </a>
        </li> */}
                <li>
                  <a href="/events" style={{ textDecoration: "none" }}>
                    Events
                  </a>
                </li>
                <li>
                  <a href="/get_started" style={{ textDecoration: "none" }}>
                    Get Started
                  </a>
                </li>
                {/* <li>
          <a href="/faculty" style={{ textDecoration: "none" }}>
            Faculty Advisors
          </a>
        </li> */}
                <li>
                  <a href="/team" style={{ textDecoration: "none" }}>
                    Team
                  </a>
                </li>
                <li>
                  <a href="/experience" style={{ textDecoration: "none" }}>
                    Interview Experiences
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
