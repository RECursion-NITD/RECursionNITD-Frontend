import axios from "axios";

const api = process.env.API || "http://recursionnitd.pythonanywhere.com/api";

export default axios.create({
  baseURL: api,
});
