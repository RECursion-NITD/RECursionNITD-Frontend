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
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: "5px",
        backgroundImage: "fixed",
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
            <div>
              <h2 style={{ margin: "5px", fontSize: "1.5rem" }}>
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
                <strong style={{ fontSize: "1.5rem" }}>
                  Contribute to this community
                </strong>
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
                        d="M100.28 448H7.4V148.9h92.88zm-46.44-342C24.12 106 0 81.8 0 53.22A53.23 53.23 0 1 1 53.23 106a53 53 0 0 1 .61 0zm394.19 342h-92.68V302.4c0-34.7-12.8-58.4-44.9-58.4-24.5 0-39 16.5-45.4 32.4-2.3 5.5-2.8 13.2-2.8 20.9V448H169.8s1.2-263.6 0-290.9h92.68v41.2c-1.7 2.6-4.2 5.3-5.6 7.8h5.6v-7.8c12.3-19 34.2-46.2 83.4-46.2c60.9 0 106.4 39.7 106.4 125.2V448z"
                      />
                    </svg>
                  </a>
                </div>
                <p style={{ color: "white" }}>
                  Follow us on our social media handles.
                </p>
                <p className="text-xs" style={{ marginTop: "20px" }}>
                  {/* Designed and developed by Recursion NITDGP Team. <br />
                  All rights reserved. */}
                </p>
                <p className="rights">
                  <strong>
                    Developed & designed with ❤️ by Web Team 24-25
                  </strong>
                  <br />
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
        </div>
        <hr className="footer-seperator" />
      </footer>
    </div>
  );
};

export default Footer;
