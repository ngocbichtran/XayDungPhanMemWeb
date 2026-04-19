import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './layouts/AdminLayout';

// Pages
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/AdminDashboard';
import OrdersManagement from './pages/OrdersManagement';
import ProductsManagement from './pages/ProductsManagement';
import UsersManagement from './pages/UsersManagement';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProductsPage from './pages/ProductsPage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

// Register Chart.js models once for the entire app
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

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes with Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="users" element={<UsersManagement />} />
        </Route>
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/homepage" replace />} />
      </Routes>
    </Router>
  );
}
