import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Team from "./components/Team";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import Register from "./components/Register";
import Blog from "./components/Blog";
import Experiences from "./components/Experiences";
import AskREC from "./components/AskREC";
import Events from "./components/Events";
import GetStarted from "./components/GetStarted";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes*/}
            <Route path="" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="team" element={<Team />} />
            <Route path="events" element={<Events />} />
            <Route path="get_started" element={<GetStarted />} />

            {/* private routes */}
            <Route element={<RequireAuth />}>
              <Route path="forum" element={<AskREC />} />
              <Route path="blog" element={<Blog />} />
              <Route path="experience" element={<Experiences />} />
            </Route>
          </Route>
          <Route path="*" element=<NotFound /> />
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
