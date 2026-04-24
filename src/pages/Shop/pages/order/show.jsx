import { useEffect, useState } from "react";
import haService from "../../../../services/haService";// 1. Dùng file api chuyên dụng của bạn
import { useParams, Link } from "react-router-dom";

function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            // 2. Không cần ghi /api/ vì baseURL đã có rồi
            const res = await api.get(`/orders/${id}`); 
            
            // 3. Kiểm tra res.data.data (theo cấu trúc JSON chúng ta thống nhất)
            setOrder(res.data.data || res.data); 

        } catch (err) {
            console.error(err);
            alert("Không thể tải chi tiết đơn hàng. Vui lòng đăng nhập lại.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container py-5 text-center">Đang tải chi tiết...</div>;
    if (!order) return <div className="container py-5 text-center">Không tìm thấy đơn hàng</div>;

    return (
        <div className="container py-4">
            <h2 className="mb-4">📦 Chi tiết đơn hàng #{order.order_code}</h2>
            
            <div className="card mb-4 p-3 shadow-sm">
                <p><strong>Mã đơn:</strong> <span className="text-danger">{order.order_code}</span></p>
                <p><strong>Địa chỉ giao:</strong> {order.shipping_address || "Chưa cập nhật"}</p>
                <p><strong>Phương thức:</strong> {order.payment_label}</p>
                <p><strong>Trạng thái:</strong> {order.status_label}</p>
            </div>

            <h4 className="mb-3">Sản phẩm trong đơn</h4>
            <div className="table-responsive">
                <table className="table table-hover border">
                    <thead className="table-light">
                        <tr>
                            <th>Sản phẩm</th>
                            <th className="text-center">Giá</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-end">Tạm tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items && order.items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.product?.name || "Sản phẩm không tồn tại"}</td>
                                <td className="text-center">{Number(item.price).toLocaleString()} đ</td>
                                <td className="text-center text-muted">x{item.quantity}</td>
                                <td className="text-end fw-bold">
                                    {(item.price * item.quantity).toLocaleString()} đ
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <Link to="/orders" className="btn btn-outline-secondary">← Quay lại lịch sử</Link>
                <h4 className="text-danger fw-bold">
                    Tổng cộng: {Number(order.total_amount).toLocaleString()} đ
                </h4>
            </div>
        </div>
    );
}

export default OrderDetail;