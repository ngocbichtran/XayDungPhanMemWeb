import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [newPaymentStatus, setNewPaymentStatus] = useState(''); // Thêm state cho trạng thái thanh toán

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    const fetchOrderDetail = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/orders/${id}`);
            setOrder(response.data);
            setNewStatus(response.data.status);
            setNewPaymentStatus(response.data.payment_status); // Lấy dữ liệu thanh toán từ API
        } catch (error) {
            console.error('Lỗi tải chi tiết đơn', error);
        }
    };

    const handleUpdateStatus = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/admin/orders/${id}/status`, {
                status: newStatus,
                payment_status: newPaymentStatus // Gửi cả 2 trạng thái lên Backend
            });
            alert('🎉 Cập nhật trạng thái thành công!');
            fetchOrderDetail();
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data?.message || 'Có lỗi xảy ra'));
            console.error('Lỗi khi cập nhật', error);
        }
    };

    if (!order) return <div className="text-center py-10">Đang tải dữ liệu...</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)} className="mb-4 text-gray-500 hover:text-gray-800 font-semibold">
                &larr; Quay lại danh sách
            </button>
            {/* Sử dụng order_code thay cho id */}
            <h2 className="text-2xl font-bold mb-6">Chi tiết Đơn Hàng {order.order_code}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 p-5 rounded-lg shadow-sm bg-gray-50">
                    <h3 className="font-bold text-lg border-b pb-2 mb-3 text-gray-700">Thông tin khách hàng</h3>
                    {/* Sử dụng full_name theo CSDL mới */}
                    <p className="mb-2"><strong>👤 Tên:</strong> {order.user?.full_name || 'Khách vãng lai'}</p>
                    <p className="mb-2"><strong>📍 Địa chỉ:</strong> {order.shipping_address}</p>
                    <p><strong>💳 P.Thức thanh toán:</strong> {order.payment_method?.toUpperCase()}</p>
                </div>

                <div className="border border-blue-200 p-5 rounded-lg shadow-sm bg-blue-50">
                    <h3 className="font-bold text-lg border-b border-blue-200 pb-2 mb-3 text-blue-800">Cập nhật trạng thái</h3>
                    <div className="flex flex-col gap-3">
                        {/* Trạng thái vận chuyển */}
                        <div className="flex items-center gap-2">
                            <span className="w-32 font-semibold text-sm">Vận chuyển:</span>
                            <select
                                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                <option value="pending">Chờ xử lý</option>
                                <option value="processing">Đang xử lý (Trừ tồn kho)</option>
                                <option value="shipped">Đang giao</option>
                                <option value="delivered">Đã giao thành công</option>
                                <option value="cancelled">Đã hủy (Cộng lại kho)</option>
                            </select>
                        </div>

                        {/* Trạng thái thanh toán mới */}
                        <div className="flex items-center gap-2">
                            <span className="w-32 font-semibold text-sm">Thanh toán:</span>
                            <select
                                className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={newPaymentStatus}
                                onChange={(e) => setNewPaymentStatus(e.target.value)}
                            >
                                <option value="unpaid">Chưa thanh toán</option>
                                <option value="paid">Đã thanh toán</option>
                                <option value="failed">Lỗi thanh toán</option>
                            </select>
                        </div>

                        <button
                            onClick={handleUpdateStatus}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded transition mt-2"
                        >
                            Lưu Thay Đổi
                        </button>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Sản phẩm trong đơn</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-2 px-4 text-left">Tên Sản Phẩm</th>
                        <th className="py-2 px-4 text-center">Số lượng</th>
                        <th className="py-2 px-4 text-right">Đơn giá</th>
                        <th className="py-2 px-4 text-right">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map(item => (
                        <tr key={item.id} className="border-b">
                            <td className="py-3 px-4">{item.product?.name || 'Sản phẩm không xác định'}</td>
                            <td className="py-3 px-4 text-center font-bold">{item.quantity}</td>
                            <td className="py-3 px-4 text-right">{Number(item.price).toLocaleString('vi-VN')} đ</td>
                            <td className="py-3 px-4 text-right font-bold text-red-500">
                                {/* Dùng luôn item.subtotal từ Backend */}
                                {Number(item.subtotal).toLocaleString('vi-VN')} đ
                            </td>
                        </tr>
                    ))}
                    <tr className="bg-gray-50 font-bold text-lg">
                        <td colSpan="3" className="py-4 px-4 text-right uppercase">Tổng cộng:</td>
                        <td className="py-4 px-4 text-right text-red-600">{Number(order.total_amount).toLocaleString('vi-VN')} đ</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetail;
