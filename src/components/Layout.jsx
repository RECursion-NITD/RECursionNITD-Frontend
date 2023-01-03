import { useContext } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import AuthContext from "../context/AuthContext";

const Layout = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <h1>RECursion 2022</h1>
      {user && <p>Hello {user}</p>}
      <Outlet />
    </div>
  );
};

export default Layout;
