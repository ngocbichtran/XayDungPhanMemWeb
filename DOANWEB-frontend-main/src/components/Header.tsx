import { Link, useNavigate } from 'react-router-dom';
import { 
   Search, Menu, X, 
  ShieldCheck, User as LogIn, ShoppingBag
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isAdmin = user?.roles.includes('admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tighter">
              DOAN<span className="text-indigo-600">WEB</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/homepage" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/products" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Products</Link>
            <Link to="/categories" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">Categories</Link>
            <Link to="/about" className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors">About</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop only icon */}
            <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <Search className="w-5 h-5" />
            </button>

            {isAdmin && (
              <Link to="/admin" className="hidden lg:flex items-center text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-2 rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100">
                <ShieldCheck className="w-4.5 h-4.5 mr-1.5" /> Admin Panel
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-3 bg-gray-50 pl-1 pr-4 py-1 rounded-full border border-gray-100 group relative cursor-default">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.full_name} className="w-full h-full object-cover" />
                  ) : (
                    user.full_name.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] font-black text-gray-900 tracking-tight leading-none uppercase">{user.full_name}</p>
                  <button 
                    onClick={handleLogout}
                    className="text-[9px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest mt-0.5 flex items-center"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-sm font-bold text-white bg-gray-900 hover:bg-black px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95">
                <LogIn className="w-4 h-4 mr-2" /> Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="p-4 space-y-4">
            <Link to="/homepage" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-lg font-bold text-gray-700 hover:bg-indigo-50 rounded-xl">Home</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-lg font-bold text-gray-700 hover:bg-indigo-50 rounded-xl">Products</Link>
            <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-lg font-bold text-gray-700 hover:bg-indigo-50 rounded-xl">Categories</Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-lg font-bold text-indigo-600 bg-indigo-50 rounded-xl">Admin Panel</Link>
            )}
            {user && (
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-lg font-bold text-red-600 hover:bg-red-50 rounded-xl"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
