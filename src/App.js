import "./App.css";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <h1>RECursion 2022</h1>
        <Routes>
          <Route element={<App />} path="/"></Route>
          <Route element={<Login />} path="/login"></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
