import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // ★これが超重要（Cookie認証）
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;