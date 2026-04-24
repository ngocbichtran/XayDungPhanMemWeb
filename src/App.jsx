import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

// layouts
import UserLayout from './pages/Shop/layouts/UserLayout';
import PublicLayout from './pages/Shop/layouts/PublicLayout';

// pages
import Home from './pages/Shop/pages/Home';
import Login from './pages/Shop/pages/Login';
import Register from './pages/Shop/pages/Register';
import Profile from './pages/Shop/pages/Profile';
import CartPage from './pages/Shop/pages/cart/index';
import Orders from './pages/Shop/pages/cart/orders';
import OrderDetail from './pages/Shop/pages/cart/order-detail';

// auth
import { AuthProvider } from './pages/Shop/context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* ADMIN */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* USER */}
          <Route element={<UserLayout />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* AUTH (tạm vẫn giữ để test UI nếu cần) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PUBLIC */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<h2>404 Not Found</h2>} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;