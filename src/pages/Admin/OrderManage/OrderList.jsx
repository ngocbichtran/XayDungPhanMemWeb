import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// 1. NHẬP ĐÚNG CỖ MÁY CỦA TÂN VÀO (thay vì orderService)
import { orderClient } from '../../../services/apiFactory';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    const [stats, setStats] = useState({ 
        total_orders: 0, 
        total_revenue: 0, 
        pending_orders: 0, 
        cancelled_orders: 0 
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter, searchTerm]);

    useEffect(() => {
        fetchOrders();
        fetchStats();
    }, [statusFilter, searchTerm, currentPage]);

    const fetchOrders = async () => {
        try {
            // 2. GỌI BẰNG ORDERCLIENT
            const res = await orderClient.get('/admin/orders', {
                params: {
                    status: statusFilter,
                    search: searchTerm,
                    page: currentPage 
                }
            });
            
            // 3. XỬ LÝ BÓC VỎ (Vì orderClient đã bóc 1 lớp .data rồi)
            if (res && res.data) {
                setOrders(res.data); // Mảng danh sách đơn hàng
                setLastPage(res.last_page || 1); // Cập nhật tổng số trang
            } else {
                setOrders(res || []);
                setLastPage(1);
            }
        } catch (error) {
            console.error('Lỗi khi tải danh sách', error);
        }
    };

    const fetchStats = async () => {
        try {
            // 4. GỌI STATS BẰNG ORDERCLIENT
            const res = await orderClient.get('/admin/orders/stats');
            // Gán thẳng res vì đã được bóc vỏ
            if(res) {
               setStats(res);
            }
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
                    <p className="text-xs font-bold text-gray-400 uppercase">Doanh thu thực tế (Đã giao)</p>
                    <p className="text-2xl font-extrabold text-green-600">{Number(stats.total_revenue || 0).toLocaleString('vi-VN')} đ</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-orange-500">
                    <p className="text-xs font-bold text-gray-400 uppercase">Đơn chờ xử lý</p>
                    <p className="text-2xl font-extrabold text-orange-500">{stats.pending_orders}</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-red-500">
                    <p className="text-xs font-bold text-gray-400 uppercase">Đơn đã hủy</p>
                    <p className="text-2xl font-extrabold text-red-500">{stats.cancelled_orders}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
                    
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-800">Quản lý Đơn Hàng</h2>
                        <Link 
                            to="/admin/orders/create" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm"
                        >
                            + Tạo đơn hàng
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                        <input
                            type="text"
                            placeholder="Tìm mã đơn, tên khách..."
                            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none w-full md:w-auto flex-1"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select
                            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">-- Tất cả trạng thái --</option>
                            <option value="pending">Chờ xử lý</option>
                            <option value="processing">Đang xử lý</option>
                            <option value="shipped">Đang giao</option>
                            <option value="delivered">Đã giao</option>
                            <option value="cancelled">Đã hủy</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-100 mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                            <tr>
                                <th className="py-4 px-6 text-left">Mã ĐH</th>
                                <th className="py-4 px-6 text-left">Khách hàng</th>
                                <th className="py-4 px-6 text-right">Tổng tiền</th>
                                <th className="py-4 px-6 text-center">Trạng thái</th>
                                <th className="py-4 px-6 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                            {(orders && orders.length > 0) ? orders.map(order => (
                                <tr key={order.id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="py-4 px-6 font-bold text-blue-600">{order.order_code}</td>
                                    <td className="py-4 px-6 font-medium text-gray-700">{order.user?.name || 'Khách lẻ'}</td>
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
                                        <Link to={`/admin/orders/${order.id}`} className="text-blue-500 hover:underline font-bold">
                                            Chi tiết &rarr;
                                        </Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="5" className="text-center py-12 text-gray-400 italic">Không có dữ liệu phù hợp.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* === GIAO DIỆN PHÂN TRANG (PAGINATION) === */}
                {lastPage > 1 && (
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <span className="text-sm text-gray-600">
                            Trang <strong>{currentPage}</strong> trên tổng số <strong>{lastPage}</strong>
                        </span>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors
                                    ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-gray-300'}`}
                            >
                                &larr; Trước
                            </button>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
                                disabled={currentPage === lastPage}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors
                                    ${currentPage === lastPage ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-gray-300'}`}
                            >
                                Sau &rarr;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderList;