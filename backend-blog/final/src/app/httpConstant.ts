import axios from "axios";
import { environment } from "src/environments/environment";

export const http = axios.create({
    baseURL: environment.baseUri,
    headers: {
        Authorization: (localStorage.getItem("token") ? "Bearer " + localStorage.getItem("token"): "")
    }
})