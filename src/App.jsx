// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';

// LẤY TỪ DŨNG: Đăng ký thư viện vẽ biểu đồ Chart.js (Bắt buộc phải có để trang của Dũng không bị lỗi)
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

function App() {
  // Tạm thời bỏ qua phần checkAuth của Dũng vì mình đã thống nhất bỏ phần Đăng nhập của Minh Anh ra trước.

  return (
    <BrowserRouter>
      <Routes>
        {/* Mặc định vào trang web là đẩy thẳng vào Admin Dashboard */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Mọi đường link bắt đầu bằng /admin sẽ được giao cho AdminRoutes quản lý */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Sau này có ClientRoutes của Hào thì thêm ở đây */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;