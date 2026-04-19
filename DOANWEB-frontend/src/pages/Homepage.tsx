import { useState, useEffect } from 'react';
import { 
  ArrowRight, Sparkles, TrendingUp, ShieldCheck, 
  Truck, Headset, Zap
} from 'lucide-react';
import api from '../api/axios';
import type { ProductClient } from '../types';
import Header from '../components/Header';

export default function Homepage() {
  const [products, setProducts] = useState<ProductClient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await api.get('/products.php');
        if (response.data.success) {
          setProducts(response.data.data.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-200/20 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full text-indigo-600 mb-8 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">New Season Arrival</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter mb-8 leading-[0.9]">
            Design Your <span className="text-indigo-600 italic">Digital</span> <br /> 
            Lifestyle with Ease
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
            Discover the future of technology with our curated collection of premium gadgets and electronics. Built for performance, designed for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/products'}
              className="w-full sm:w-auto bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-gray-200 flex items-center justify-center hover:bg-black transition-all group active:scale-95"
            >
              Shop Collection 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white text-gray-900 px-10 py-5 rounded-2xl font-black text-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-all active:scale-95">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white rounded-[40px] sm:rounded-[80px] shadow-sm relative z-10 mx-4 sm:mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-black uppercase tracking-widest">Trending Now</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Featured Products</h2>
            </div>
            <button 
              onClick={() => window.location.href = '/products'}
              className="text-indigo-600 font-black flex items-center group"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse bg-gray-50 rounded-3xl h-96"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((prod) => (
                <div key={prod.id} className="group cursor-pointer">
                  <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden mb-6 group-hover:shadow-2xl group-hover:shadow-indigo-100 transition-all duration-500">
                    {prod.image ? (
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300 bg-gray-100">
                        <Zap className="w-12 h-12" />
                      </div>
                    )}
                    {Number(prod.sale_price) > 0 && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg shadow-red-200">
                        Sale
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{prod.name}</h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-black text-gray-900">
                      {formatCurrency(Number(prod.sale_price) > 0 ? prod.sale_price : prod.price)}
                    </span>
                    {Number(prod.sale_price) > 0 && (
                      <span className="text-sm text-gray-400 line-through font-bold">
                        {formatCurrency(prod.price)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-white shadow-xl shadow-gray-100 rounded-2xl flex items-center justify-center text-indigo-600 border border-gray-50">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Express Shipping</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Get your favorite products delivered to your doorstep within 24 hours in major cities across the country.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 bg-white shadow-xl shadow-gray-100 rounded-2xl flex items-center justify-center text-indigo-600 border border-gray-50">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Secure Payment</h3>
            <p className="text-gray-500 font-medium leading-relaxed">We use state-of-the-art encryption to ensure your payment information is always safe and secure.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 bg-white shadow-xl shadow-gray-100 rounded-2xl flex items-center justify-center text-indigo-600 border border-gray-50">
              <Headset className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">24/7 Support</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Our dedicated support team is always available to help you with any questions or issues you may have.</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-20 rounded-t-[40px] sm:rounded-t-[80px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black tracking-tighter mb-8">DOAN<span className="text-indigo-500">WEB</span></h2>
          <p className="text-gray-400 mb-12 max-w-md mx-auto">Providing the best tech solutions for your modern lifestyle. Quality and performance guaranteed.</p>
          <div className="flex justify-center space-x-6 text-gray-500 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
          <div className="mt-12 pt-12 border-t border-gray-800 text-xs font-bold text-gray-600 uppercase tracking-[0.2em]">
            © 2026 DOANWEB. CREATED WITH PASSION.
          </div>
        </div>
      </footer>
    </div>
  );
}
