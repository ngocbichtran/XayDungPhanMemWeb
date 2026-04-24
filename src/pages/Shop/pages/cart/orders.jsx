import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://effulgent-biscochitos-797078.netlify.app/api"; //Link BE của Hoàng Anh

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const res = await fetch(`${API}/orders`);
        const data = await res.json();

        // nếu dùng pagination Laravel
        setOrders(data.data || data);
    };

    const fmt = (n) => n?.toLocaleString("vi-VN") + " ₫";

    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "badge-warning";
            case "processing":
                return "badge-info";
            case "shipping":
                return "badge-primary";
            case "completed":
                return "badge-success";
            case "cancelled":
                return "badge-danger";
            default:
                return "badge-secondary";
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex align-items-center gap-3 mb-4">
                <h4 className="mb-0 fw-bold">📋 Lịch sử đơn hàng</h4>

                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => navigate("/cart")}
                >
                    ← Giỏ hàng
                </button>
            </div>

            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className="order-row">
                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                            <div>
                                <div className="order-code">#{order.order_code}</div>
                                <div className="text-muted small mt-1">
                                    {new Date(order.created_at).toLocaleString("vi-VN")}
                                </div>
                            </div>

                            <span className={`badge-status ${getStatusClass(order.status)}`}>
                                {order.status_label}
                            </span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
                            <div className="text-muted small">
                                {order.items?.length || 0} sản phẩm • {order.payment_label}
                                {order.payment_status === "paid" ? (
                                    <span className="text-success fw-bold">
                                        {" "}• Đã thanh toán
                                    </span>
                                ) : (
                                    <span className="text-warning fw-bold">
                                        {" "}• Chưa thanh toán
                                    </span>
                                )}
                            </div>

                            <div className="d-flex align-items-center gap-3">
                                <span className="order-total">
                                    {fmt(order.total_amount)}
                                </span>

                                <button
                                    className="btn-detail"
                                    onClick={() => navigate(`/orders/${order.id}`)}
                                >
                                    Xem chi tiết →
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-5">
                    <div style={{ fontSize: "3.5rem", opacity: 0.4 }}>📦</div>
                    <h5 className="text-muted mt-3">Bạn chưa có đơn hàng nào</h5>

                    <button
                        className="btn btn-danger mt-3"
                        onClick={() => navigate("/products")}
                    >
                        Mua sắm ngay
                    </button>
                </div>
            )}
        </div>
    );
}