import "./App.css";
import Home from "./components/Home";
import ExperimentalHome from "./components/ExperimentalHome";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Team from "./components/Team";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import Register from "./components/Register";
import Blog from "./components/Blog";
import Experiences from "./components/Experiences";
import DetailExperience from "./components/DetailExperience";
import DetailEvent from "./components/DetailEvent";
import AskREC from "./components/AskREC";
import Events from "./components/Events";
import GetStarted from "./components/GetStarted";
import NotFound from "./components/NotFound";
import React from "react";
import { LoadingProvider } from "./context/LoadingContext";

function App() {
  return (
    <>
      <LoadingProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* public routes*/}
              <Route path="home" element={<Home />} />
              <Route path="" element={<ExperimentalHome />} />
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
                <Route
                  path="experience/detail/:experienceId"
                  element={<DetailExperience />}
                />
              </Route>
              <Route
                path="events/detail/:eventId"
                element={<DetailEvent />}
              ></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </LoadingProvider>
    </>
  );
}
export default App;
