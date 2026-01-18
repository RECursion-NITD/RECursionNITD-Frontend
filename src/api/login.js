import axios from "./axios";

export const login = async (formData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/token/`,
    {
      username: formData.username,
      password: formData.password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
