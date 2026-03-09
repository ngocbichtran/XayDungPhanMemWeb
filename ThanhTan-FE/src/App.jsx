import { Routes, Route, Link, Navigate } from 'react-router-dom';
import OrderList from './components/Admin/OrderList';
import OrderDetail from './components/Admin/OrderDetail';

function App() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Thanh Navigation */}
            <nav className="mb-6 bg-white p-4 rounded shadow-md flex gap-6 items-center">
                <Link to="/" className="text-gray-800 font-bold text-lg hover:text-blue-600 transition-colors">
                    🏠 Home
                </Link>
                <Link to="/admin/orders" className="text-gray-800 font-bold text-lg hover:text-blue-600 transition-colors">
                    📦 Quản lý Đơn hàng
                </Link>
            </nav>

            {/* Vùng hiển thị nội dung chính */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Routes>
                    {/* Trang chủ: Tự động chuyển hướng vào danh sách đơn hàng */}
                    <Route path="/" element={<Navigate to="/admin/orders" replace />} />
                    
                    {/* Các route của Admin */}
                    <Route path="/admin/orders" element={<OrderList />} />
                    <Route path="/admin/orders/:id" element={<OrderDetail />} />

                    {/* Route 404 cho Frontend */}
                    <Route path="*" element={<div className="text-center py-10">404 - Không tìm thấy trang này</div>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;