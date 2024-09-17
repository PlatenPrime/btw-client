import axios from "./axios"

const TIMEOUT_DURATION = 5000;

export const fetchWithTimeout = (url, timeout = TIMEOUT_DURATION) => {
    return Promise.race([
        axios.get(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]);
};