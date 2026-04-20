import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './index.css'; 

// 1. Nhớ Import đầy đủ 3 file
import OrderList from './components/Admin/OrderList';
import OrderCreate from './components/Admin/OrderCreate'; // THÊM DÒNG NÀY
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
                        <Route path="/" element={<Navigate to="/admin/orders" replace />} />
                        
                        <Route path="/admin/orders" element={<OrderList />} />

                        {/* 2. DÒNG NÀY LÀ CỨU TINH: Phải nằm trên :id */}
                        <Route path="/admin/orders/create" element={<OrderCreate />} />

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