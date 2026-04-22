import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 1. NHẬP CỖ MÁY API
import { shopClient } from '../../../services/apiFactory';
import "./categories.css";
function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: 1
  });
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu cũ đổ vào form
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // 2. GỌI API LẤY CHI TIẾT BẰNG SHOPCLIENT
        const res = await shopClient.get(`/admin/categories/${id}`);
        
        // Vì shopClient đã bóc vỏ 1 lớp
        const c = res.data ? res.data : res; 

        setForm({
          name: c.name || "",
          description: c.description || "",
          status: Number(c.status) ?? 1
        });
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        alert("Không tìm thấy dữ liệu danh mục này!");
        navigate("/admin/categories");
      }
    };

    fetchCategory();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "status" ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Tên loại sản phẩm không được để trống");
      return;
    }

    setLoading(true);
    try {
      // 3. GỌI API CẬP NHẬT BẰNG SHOPCLIENT
      await shopClient.put(`/admin/categories/${id}`, form);
      
      alert("Cập nhật thành công!");
      
      // 4. ĐIỀU HƯỚNG VỀ ĐÚNG ĐƯỜNG DẪN ADMIN
      navigate("/admin/categories");
      
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Không thể cập nhật danh mục. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // 5. GIAO DIỆN TAILWIND ĐỒNG BỘ VỚI TRANG CREATE
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">✏️ Sửa Danh Mục</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Tên loại */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tên danh mục <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả chi tiết</label>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
          ></textarea>
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
          >
            <option value={1}>🟢 Đang hoạt động</option>
            <option value={0}>🔴 Ẩn</option>
          </select>
        </div>

        {/* Nút bấm */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t mt-8">
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Hủy bỏ
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded-lg font-medium transition-colors ${
              loading ? "bg-yellow-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {loading ? "Đang cập nhật..." : "🔄 Cập nhật"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default EditCategory;