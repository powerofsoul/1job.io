export interface ApiResponse<T = {}> {
    success: boolean;
    message?: string;
    payload?: T;
}