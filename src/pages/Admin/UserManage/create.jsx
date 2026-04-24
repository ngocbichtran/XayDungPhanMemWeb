import { useState } from "react";
import { useNavigate } from "react-router-dom";
// 1. GỌI CỖ MÁY API VÀO
import { shopClient } from '../../../services/apiFactory'; 
import "./UserManage.css";

function UserCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Tên user không được để trống");
      return;
    }

    try {
      setLoading(true);

      // 2. THÊM MỚI BẰNG SHOPCLIENT
      await shopClient.post("/BASE_API/users", form);

      alert("Thêm user thành công");

      // 3. ĐIỀU HƯỚNG VỀ ĐÚNG TRANG DANH SÁCH
      navigate("/admin/users");

    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể thêm user. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // 4. GIAO DIỆN TAILWIND ĐỒNG BỘ
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6 content">
      
      <div className="top-bar mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">🆕 Thêm User Mới</h2>
      </div>

      <form className="space-y-6 form-box" onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tên user <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            placeholder="Nhập tên user..."
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t mt-8 form-actions">
          <button
            type="button"
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors btn-cancel"
            onClick={() => navigate("/admin/users")}
          >
            Hủy bỏ
          </button>

          <button
            type="submit"
            className={`px-6 py-2 text-white rounded-lg font-medium transition-colors btn-save ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "💾 Lưu User"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default UserCreate;