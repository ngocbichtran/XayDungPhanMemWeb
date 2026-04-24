import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import haService from "@/services/haService"; 
import './OrderHistory.css'; // Copy phần <style> của bạn vào file này

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/orders');
                // Laravel Paginate trả về mảng dữ liệu trong res.data.data.data
                setOrders(res.data.data.data || []);
            } catch (error) {
                console.error("Không thể tải lịch sử đơn hàng", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
    };

    if (loading) return <div className="container py-5 text-center">Đang tải lịch sử...</div>;

    return (
        <div className="container py-4">
            <div className="d-flex align-items-center gap-3 mb-4">
                <h4 className="mb-0 fw-bold">📋 Lịch sử đơn hàng</h4>
                <Link to="/cart" className="btn btn-sm btn-outline-danger">
                    ← Giỏ hàng
                </Link>
            </div>

            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className="order-row">
                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                            <div>
                                <div className="order-code">#{order.order_code}</div>
                                <div className="text-muted small mt-1">
                                    {new Date(order.created_at).toLocaleString('vi-VN')}
                                </div>
                            </div>
                            {/* status_color cần được gửi từ API (ví dụ: 'success', 'danger') */}
                            <span className={`badge-status badge-${order.status_color}`}>
                                {order.status_label}
                            </span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
                            <div className="text-muted small">
                                {order.items_count} sản phẩm • {order.payment_label}
                                {order.payment_status === 'paid' ? (
                                    <> • <span className="text-success fw-bold">Đã thanh toán</span></>
                                ) : (
                                    <> • <span className="text-warning fw-bold">Chưa thanh toán</span></>
                                )}
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <span className="order-total">{formatCurrency(order.total_amount)}</span>
                                <Link to={`/order/${order.id}`} className="btn-detail">
                                    Xem chi tiết →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-5">
                    <div style={{ fontSize: '3.5rem', opacity: 0.4 }}>📦</div>
                    <h5 className="text-muted mt-3">Bạn chưa có đơn hàng nào</h5>
                    <Link to="/products" className="btn btn-danger mt-3">
                        Mua sắm ngay
                    </Link>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;