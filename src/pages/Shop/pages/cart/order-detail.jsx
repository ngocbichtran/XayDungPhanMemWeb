import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://your-backend-api.com/api"; // 👈 đổi lại

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        const res = await fetch(`${API}/orders/${id}`);
        const data = await res.json();
        setOrder(data);
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

    if (!order) return <p>Loading...</p>;

    return (
        <div className="container py-4" style={{ maxWidth: 800 }}>
            <div className="d-flex align-items-center gap-3 mb-4">
                <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigate("/orders")}
                >
                    ← Quay lại
                </button>
                <h4 className="mb-0 fw-bold">Chi tiết đơn hàng</h4>
            </div>

            {/* Thông tin đơn */}
            <div className="detail-card">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                    <div>
                        <div style={{ fontFamily: "monospace", fontWeight: 800 }}>
                            #{order.order_code}
                        </div>
                        <div className="text-muted small">
                            {new Date(order.created_at).toLocaleString("vi-VN")}
                        </div>
                    </div>

                    <span className={`badge-status ${getStatusClass(order.status)}`}>
                        {order.status_label}
                    </span>
                </div>

                <div className="info-grid">
                    <div className="info-item">
                        <label>Địa chỉ giao hàng</label>
                        <span>{order.shipping_address}</span>
                    </div>

                    <div className="info-item">
                        <label>Phương thức thanh toán</label>
                        <span>{order.payment_label}</span>
                    </div>

                    <div className="info-item">
                        <label>Trạng thái thanh toán</label>
                        <span
                            className={
                                order.payment_status === "paid"
                                    ? "text-success"
                                    : "text-warning"
                            }
                        >
                            {order.payment_status === "paid"
                                ? "✅ Đã thanh toán"
                                : "⏳ Chưa thanh toán"}
                        </span>
                    </div>

                    {order.note && (
                        <div className="info-item">
                            <label>Ghi chú</label>
                            <span>{order.note}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Sản phẩm */}
            <div className="detail-card">
                <h6 className="fw-bold mb-3">
                    🛍️ Sản phẩm ({order.items?.length || 0})
                </h6>

                {order.items?.map((item) => (
                    <div key={item.id} className="item-row">
                        <div className="item-thumb">
                            {item.product?.image ? (
                                <img src={item.product.image} alt="" />
                            ) : (
                                "📦"
                            )}
                        </div>

                        <div className="flex-grow-1">
                            <div className="fw-semibold">
                                {item.product?.name || "Sản phẩm đã xóa"}
                            </div>

                            <div className="text-muted small">
                                {fmt(item.price)} × {item.quantity}
                            </div>
                        </div>

                        <div className="fw-bold text-danger">
                            {fmt(item.price * item.quantity)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tổng tiền */}
            <div className="grand-total">
                <span className="label">
                    Tổng cộng ({order.items?.length || 0} sản phẩm)
                </span>
                <span className="amount">{fmt(order.total_amount)}</span>
            </div>
        </div>
    );
}