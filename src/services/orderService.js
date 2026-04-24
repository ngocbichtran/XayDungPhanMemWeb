// src/services/orderService.js
import { orderClient } from './apiFactory'; // Lấy cỗ máy riêng của Tân

const orderService = {
    // 1. Lấy danh sách đơn hàng (index)
    getAll: (params) => {
        return orderClient.get('/admin/orders', { params });
    },

    // 2. Lấy thống kê (stats)
    getStats: () => {
        return orderClient.get('/admin/orders/stats');
    },

    // 3. Xem chi tiết (show)
    getById: (id) => {
        return orderClient.get(`/admin/orders/${id}`);
    },

    // 4. Tạo đơn mới thủ công (store)
    create: (data) => {
        return orderClient.post('/admin/orders', data);
    },

    // 5. Cập nhật trạng thái (updateStatus)
    updateStatus: (id, statusData) => {
        return orderClient.put(`/admin/orders/${id}/status`, statusData);
    },

    // 6. Xóa/Hủy đơn hàng (destroy)
    delete: (id) => {
        return orderClient.delete(`/admin/orders/${id}`);
    }
};

export default orderService;