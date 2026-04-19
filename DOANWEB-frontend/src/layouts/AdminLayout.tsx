import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, ShoppingCart, Box, LayoutDashboard, LogOut, Menu, X, Bell 
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Auto-close sidebar on mobile when navigating
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false); // Native desktop visible anyway
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(path);
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
      case '/admin/':
        return 'Dashboard Overview';
      case '/admin/orders':
        return 'Orders Management';
      case '/admin/products':
        return 'Products Management';
      case '/admin/users':
        return 'Users Management';
      default:
        return 'Admin Panel';
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 flex h-screen overflow-hidden font-sans">
      
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-transform duration-300 z-20 
          ${sidebarOpen ? 'fixed inset-y-0 left-0 translate-x-0' : 'fixed inset-y-0 left-0 -translate-x-full'} 
          md:relative md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-indigo-600">AdminPanel</h1>
          <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link 
            to="/admin" 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive('/admin') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard className="w-5 h-5 text-center" />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/admin/orders" 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive('/admin/orders') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <ShoppingCart className="w-5 h-5 text-center" />
            <span>Orders</span>
          </Link>
          <Link 
            to="/admin/users" 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive('/admin/users') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <Users className="w-5 h-5 text-center" />
            <span>Users</span>
          </Link>
          <Link 
            to="/admin/products" 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive('/admin/products') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <Box className="w-5 h-5 text-center" />
            <span>Products</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={()=>{
              navigate('/');
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 text-center" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0">
          <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-indigo-600">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 flex justify-between items-center ml-4 md:ml-0">
            <h2 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h2>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-indigo-600">
                <Bell className="w-5 h-5" />
              </button>
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.full_name} className="w-full h-full object-cover" />
                ) : (
                  user?.full_name.charAt(0).toUpperCase() || 'A'
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Area Content (rendered via Outlet) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
