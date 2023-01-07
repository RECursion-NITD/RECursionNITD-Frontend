import { Outlet, Link } from "react-router-dom";
import "../App.css";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { user } = useAuth();
  const { logoutUser } = useAuth();
  return (
    <>
      <div className="Navbar" style={{ backgroundColor: "black" }}>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", margin: "5px" }}
        >
          <h1 style={{ color: "white" }}>RECursion 2022</h1>
        </Link>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "row",
            fontColor: "white",
            margin: "5px",
          }}
        >
          <li>
            <Link
              to="/team"
              style={{ color: "white", textDecoration: "none", margin: "5px" }}
            >
              Team
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              style={{ color: "white", textDecoration: "none", margin: "5px" }}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              style={{ color: "white", textDecoration: "none", margin: "5px" }}
            >
              Events
            </Link>
          </li>
        </ul>

        {user && <button onClick={logoutUser}>Logout</button>}
        {user && <p>Hello {user}</p>}
      </div>
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
