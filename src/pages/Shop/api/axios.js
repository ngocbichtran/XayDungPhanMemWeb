import axios from 'axios';

const api = axios.create({
  // Lấy đường dẫn từ file .env. Nếu không có file .env thì mặc định lấy localhost:5000
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('user_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;