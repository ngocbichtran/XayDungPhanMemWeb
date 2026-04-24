import axios from 'axios';

// ==========================================================
// 1. BỘ KHUNG TẠO CLIENT
// ==========================================================
export const createApiClient = (baseURL) => {
  const client = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  // Bộ nhét Token (Hiện tại chưa có Auth thì nó sẽ tự động bỏ qua, không gây lỗi)
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response.data,
    (error) => {
      console.error("Lỗi API Admin:", error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return client;
};

// ==========================================================
// 2. XUẤT XƯỞNG BA CỖ MÁY DÀNH RIÊNG CHO ADMIN
// ==========================================================

export const shopClient = createApiClient(import.meta.env.VITE_API_SHOP);  // Cho Bích
export const statClient = createApiClient(import.meta.env.VITE_API_STAT);  // Cho Dũng
export const orderClient = createApiClient(import.meta.env.VITE_API_ORDER); // Cho Tân
export const haStoreClient = createApiClient(import.meta.env.VITE_API_HA_STORE);