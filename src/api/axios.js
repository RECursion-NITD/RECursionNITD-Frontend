import axios from "axios";

const api = process.env.API || "https://recnitdgp.pythonanywhere.com/api";
// const api = "http://localhost:8000/api";

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
