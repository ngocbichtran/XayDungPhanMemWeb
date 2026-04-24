import { Outlet, NavLink } from 'react-router-dom';

const AdminLayout = () => {
  // 1. Khai báo danh sách các menu bên trái
  const menuItems = [
    { path: '/admin', label: '📊 Dashboard (Dũng)', exact: true },
    { path: '/admin/orders', label: '📦 Đơn hàng (Tân)' },
    { path: '/admin/products', label: '🛍️ Sản phẩm (Hào)' },
    { path: '/admin/categories', label: '📂 Danh mục (Hào)' },
    { path: '/admin/users', label: '👥 Người dùng (Users)' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">

      {/* ========================================== */}
      {/* CỘT BÊN TRÁI: SIDEBAR (Menu điều hướng) */}
      {/* ========================================== */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        {/* Logo / Tên hệ thống */}
        <div className="p-6 text-2xl font-bold border-b border-gray-800 text-center tracking-wider">
          <span className="text-blue-400">ADMIN</span> PANEL
        </div>

        {/* Danh sách nút bấm */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.exact} // Dùng end để nó hiểu link gốc /admin không bị sáng đè lên link khác
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-all duration-200 font-medium ${isActive
                  ? 'bg-blue-600 text-white shadow-md' // Màu khi đang bấm vào trang đó
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white' // Màu khi chuột lướt qua
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Nút Đăng xuất ở cuối Sidebar */}
        <div className="p-4 border-t border-gray-800">
          <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
            🚪 Đăng xuất
          </button>
        </div>
      </aside>

      {/* ========================================== */}
      {/* KHU VỰC BÊN PHẢI: HEADER & NỘI DUNG CHÍNH */}
      {/* ========================================== */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header (Thanh ngang trên cùng) */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center z-10">
          <h1 className="text-xl font-bold text-gray-800">Hệ thống Quản trị E-Commerce</h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
              AD
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">Admin Tổng</p>
              <p className="text-xs text-green-500 font-medium">● Đang hoạt động</p>
            </div>
          </div>
        </header>

        {/* NỘI DUNG RUỘT (Outlet chính là cái lỗ thần kỳ) */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mx-auto overflow-auto">
            {/* TẤT CẢ CODE CỦA DŨNG, TÂN VÀ BÍCH SẼ ĐƯỢC BƠM VÀO ĐÂY!
              Khi bấm menu bên trái, phần Header và Sidebar đứng yên, 
              chỉ có khu vực Outlet này bị thay đổi nội dung.
            */}
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;