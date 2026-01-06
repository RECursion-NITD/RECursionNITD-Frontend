import axios from "axios";

const api = process.env.REACT_APP_BACKEND_URL + "/api";

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
