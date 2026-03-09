import React, { useState, useEffect } from 'react';
// 1. THAY ĐỔI QUAN TRỌNG: Import api từ file cấu hình thay vì axios mặc định
import api from '../../api/axios'; 
import { Link } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [paymentFilter, setPaymentFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState({ total_orders: 0, total_revenue: 0, pending_orders: 0, unpaid_orders: 0 });

    useEffect(() => {
        fetchOrders();
        fetchStats();
    }, [statusFilter, paymentFilter, searchTerm]);

    const fetchOrders = async () => {
        try {
            // 2. SỬA ĐƯỜNG DẪN: Bỏ phần http://127.0.0.1:8000/api đi
            const response = await api.get('/admin/orders', {
                params: {
                    status: statusFilter,
                    payment_status: paymentFilter,
                    search: searchTerm
                }
            });
            // Kiểm tra cấu trúc data trả về từ Laravel (thường là response.data.data nếu dùng Resource)
            setOrders(response.data.data || response.data);
        } catch (error) {
            console.error('Lỗi khi tải danh sách', error);
        }
    };

    const fetchStats = async () => {
        try {
            // 3. SỬA ĐƯỜNG DẪN: Dùng đường dẫn tương đối
            const response = await api.get('/admin/orders/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Lỗi khi tải thống kê', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Dashboard Thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-blue-500">
                    <p className="text-xs font-bold text-gray-400 uppercase">Tổng đơn hàng</p>
                    <p className="text-2xl font-extrabold text-gray-800">{stats.total_orders}</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-500">
                    <p className="text-xs font-bold text-gray-400 uppercase">Doanh thu thực tế</p>
                    <p className="text-2xl font-extrabold text-green-600">{Number(stats.total_revenue || 0).toLocaleString('vi-VN')} đ</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-orange-500">
                    <p className="text-xs font-bold text-gray-400 uppercase">Đơn chờ xử lý</p>
                    <p className="text-2xl font-extrabold text-orange-500">{stats.pending_orders}</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-500">
                    <p className="text-xs font-bold text-gray-400 uppercase">Chưa thanh toán</p>
                    <p className="text-2xl font-extrabold text-red-500">{stats.unpaid_orders}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-800">Quản lý Đơn Hàng</h2>

                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Tìm mã đơn hoặc tên khách..."
                            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none w-full md:w-auto"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select
                            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">-- Vận chuyển --</option>
                            <option value="pending">Chờ xử lý</option>
                            <option value="processing">Đang xử lý</option>
                            <option value="shipped">Đang giao</option>
                            <option value="delivered">Đã giao</option>
                            <option value="cancelled">Đã hủy</option>
                        </select>

                        <select
                            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer"
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                        >
                            <option value="">-- Thanh toán --</option>
                            <option value="unpaid">Chưa thanh toán</option>
                            <option value="paid">Đã thanh toán</option>
                            <option value="failed">Lỗi</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                            <tr>
                                <th className="py-4 px-6 text-left">Mã ĐH</th>
                                <th className="py-4 px-6 text-left">Khách hàng</th>
                                <th className="py-4 px-6 text-right">Tổng tiền</th>
                                <th className="py-4 px-6 text-center">Vận chuyển</th>
                                <th className="py-4 px-6 text-center">Thanh toán</th>
                                <th className="py-4 px-6 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                            {orders.length > 0 ? orders.map(order => (
                                <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="py-4 px-6 font-bold text-blue-600">{order.order_code}</td>
                                    <td className="py-4 px-6 font-medium text-gray-700">{order.user?.full_name || 'Khách lẻ'}</td>
                                    <td className="py-4 px-6 text-right font-bold text-gray-800">
                                        {Number(order.total_amount).toLocaleString('vi-VN')} đ
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide
                                            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                                            ${order.status === 'processing' ? 'bg-blue-100 text-blue-700' : ''}
                                            ${order.status === 'shipped' ? 'bg-indigo-100 text-indigo-700' : ''}
                                            ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : ''}
                                            ${order.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                                        `}>
                                            {(order.status || '').toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide
                                            ${order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                                            ${order.payment_status === 'failed' ? 'bg-red-100 text-red-700' : ''}
                                        `}>
                                            {order.payment_status === 'unpaid' ? 'CHƯA TT' : (order.payment_status || '').toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <Link to={`/admin/orders/${order.id}`} className="text-blue-500 hover:underline font-bold">
                                            Chi tiết &rarr;
                                        </Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" className="text-center py-12 text-gray-400 italic">Không có dữ liệu phù hợp.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderList;