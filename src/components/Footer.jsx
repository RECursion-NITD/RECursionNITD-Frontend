import rocket from "../assets/images/rocket.png";
import { Image } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
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
        className="section footer-classic context-dark"
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
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="circle">
            <Image src={rocket} className="mt-1" alt="Go to top" />
          </div>
        </a>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
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
              flexDirection: "column",
              padding: "20px",
              textAlign: "center",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            {/* <div className="col-md-4 m-0 d-flex">
              <h2>
                <strong>Contacts</strong>
              </h2>
              <dl className="contact-list">
                <dd className="flex mx-auto">
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
                  <span>NIT Durgapur, Durgapur, W.B.</span>
                </dd>
              </dl>
              <dl className="contact-list">
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
                  <a href="tel:+919475738842">Akshay A Baiju: +919475738842</a>
                </dd>
              </dl>
            </div> */}
            <div>
              <h2 style={{ margin: "5px" }}>
                <strong>Contacts</strong>
              </h2>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaMapMarkerAlt style={{ margin: "5px" }} size={25} />
                <span>NIT Durgapur, Durgapur, W.B.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IoIosMail style={{ margin: "5px" }} size={25} />
                <a href="mailto:recursion.nit@gmail.com">
                  recursion.nit@gmail.com
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaPhoneAlt style={{ margin: "5px" }} size={25} />
                <a href="tel:+919475738842" style={{ marginLeft: "5px" }}>
                  Akshay A Baiju: +919475738842
                </a>
              </div>
            </div>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              textAlign: "center",
              justifyContent: "center",
              margin: "20px 5em",
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
                        d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256c0 128.1 93.6 233.9 216 252.2V327.7H150v-71.7h66v-55.6c0-65.4 39-101.5 98.7-101.5c28.6 0 58.5 5.1 58.5 5.1V187h-33c-32.6 0-42.8 20.3-42.8 41v50h73l-11.6 71.7H298v180.5C420.4 489.9 512 384.1 512 256z"
                      />
                    </svg>
                  </a>
                  <a
                    className="px-5"
                    href="https://www.linkedin.com/company/recursion-nitdgp/mycompany/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="36"
                      width="36"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M100.28 448H7.4V148.9h92.88zm-46.44-342C24.12 106 0 81.8 0 53.22A53.23 53.23 0 1 1 53.23 106a53 53 0 0 1 .61 0zm394.19 342h-92.68V302.4c0-34.7-12.8-58.4-44.9-58.4-24.5 0-39 16.5-45.4 32.4-2.3 5.5-2.8 13.2-2.8 20.9V448H169.8s1.2-263.6 0-290.9h92.68v41.2c-1.7 2.6-4.2 5.3-5.6 7.8h5.6v-7.8c12.3-19 34.2-46.2 83.4-46.2 60.9 0 106.4 39.7 106.4 125.2V448z"
                      />
                    </svg>
                  </a>
                </div>
                <p style={{ color: "white" }}>
                  Follow us on our social media handles.
                </p>
                <p className="text-xs" style={{ marginTop: "20px" }}>
                  Designed and developed by Recursion NITDGP Team. <br />
                  All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="footer-seperator" />
      </footer>
    </div>
  );
};

export default Footer;
