import axios from "axios";

const baseAPI = axios.create({
    baseURL: "http://localhost:8000/api/v1/user",
})

export default baseAPI;