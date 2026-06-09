import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

client.interceptors.response.use((response) => {
  return response; 
});

export default client;