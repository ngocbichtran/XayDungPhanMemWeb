import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import Login  from './pages/Login';
import Orders from './pages/Orders';
import Users from './pages/Users';
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected - Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/orders" element={<Orders />} />
           <Route path="/users"  element={<Users />} /> 
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}