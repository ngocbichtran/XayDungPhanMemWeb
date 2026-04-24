import { useEffect, useState } from "react";
import axios from "axios";

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

            const res = await axios.get(`/api/orders?page=${page}`);

            setOrders(res.data.data); // Laravel pagination
            setPagination({
                current_page: res.data.current_page,
                last_page: res.data.last_page,
            });

        } catch (err) {
            console.error(err);
            alert("Không thể tải đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Danh sách đơn hàng</h2>

            {/* Loading */}
            {loading && <p>Đang tải...</p>}

            {/* Empty */}
            {!loading && orders.length === 0 && (
                <div className="alert alert-info">
                    Chưa có đơn hàng nào.
                </div>
            )}

            {/* Table */}
            {!loading && orders.length > 0 && (
                <div className="card">
                    <div className="card-body">
                        <table className="table table-hover align-middle">
                            <thead>
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

                                        <td>
                                            {Number(order.total_price).toLocaleString()} đ
                                        </td>

                                        <td style={{ textTransform: "capitalize" }}>
                                            {order.payment_method}
                                        </td>

                                        <td>
                                            <span className="badge bg-secondary">
                                                {order.status || "pending"}
                                            </span>
                                        </td>

                                        <td>
                                            {new Date(order.created_at).toLocaleString("vi-VN")}
                                        </td>

                                        <td className="text-center">
                                            <a
                                                href={`/orders/${order.id}`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                Xem
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="mt-3">
                            <button
                                disabled={pagination.current_page === 1}
                                onClick={() => fetchOrders(pagination.current_page - 1)}
                            >
                                Prev
                            </button>

                            <span style={{ margin: "0 10px" }}>
                                {pagination.current_page} / {pagination.last_page}
                            </span>

                            <button
                                disabled={pagination.current_page === pagination.last_page}
                                onClick={() => fetchOrders(pagination.current_page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderList;