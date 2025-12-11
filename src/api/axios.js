import axios from "axios";

const api =
  process.env.REACT_APP_API || "https://recursion70.pythonanywhere.com/";

export default axios.create({
  baseURL: api,
});

export const axiosPrivate = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
