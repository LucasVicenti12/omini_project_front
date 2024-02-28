import axios from "axios";

export const http = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:9000",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});