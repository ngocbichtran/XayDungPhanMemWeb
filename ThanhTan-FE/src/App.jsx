import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OrderList from './components/Admin/OrderList';
import OrderDetail from './components/Admin/OrderDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tự động chuyển hướng trang chủ vào trang danh sách đơn hàng */}
        <Route path="/" element={<Navigate to="/admin/orders" replace />} />
        
        {/* Đường dẫn tới trang danh sách và chi tiết */}
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/orders/:id" element={<OrderDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;