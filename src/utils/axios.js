import axios from "axios"
import getCookie from "./getCookie"

var token = getCookie("token")
var headers
if (token) {
    headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }
} else {
    headers = {
        "Content-Type": "application/json",
    }
}

const myAxios = axios.create({
    baseURL: process.env.BACKEND_URL, // Set your API base URL
    timeout: 20000, // Set a timeout for requests (optional)
    headers,
})

export default myAxios
