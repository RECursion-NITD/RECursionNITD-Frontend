import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Team from "./components/Team";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes*/}
            <Route path="login" element={<Login />} />
            <Route path="team" element={<Team />} />

            {/* private routes */}
            <Route element={<RequireAuth />}>
              <Route path="" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
