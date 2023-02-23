import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: false,
});
let token = localStorage.getItem("user");
if (token) {
    token = JSON.parse(token);
    instance.defaults.headers.common["Authorization"] = `Bearer ${token.token}`;
}
instance.defaults.headers.common["content-type"] = `application/json`;

export default instance;
