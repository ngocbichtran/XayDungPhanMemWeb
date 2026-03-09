import axios from 'axios';

// Lấy link từ .env, nếu không có thì dùng link Render làm mặc định
const BASE_URL = import.meta.env.VITE_API_URL || 'https://xaydungphanmemweb-9f0g.onrender.com';

const api = axios.create({
    // Tự động thêm /api vào sau domain nếu bạn quên chưa viết trong .env
    baseURL: BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000, // Chờ tối đa 10s (Render bản free khởi động hơi chậm)
});

// Bạn có thể thêm xử lý lỗi chung ở đây
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Lỗi kết nối API:', error.response?.status || 'Network Error');
        return Promise.reject(error);
    }
);

export default api;