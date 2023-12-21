import axios from "axios"
import getCookie from "./getCookie"

const token = getCookie("token")

const myAxios = axios.create({
    baseURL: process.env.BACKEND_URL, // Set your API base URL
    timeout: 20000, // Set a timeout for requests (optional)
    headers: {
        "Content-Type": "application/json",
        // Add any other default headers here
        Authorization: `Bearer ${token}`,
    },
})

export default myAxios
