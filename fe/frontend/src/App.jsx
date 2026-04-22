import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/admin";
import ProductIndex from "./admin/products/index";
import CreateProduct from "./admin/products/create";
import UsersIndex from "./admin/userstest/index";
import CategoriesIndex from "./admin/categories/index";
import EditProduct from "./admin/products/edit";
import CategoryCreate from "./admin/categories/create";
import EditCategory from "./admin/categories/edit";
import UserCreate from "./admin/userstest/create";
import UserEdit from "./admin/userstest/edit";
import Dashboard from "./Dashboard";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<AdminLayout />}>

          <Route index element={<ProductIndex />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Products group */}
          <Route path="products">
            <Route index element={<ProductIndex />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>

          {/* Categories group */}
          <Route path="categories">
            <Route index element={<CategoriesIndex />} />
            <Route path="create" element={<CategoryCreate />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>

          {/* Users */}
          <Route path="BASE_FE/users" element={<UsersIndex />} />
          <Route path="users/create" element={<UserCreate />} />
          <Route path="users/edit/:id" element={<UserEdit />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;