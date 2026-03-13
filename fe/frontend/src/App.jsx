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
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<AdminLayout />}>

          <Route path="/products" element={<ProductIndex />} />
          <Route path="/categories" element={<CategoriesIndex />} />
          <Route path="BASE_FE/users" element={<UsersIndex />} />
          <Route path="/users/create" element={<UserCreate />} />
             <Route path="/users/edit/:id" element={<UserEdit />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/categories/create" element={<CategoryCreate />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;