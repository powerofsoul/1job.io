import axios from "axios";

export const API_END_POINT = window.location.host == "localhost"
    || window.location.host == "localhost:8080"
    || window.location.host == "127.0.0.1"
    || window.location.host.includes("webpack://")
    ? "http://localhost:3000" : `https://api.${window.location.host}`;

export const apiUrl = (path) => `${API_END_POINT}${path}`;

export function get<Response>(path: string): Promise<Response> {
    return axios.get(apiUrl(path), { withCredentials: true }).then(r => r.data as Response);
}

export function post<Request, Response>(path: string, body: Request = undefined): Promise<Response> {
    return axios.post(apiUrl(path), body, { withCredentials: true }).then(r => r.data as Response);
}

export function put<Request, Response>(path: string, body: Request = undefined): Promise<Response> {
    return axios.put(apiUrl(path), body, { withCredentials: true }).then(r => r.data as Response);
}

export function uploadFile<Response>(name: string, file: File, path: string): Promise<Response> {
    var formData = new FormData();
    formData.append(name, file);

    return axios.post(apiUrl(path), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    }).then(r => r.data as Response);
}

export const ValidateMessage = {
    required: '${label} is required!',
    types: {
        email: '${label} is not valid email!',
        number: '${label} is not a valid number!',
        url: '${label} is not a valid url'
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    }
}
