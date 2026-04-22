import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import UserLayout  from './layouts/UserLayout';
import PublicLayout from './layouts/PublicLayout';   // ← thêm layout public
import Home     from './pages/Home';
import Login    from './pages/Login';
import Register from './pages/Register';
import Orders   from './pages/Orders';
import Profile  from './pages/Profile';

export default function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* Trang chủ — ai cũng vào được, có header riêng */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Auth — không có header */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected — phải đăng nhập */}
        <Route element={<UserLayout />}>
          <Route path="/orders"  element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}