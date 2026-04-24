import { Routes, Route } from 'react-router-dom';

// 1. IMPORT KHUNG CHUNG
import AdminLayout from '../components/AdminLayout/AdminLayout';

// 2. IMPORT CODE CỦA DŨNG (Dashboard)
import Dashboard from '../pages/Admin/Dashboard/Dashboard';

// 3. IMPORT CODE CỦA TÂN (Quản lý Đơn hàng)
import OrderList from '../pages/Admin/OrderManage/OrderList';
import OrderCreate from '../pages/Admin/OrderManage/OrderCreate';
import OrderDetail from '../pages/Admin/OrderManage/OrderDetail';

// 4. IMPORT CODE CỦA HÀO (Quản lý Sản phẩm)

// Products
import ProductIndex from '../pages/Admin/products/index';
import CreateProduct from '../pages/Admin/products/create';
import EditProduct from '../pages/Admin/products/edit';

// Categories
import CategoriesIndex from '../pages/Admin/categories/index';
import CategoryCreate from '../pages/Admin/categories/create';
import EditCategory from '../pages/Admin/categories/edit';



// 6. IMPORT CODE USER (Quản lý Người dùng)
import UsersIndex from '../pages/Admin/UserManage/index';
import UserCreate from '../pages/Admin/UserManage/create';
import UserEdit from '../pages/Admin/UserManage/edit';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Bao bọc tất cả bằng Khung chung AdminLayout */}
      <Route path="/" element={<AdminLayout />}>

        {/* ----- CỦA DŨNG ----- */}
        <Route index element={<Dashboard />} />

        {/* ----- CỦA TÂN ----- */}
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/create" element={<OrderCreate />} />
        <Route path="orders/:id" element={<OrderDetail />} />

        {/* ----- CỦA BÍCH (Sản phẩm) ----- */}
        <Route path="products" element={<ProductIndex />} />
        <Route path="categories" element={<CategoriesIndex />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="categories/create" element={<CategoryCreate />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />

        {/* ----- NGƯỜI DÙNG ----- */}
        <Route path="users" element={<UsersIndex />} />
        <Route path="users/create" element={<UserCreate />} />
        <Route path="users/edit/:id" element={<UserEdit />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;