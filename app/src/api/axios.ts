import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "/api",
});

export const axiosPrivate = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
