import axios from "axios";
const instance = axios.create({
    baseURL:"https://resume-analyzer-one-psi.vercel.app/",
})
export default instance;