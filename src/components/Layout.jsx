import { Outlet, Link } from "react-router-dom";
import "../App.css";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";

const Layout = () => {
  const { user } = useAuth();
  const { logoutUser } = useAuth();
  const { loading } = useLoading();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              height: "5vh",
              backgroundColor: "black",
              display: "flex",
              justifyContent: "space-between",
              padding: "1em",
            }}
          >
            <Link
              to="/"
              style={{ color: "white", textDecoration: "none", margin: "5px" }}
            >
              <p style={{ color: "white", fontSize: "x-large" }}>
                <strong>REC</strong>ursion 2022
              </p>
            </Link>

            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "row",
                width: "50%",
                alignItems: "flex-end",
                fontColor: "white",
                margin: "5px",
              }}
            >
              <li>
                <Link
                  to="/forum"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "5px",
                  }}
                >
                  AskREC
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "5px",
                  }}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/experience"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "5px",
                  }}
                >
                  Interview Experiences
                </Link>
              </li>

              <li>
                <Link
                  to="/events"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "5px",
                  }}
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/get_started"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "5px",
                  }}
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    margin: "5px",
                  }}
                >
                  Team
                </Link>
              </li>
              {!user && (
                <li>
                  <Link
                    to="/login"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      margin: "5px",
                    }}
                  >
                    Login
                  </Link>
                </li>
              )}
              {user && (
                <button onClick={logoutUser}>
                  <span style={{ color: "red", margin: "5px" }}>Logout</span>
                </button>
              )}
            </ul>
          </div>
          <div className="App">
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
