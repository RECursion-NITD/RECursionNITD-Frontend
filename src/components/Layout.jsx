import { Outlet } from "react-router-dom";
import "../App.css";

const Layout = () => {
  return (
    <div className="App">
      <h1>RECursion 2022</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
