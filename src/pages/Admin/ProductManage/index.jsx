import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. GỌI CỖ MÁY API VÀO
import { shopClient } from '../../../services/apiFactory'; 
import "./ProductManage.css";

function ProductIndex() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // 2. GỌI API BẰNG SHOPCLIENT
      const res = await shopClient.get("/admin/products");
      
      // Bóc vỏ dữ liệu an toàn hơn
      // Nếu apiFactory đã có interceptor trả về .data, thì res chính là mảng sản phẩm
      const result = res.data ? res.data : res;
      
      // Ép kiểu về mảng để không bị lỗi .map()
      setProducts(Array.isArray(result) ? result : []);

    } catch (err) {
      console.error("Lỗi lấy danh sách sản phẩm:", err);
      setProducts([]); // Tránh lỗi giao diện
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      return;
    }

    try {
      await shopClient.delete(`/admin/products/${id}`);
      alert("Xóa thành công");
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error("Lỗi xóa:", err);
      alert("Không thể xóa sản phẩm");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 content">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4 top-bar">
        <h1 className="text-2xl font-bold text-gray-800">📦 Danh sách Sản phẩm</h1>

        <Link to="/admin/products/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 btn-add">
            <span>+</span> Thêm sản phẩm
          </button>
        </Link>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto table-box">
        {loading ? (
          <div className="flex justify-center items-center py-10 loading">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-500 italic">
            Chưa có sản phẩm nào hoặc lỗi kết nối. Hãy thêm mới!
          </div>
        ) : (
          <table className="w-full text-left border-collapse product-table">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b">
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Tên</th>
                <th className="py-3 px-4 font-semibold">Giá</th>
                <th className="py-3 px-4 font-semibold">Giá KM</th>
                <th className="py-3 px-4 font-semibold text-center">Hình ảnh</th>
                <th className="py-3 px-4 font-semibold text-center">Trạng thái</th>
                <th className="py-3 px-4 font-semibold text-center">Hành động</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-600 font-medium">#{p.id}</td>
                  <td className="py-3 px-4 text-gray-800 font-bold">{p.name}</td>
                  <td className="py-3 px-4 text-red-600 font-semibold">{Number(p.price).toLocaleString()} đ</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">{p.sale_price ? Number(p.sale_price).toLocaleString() + ' đ' : '-'}</td>

                  <td className="py-3 px-4 text-center">
                    {p.image ? (
                      <img
                        /* CHỖ SỬA QUAN TRỌNG: Ép link ảnh sang https để hiện trên Netlify */
                        src={p.image.replace('http://', 'https://')}
                        className="w-12 h-12 object-cover rounded-md border mx-auto product-img"
                        alt="product"
                        onError={(e) => { e.target.src = 'https://placehold.co/50x50?text=No+Image'; }}
                      />
                    ) : (
                      <span className="text-xs text-gray-400 italic no-img">Không có ảnh</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-center">
                    {p.status == 1 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold status-active">Hoạt động</span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold status-hide">Ẩn</span>
                    )}
                  </td>
                  
                  <td className="py-3 px-4 flex justify-center gap-2 actions">
                    <button 
                      className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors edit" 
                      onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                    >
                      ✏️ Sửa
                    </button>

                    <button 
                      className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors delete" 
                      onClick={() => handleDelete(p.id)}
                    >
                      🗑️ Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductIndex;