// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';

// LẤY TỪ DŨNG: Đăng ký thư viện vẽ biểu đồ Chart.js (Bắt buộc phải có để trang của Dũng không bị lỗi)
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);




//Lấy từ Minh Anh
import UserLayout from './pages/Shop/layouts/UserLayout';
import PublicLayout from './pages/Shop/layouts/PublicLayout';

import Home from './pages/Shop/pages/Home';
import Login from './pages/Shop/pages/Login';
import Register from './pages/Shop/pages/Register';
import Orders from './pages/Shop/pages/Orders';
import Profile from './pages/Shop/pages/Profile';
import { AuthProvider } from './pages/Shop/context/AuthContext';

function App() {
  // Tạm thời bỏ qua phần checkAuth của Dũng vì mình đã thống nhất bỏ phần Đăng nhập của Minh Anh ra trước.

  return (

    <BrowserRouter><AuthProvider>
      <Routes>

        {/* Mọi đường link bắt đầu bằng /admin sẽ được giao cho AdminRoutes quản lý */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* User */}
        <Route element={<UserLayout />}>
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes></AuthProvider>
    </BrowserRouter>
  );
}
export default App;