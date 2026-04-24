import { useEffect, useState } from "react";
import haService from "../../../../services/haService"; // Đường dẫn chuẩn từ folder order/index.jsx

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
    });

    useEffect(() => {
        fetchOrders(1);
    }, []);

    const fetchOrders = async (page) => {
        try {
            setLoading(true);
            // Dùng haService để đi qua Proxy /api-ha-store
            const res = await haService.getPurchaseHistory({ page });
            
            // Ép kiểu dữ liệu từ Laravel Pagination
            const data = res.data || res; 

            setOrders(data.data || []);
            setPagination({
                current_page: data.current_page || 1,
                last_page: data.last_page || 1,
            });
        } catch (err) {
            console.error("Lỗi lấy đơn hàng HA Store:", err);
        } finally {
            setLoading(false);
        }
    };

    const fmt = (n) => Number(n).toLocaleString("vi-VN") + " đ";

    return (
        <div className="container py-4">
            <h2 className="mb-4">📦 Danh sách đơn hàng</h2>

            {loading ? (
                <div className="text-center">Đang tải dữ liệu...</div>
            ) : orders.length === 0 ? (
                <div className="alert alert-info">Bạn chưa có đơn hàng nào tại HA Store.</div>
            ) : (
                <div className="card shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Tổng tiền</th>
                                    <th>Thanh toán</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày tạo</th>
                                    <th className="text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td><strong>{order.order_code}</strong></td>
                                        <td className="text-danger fw-bold">{fmt(order.total_price)}</td>
                                        <td className="text-capitalize">{order.payment_method}</td>
                                        <td>
                                            <span className="badge bg-primary">{order.status || "Chờ xử lý"}</span>
                                        </td>
                                        <td>{new Date(order.created_at).toLocaleDateString("vi-VN")}</td>
                                        <td className="text-center">
                                            <a href={`/orders/${order.id}`} className="btn btn-sm btn-outline-primary">Xem</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="card-footer d-flex justify-content-center align-items-center gap-3">
                        <button 
                            className="btn btn-sm btn-secondary"
                            disabled={pagination.current_page === 1}
                            onClick={() => fetchOrders(pagination.current_page - 1)}
                        > Trước </button>
                        <span>Trang {pagination.current_page} / {pagination.last_page}</span>
                        <button 
                            className="btn btn-sm btn-secondary"
                            disabled={pagination.current_page === pagination.last_page}
                            onClick={() => fetchOrders(pagination.current_page + 1)}
                        > Sau </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderList;