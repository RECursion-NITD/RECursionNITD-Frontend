import axios from "axios";

const api = process.env.API || "https://recursionnitd.pythonanywhere.com/api";

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
