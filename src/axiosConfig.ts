import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`
    }
});

export default apiClient;