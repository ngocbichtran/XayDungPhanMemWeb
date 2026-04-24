import { useEffect, useState } from "react";
import axios from "axios";
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

            const res = await axios.get(`/api/orders/${id}`);
            setOrder(res.data);

        } catch (err) {
            console.error(err);
            alert("Không thể tải chi tiết đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Đang tải...</p>;
    if (!order) return <p>Không tìm thấy đơn hàng</p>;

    return (
        <div className="container">
            <h2>Chi tiết đơn hàng</h2>

            <p><strong>Mã đơn:</strong> {order.order_code}</p>
            <p><strong>Địa chỉ:</strong> {order.shipping_address}</p>
            <p><strong>Thanh toán:</strong> {order.payment_label}</p>
            <p><strong>Trạng thái:</strong> {order.status_label}</p>

            <hr />

            <h4>Sản phẩm</h4>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tạm tính</th>
                    </tr>
                </thead>

                <tbody>
                    {order.items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.product?.name || "N/A"}</td>

                            <td>
                                {Number(item.price).toLocaleString()} đ
                            </td>

                            <td>{item.quantity}</td>

                            <td>
                                {(item.price * item.quantity).toLocaleString()} đ
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h4 className="text-end">
                Tổng tiền: {Number(order.total_amount).toLocaleString()} đ
            </h4>

            <Link to="/orders" className="btn btn-secondary">
                Quay lại
            </Link>
        </div>
    );
}

export default OrderDetail;