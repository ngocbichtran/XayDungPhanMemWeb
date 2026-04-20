import { Routes, Route, Link, Navigate } from 'react-router-dom';
import OrderList from './components/Admin/OrderList';
import OrderDetail from './components/Admin/OrderDetail';
import OrderCreate from './components/Admin/OrderCreate'; // Import chuẩn file tạo đơn

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
                    <Route path="/" element={<Navigate to="/admin/orders" replace />} />
                    
                    <Route path="/admin/orders" element={<OrderList />} />
                    
                    {/* BẮT BUỘC: Route create phải nằm trên Route :id */}
                    <Route path="/admin/orders/create" element={<OrderCreate />} />
                    
                    <Route path="/admin/orders/:id" element={<OrderDetail />} />

                    <Route path="*" element={<div className="text-center py-10 font-bold text-gray-500">404 - Không tìm thấy trang này</div>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;