// src/services/haService.js
// Đảm bảo bạn đã có file api.js trong cùng thư mục này
import { haStoreClient } from "./apiFactory";
const haService = {
  // --- PHẦN SẢN PHẨM ---
  getProducts: (params = {}) => {
    return haStoreClient.get('/products', { params });
  },
  getProductDetail: (id) => {
    return haStoreClient.get(`/products/${id}`);
  },

  // --- PHẦN ĐƠN HÀNG (Mua sắm của khách) ---
  getPurchaseHistory: () => {
    return haStoreClient.get('/orders');
  },
  getPurchaseDetail: (id) => {
    return haStoreClient.get(`/orders/${id}`);
  }
};

export default haService;