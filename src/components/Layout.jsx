import { Outlet } from "react-router-dom";
import "../App.css";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { user } = useAuth();
  const { logoutUser } = useAuth();
  return (
    <div className="App">
      <h1>RECursion 2022</h1>
      {user && <button onClick={logoutUser}>Logout</button>}
      {user && <p>Hello {user}</p>}
      <Outlet />
    </div>
  );
};

export default Layout;
