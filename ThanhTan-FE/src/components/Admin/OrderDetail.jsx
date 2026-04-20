import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; 
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    const fetchOrderDetail = async () => {
        try {
            const response = await api.get(`/admin/orders/${id}`);
            const orderData = response.data.data || response.data;
            setOrder(orderData);
            setNewStatus(orderData.status);
        } catch (error) {
            console.error('Lỗi tải chi tiết đơn', error);
        }
    };

    const handleUpdateStatus = async () => {
        try {
            await api.put(`/admin/orders/${id}/status`, {
                status: newStatus
            });
            alert('🎉 Cập nhật trạng thái thành công!');
            fetchOrderDetail();
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data?.message || 'Có lỗi xảy ra'));
            console.error('Lỗi khi cập nhật', error);
        }
    };

    const handleDeleteOrder = async () => {
        if (!window.confirm('🚨 Bạn có chắc chắn muốn HỦY đơn hàng này không? Sản phẩm sẽ được hoàn lại vào kho!')) return;

        try {
            await api.delete(`/admin/orders/${id}`);
            alert('🛑 Đã hủy đơn hàng thành công!');
            fetchOrderDetail(); 
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data?.message || 'Không thể can thiệp đơn hàng này'));
            console.error('Lỗi khi hủy', error);
        }
    };

    if (!order) return <div className="text-center py-10">Đang tải dữ liệu...</div>;

    // Biến kiểm tra: Đơn hàng đã chốt sổ chưa? (Không cho phép sửa nữa)
    const isTerminalState = ['delivered', 'cancelled'].includes(order.status);
    
    // Biến kiểm tra: Admin có thay đổi trạng thái trong Dropdown chưa?
    const hasStatusChanged = newStatus !== order.status;

    return (
        <div>
            <button onClick={() => navigate(-1)} className="mb-4 text-gray-500 hover:text-gray-800 font-semibold flex items-center gap-1">
                &larr; Quay lại danh sách
            </button>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Chi tiết Đơn Hàng {order.order_code}</h2>
                
                {/* Nút Hủy hiển thị khi đơn hàng chưa bị khóa (chưa giao thành công, chưa bị hủy) */}
                {!isTerminalState && (
                    <button 
                        onClick={handleDeleteOrder}
                        className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 px-4 py-2 rounded-lg font-bold transition-colors shadow-sm"
                    >
                        🛑 HỦY ĐƠN HÀNG
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Thông tin khách hàng */}
                <div className="border border-gray-200 p-5 rounded-lg shadow-sm bg-gray-50">
                    <h3 className="font-bold text-lg border-b pb-2 mb-3 text-gray-700 uppercase text-sm">Thông tin khách hàng</h3>
                    <p className="mb-2"><strong>👤 Tên:</strong> {order.user?.name || 'Khách vãng lai'}</p>
                    <p className="mb-2"><strong>📍 Địa chỉ:</strong> {order.shipping_address}</p>
                    <p><strong>💳 P.Thức thanh toán:</strong> {(order.payment_method || 'Chưa cập nhật').toUpperCase()}</p>
                </div>

                {/* Cập nhật trạng thái */}
                <div className="border border-blue-200 p-5 rounded-lg shadow-sm bg-blue-50">
                    <h3 className="font-bold text-lg border-b border-blue-200 pb-2 mb-3 text-blue-800 uppercase text-sm">Cập nhật trạng thái</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <span className="w-32 font-semibold text-xs text-gray-600">VẬN CHUYỂN:</span>
                            <select
                                className={`border p-2 rounded w-full text-sm outline-none transition-colors
                                    ${isTerminalState ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'}
                                `}
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                disabled={isTerminalState} // Khóa Dropdown nếu đã chốt sổ
                            >
                                <option value="pending">Chờ xử lý</option>
                                <option value="processing">Đang xử lý (Trừ kho)</option>
                                <option value="shipped">Đang giao</option>
                                <option value="delivered">Đã giao thành công</option>
                                <option value="cancelled">Đã hủy (Hoàn kho)</option>
                            </select>
                        </div>

                        <button
                            onClick={handleUpdateStatus}
                            disabled={isTerminalState || !hasStatusChanged} // Khóa nút nếu chưa đổi status hoặc đã chốt sổ
                            className={`font-bold px-4 py-2 rounded transition mt-2 text-sm shadow-sm
                                ${isTerminalState || !hasStatusChanged 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'}
                            `}
                        >
                            {isTerminalState ? 'ĐƠN ĐÃ CHỐT SỔ' : 'CẬP NHẬT NGAY'}
                        </button>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-700">Sản phẩm trong đơn</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white text-xs uppercase whitespace-nowrap">
                        <tr>
                            <th className="py-3 px-4 text-left">Tên Sản Phẩm</th>
                            <th className="py-3 px-4 text-center">Số lượng</th>
                            <th className="py-3 px-4 text-right">Đơn giá</th>
                            <th className="py-3 px-4 text-right">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {(order.items || []).map(item => (
                            <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 font-medium">{item.product?.name || 'Sản phẩm không xác định'}</td>
                                <td className="py-3 px-4 text-center font-bold text-blue-600">{item.quantity}</td>
                                <td className="py-3 px-4 text-right">{Number(item.price).toLocaleString('vi-VN')} đ</td>
                                <td className="py-3 px-4 text-right font-bold text-red-500">
                                    {Number(item.quantity * item.price).toLocaleString('vi-VN')} đ
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-gray-100 font-bold text-lg">
                            <td colSpan="3" className="py-4 px-4 text-right">TỔNG CỘNG:</td>
                            <td className="py-4 px-4 text-right text-red-600">{Number(order.total_amount).toLocaleString('vi-VN')} đ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;