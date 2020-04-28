interface Response<T> {
    success: boolean;
    body: T
}

export default Response;