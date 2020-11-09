import axios from "axios";
import { BASE_BACKEND_URL } from "./constants";

axios.defaults.baseURL = BASE_BACKEND_URL;

export default axios;