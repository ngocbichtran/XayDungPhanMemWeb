import { useState } from "react";
import { useNavigate } from "react-router-dom";
// 1. NHẬP CỖ MÁY API (Sửa lại số lượng dấu ../ cho đúng vị trí file của bạn)
import { shopClient } from '../../../services/apiFactory'; 

function CategoryCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: 1
  });
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      
      // 2. GỌI API BẰNG CỖ MÁY MỚI (Cực kỳ ngắn gọn, không cần ghi link gốc)
      await shopClient.post("/admin/categories", form);

      alert("Thêm loại sản phẩm thành công");
      
      // 3. ĐIỀU HƯỚNG VỀ ĐÚNG ĐƯỜNG DẪN ADMIN
      navigate("/admin/categories");

    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể thêm loại sản phẩm. Vui lòng kiểm tra lại!");
    } finally {
      setLoading(false);
    }
  };

  // 4. GIAO DIỆN ĐÃ ĐƯỢC TÂN TRANG BẰNG TAILWIND CSS
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Thêm Danh Mục Mới</h2>

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
            placeholder="Ví dụ: Áo thun nam"
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
            placeholder="Nhập mô tả cho danh mục này..."
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
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Đang lưu dữ liệu..." : "💾 Lưu Danh Mục"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default CategoryCreate;