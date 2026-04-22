import { NavLink, Outlet } from "react-router-dom";
import "./admin.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Shop Admin</h2>

        <nav>
          {/* <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "active-link" : "menu-link"
            }
          >
            Dashboard
          </NavLink> */}
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "active-link" : "menu-link"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "active-link" : "menu-link"
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/BASE_FE/users"
            className={({ isActive }) =>
              isActive ? "active-link" : "menu-link"
            }
          >
            Users Test
          </NavLink>


        </nav>
      </aside>

      {/* MAIN */}
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;