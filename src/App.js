import "./App.css";
import Home from "./components/Home";
import ExperimentalHome from "./components/ExperimentalHome";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Team from "./components/Teams/Team";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import Register from "./components/Register";
import Blog from "./components/Blog";
import Experiences from "./components/InterviewExperiences/Experiences";
import DetailedExperiencePage from "./components/InterviewExperiences/DetailedExperiencePage";
import DetailEvent from "./components/Events/DetailEvent";
import AskREC from "./components/AskREC";
import Events from "./components/Events/Events";
import GetStarted from "./components/GetStarted/GetStarted";
import ContentsPage from "./components/GetStarted/ContentsPage";
import NotFound from "./components/NotFound";
import React from "react";
import { LoadingProvider } from "./context/LoadingContext";
import PostExperience from "./components/InterviewExperiences/PostExperience";
import CreateEvent from "./components/Events/CreateEvent";
import RequireMember from "./components/RequireMember";

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
              <Route path="get_started" element={<ContentsPage />} />
              <Route path="get_started/:subtopicId" element={<GetStarted />} />

              {/* private routes */}
              <Route element={<RequireAuth />}>
                <Route path="forum" element={<AskREC />} />
                <Route path="blog" element={<Blog />} />
                <Route path="experience" element={<Experiences />} />
                <Route
                  path="experience/detail/:experienceId"
                  element={<DetailedExperiencePage />}
                />
                <Route path="experience/add" element={<PostExperience />} />
                <Route element={<RequireMember />}>
                  <Route path="events/create" element={<CreateEvent />} />
                </Route>
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
