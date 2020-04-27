import axios from "axios";

export function get<Response>(path: string): Promise<Response> {
    return axios.get(path).then(r=> r.data as Response);
}

export function post<Request, Response>(path: string, body:Request): Promise<Response> {
    return axios.post(path, body).then(r=> r.data as Response);
}