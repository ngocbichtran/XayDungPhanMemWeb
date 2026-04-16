import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Star, Heart, Image as ImageIcon, 
  ChevronRight, Filter, SortAsc, LayoutGrid, List
} from 'lucide-react';
import api from '../api/axios';
import type { ProductClient } from '../types';
import Header from '../components/Header';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/products.php');
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-16">
        
        {/* Banner Section */}
        <section className="relative h-64 sm:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
            alt="Products Banner" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 blur-[2px] contrast-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-center px-12">
            <nav className="flex items-center space-x-2 text-white/70 tracking-widest text-[10px] sm:text-xs font-black uppercase mb-4">
              <span>Home</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
              <span className="text-white">All Products</span>
            </nav>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter mb-4 max-w-2xl drop-shadow-lg">
              Elevate Your <span className="text-indigo-400">Shopping Experience</span>
            </h1>
            <p className="text-white/80 max-w-lg font-medium drop-shadow-md text-sm sm:text-lg">
              Explore our wide range of high-quality products curated specifically for your needs.
            </p>
          </div>
        </section>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 ring-1 ring-black/5">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all font-bold text-gray-700 text-sm active:scale-95">
              <Filter className="w-4 h-4" /> <span>Filters</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all font-bold text-gray-700 text-sm active:scale-95">
              <SortAsc className="w-4 h-4" /> <span>Sort By</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Display */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse h-80">
                <div className="bg-gray-200 rounded-2xl h-48 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
            <p className="text-gray-500 font-bold text-xl">No products found</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" : "flex flex-col space-y-6"}>
            {products.map((prod) => (
              <div 
                key={prod.id} 
                className={`group bg-white rounded-3xl p-4 shadow-sm border border-gray-100 ring-1 ring-black/5 hover:ring-indigo-200 hover:-translate-y-1 transition-all duration-300 ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 h-auto sm:h-56' : 'h-auto'
                }`}
              >
                {/* Product Image Area */}
                <div className={`relative bg-gray-50 rounded-2xl overflow-hidden group-hover:scale-[0.98] transition-transform ${
                  viewMode === 'list' ? 'w-full sm:w-48 flex-shrink-0' : 'h-52 mb-4 block'
                }`}>
                  {prod.image ? (
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}

                  {Number(prod.sale_price) > 0 && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg shadow-xl shadow-red-200 drop-shadow-md">
                      Sale OFF
                    </div>
                  )}

                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur shadow-sm rounded-xl text-gray-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 active:scale-90">
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>

                {/* Product Text Area */}
                <div className={`flex flex-col justify-between ${viewMode === 'list' ? 'flex-1 py-1' : ''}`}>
                  <div>
                    <div className="flex items-center space-x-1 mb-1.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 text-yellow-400 fill-current" />)}
                      <span className="text-[10px] font-bold text-gray-400 ml-1">(24 Reviews)</span>
                    </div>
                    <h3 className="text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1 truncate max-w-full">{prod.name}</h3>
                    <p className={`text-gray-500 text-xs font-medium mt-1 line-clamp-2 ${viewMode === 'list' ? 'mb-4' : 'mb-3'}`}>{prod.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {Number(prod.sale_price) > 0 ? (
                        <div className="flex flex-col">
                          <span className="text-xl font-black text-indigo-600 leading-none">{formatCurrency(prod.sale_price)}</span>
                          <span className="text-xs text-gray-400 line-through mt-0.5">{formatCurrency(prod.price)}</span>
                        </div>
                      ) : (
                        <span className="text-xl font-black text-gray-900 leading-none">{formatCurrency(prod.price)}</span>
                      )}
                    </div>

                    <button className="flex items-center justify-center w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm active:scale-90 group/btn">
                      <ShoppingBag className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black text-gray-900 tracking-tighter">
              DOAN<span className="text-indigo-600">WEB</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm">© 2026 DOANWEB - Modern Shopping Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
