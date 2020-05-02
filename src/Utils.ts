import axios from "axios";

const baseUrl = window.location.host == "localhost" 
             || window.location.host == "localhost:8080" 
             || window.location.host == "127.0.0.1" 
    ? "http://localhost:3000" : `api.${window.location.host}`;

const apiUrl = (path) => `${baseUrl}${path}`; 

export function get<Response>(path: string): Promise<Response> {
    return axios.get(apiUrl(path)).then(r=> r.data as Response);
}

export function post<Request, Response>(path: string, body:Request): Promise<Response> {
    return axios.post(apiUrl(path), body).then(r=> r.data as Response);
}