import api from './axios'; // Import instance bạn đã tạo

const orderApi = {
    // 1. Lấy danh sách đơn hàng (index)
    // params bao gồm: { page, search, status } (Đã bỏ payment_status)
    getAll: (params) => {
        return api.get('/admin/orders', { params });
    },

    // 2. Lấy thống kê (stats)
    getStats: () => {
        return api.get('/admin/orders/stats');
    },

    // 3. Xem chi tiết (show)
    getById: (id) => {
        return api.get(`/admin/orders/${id}`);
    },

    // 4. Tạo đơn mới thủ công (store)
    create: (data) => {
        return api.post('/admin/orders', data);
    },

    // 5. Cập nhật trạng thái (updateStatus)
    // Nhận vào statusData ví dụ: { status: 'processing' }
    updateStatus: (id, statusData) => {
        return api.put(`/admin/orders/${id}/status`, statusData);
    },

    // 6. Xóa/Hủy đơn hàng (destroy)
    delete: (id) => {
        return api.delete(`/admin/orders/${id}`);
    }

    /* TẠM ẨN: Cập nhật thông tin giao hàng
      Lý do: Backend hiện tại chưa có hàm xử lý Route PUT /admin/orders/{id}
      Nếu có nhu cầu mở rộng, bạn cần viết thêm hàm update() ở OrderController
    updateInfo: (id, data) => {
        return api.put(`/admin/orders/${id}`, data);
    },
    */
};

export default orderApi;