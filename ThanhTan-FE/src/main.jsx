import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css'; // DÒNG QUAN TRỌNG NHẤT ĐỂ HIỂN THỊ GIAO DIỆN

// Import 2 màn hình quản lý đơn hàng
import OrderList from './components/Admin/OrderList';
import OrderDetail from './components/Admin/OrderDetail';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-100 p-8">
                <nav className="mb-6 bg-white p-4 rounded shadow flex gap-4">
                    <Link to="/" className="text-gray-700 font-bold hover:text-blue-600">🏠 Trang chủ</Link>
                    <Link to="/admin/orders" className="text-gray-700 font-bold hover:text-blue-600">📦 Quản lý Đơn hàng</Link>
                </nav>

                <div className="bg-white p-6 rounded shadow">
                    <Routes>
                        <Route path="/" element={<h2 className="text-2xl font-bold">Chào mừng đến với Bảng Điều Khiển Admin</h2>} />
                        <Route path="/admin/orders" element={<OrderList />} />
                        <Route path="/admin/orders/:id" element={<OrderDetail />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);