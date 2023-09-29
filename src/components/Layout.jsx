import { Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import styled from "styled-components";
import "../App.css";

const Navbar = styled.div`
  height: 5vh;
  background-color: #212121;
  display: flex;
  align-items: center; /* Vertically center items */
  justify-content: space-between;
  padding: 2em;
  position: fixed;
  width: 100%;
  z-index: 5;
`;

const NavbarLink = styled(Link)`
  color: #ccc; /* Muted text color */
  text-decoration: none;
  margin: 5px;
  font-size: 18px; /* Adjust font size as needed */
  transition: color 0.3s; /* Smooth color transition on hover */

  &:hover {
    color: white; /* White text color on hover */
  }
`;

const NavbarImage = styled.img`
  height: 5vh;
  margin-right: 10px; /* Add some space between image and text */
`;

const NavbarText = styled.p`
  color: #ccc; /* Muted text color */
  font-size: x-large;
  margin: 0; /* Remove default margin */
  font-weight: bold;
`;

const NavbarList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const NavbarListItem = styled.li`
  margin-right: 10px; /* Add space between list items */
`;

const Layout = () => {
  const { user, logoutUser } = useAuth(); // Destructure both user and logoutUser

  return (
    <>
      <Navbar>
        <NavbarLink
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <NavbarImage
            src="https://recursionnitd.in/static/image/logoInverted.png"
            alt="Logo"
          />
          <NavbarText>
            <strong>REC</strong>ursion
          </NavbarText>
        </NavbarLink>

        <NavbarList className="navbar-links">
          <NavbarListItem>
            <NavbarLink to="/experience">Interview Experiences</NavbarLink>
          </NavbarListItem>
          <NavbarListItem>
            <NavbarLink to="/events">Events</NavbarLink>
          </NavbarListItem>
          <NavbarListItem>
            <NavbarLink to="/get_started">Getting Started</NavbarLink>
          </NavbarListItem>
          <NavbarListItem>
            <NavbarLink to="/team">Team</NavbarLink>
          </NavbarListItem>
          {!user && (
            <NavbarListItem>
              <NavbarLink to="/login">
                <button
                  onClick={logoutUser}
                  style={{
                    background: "lightGreen",
                    color: "black",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    margin: "5px",
                    padding: "5px",
                  }}
                >
                  Login
                </button>
              </NavbarLink>
            </NavbarListItem>
          )}
          {user && (
            <NavbarListItem>
              <button
                onClick={logoutUser}
                style={{
                  background: "#ff6c2f",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  margin: "5px",
                  padding: "5px",
                }}
              >
                Logout
              </button>
            </NavbarListItem>
          )}
        </NavbarList>
      </Navbar>
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
