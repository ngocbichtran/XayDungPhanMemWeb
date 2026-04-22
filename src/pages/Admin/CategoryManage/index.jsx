import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. GỌI CỖ MÁY API VÀO
import { shopClient } from '../../../services/apiFactory';
import "./categories.css";
function CategoriesIndex() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      // 2. GỌI API BẰNG SHOPCLIENT
      const res = await shopClient.get("/admin/categories");
      
      // Vì shopClient đã bóc vỏ 1 lớp, ta kiểm tra xem dữ liệu nằm ở đâu
      const result = res.data ? res.data : res; 
      setCategories(Array.isArray(result) ? result : []);
      
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      return;
    }

    try {
      // 3. XÓA BẰNG SHOPCLIENT
      await shopClient.delete(`/admin/categories/${id}`);
      alert("Xóa thành công");
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      console.error("Lỗi xóa:", err);
      alert("Không thể xóa danh mục này!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">📂 Quản lý Danh mục</h1>

        {/* 4. SỬA ĐƯỜNG DẪN THÊM MỚI CO /admin/ */}
        <Link to="/admin/categories/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
            <span>+</span> Thêm danh mục
          </button>
        </Link>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Đang tải dữ liệu...</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-10 text-gray-500 italic">
            Chưa có danh mục nào. Hãy thêm mới!
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b">
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Tên Danh Mục</th>
                <th className="py-3 px-4 font-semibold">Trạng thái</th>
                <th className="py-3 px-4 font-semibold">Mô tả</th>
                <th className="py-3 px-4 font-semibold text-center">Hành động</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-600 font-medium">#{c.id}</td>
                  <td className="py-3 px-4 text-gray-800 font-bold">{c.name}</td>
                  <td className="py-3 px-4">
                    {c.status == 1 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        🟢 Hoạt động
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                        🔴 Đã ẩn
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-sm max-w-xs truncate">
                    {c.description || "Không có mô tả"}
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    
                    {/* 5. SỬA ĐƯỜNG DẪN SỬA CÓ /admin/ */}
                    <button
                      className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                      onClick={() => navigate(`/admin/categories/edit/${c.id}`)}
                    >
                      ✏️ Sửa
                    </button>

                    <button
                      className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                      onClick={() => handleDelete(c.id)}
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

export default CategoriesIndex;