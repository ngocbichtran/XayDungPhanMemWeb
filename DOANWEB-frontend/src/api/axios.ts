import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:7777/admin/api', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Global error handling
        console.error('API Error:', error.response?.data?.message || error.message);
        
        // Handle 401 Unauthorized globally
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;
