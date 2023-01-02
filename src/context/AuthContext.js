import { createContext } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  //   const [user, setUser] = useState(null);
  //   const [authToken, setAuthToken] = useState(null);

  const loginUser = async (formData) => {
    const response = await fetch(
      "http://recursionnitd.pythonanywhere.com/api/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      }
    );
    const data = await response.json();
    console.log("data", data);
  };

  const contextData = {
    loginUser: loginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
