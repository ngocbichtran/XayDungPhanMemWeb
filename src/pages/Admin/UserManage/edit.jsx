import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Bổ sung useParams bị thiếu
// 1. GỌI CỖ MÁY API VÀO
import { shopClient } from '../../../services/apiFactory'; 
import "./UserManage.css";

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 2. LẤY DỮ LIỆU BẰNG SHOPCLIENT
        const res = await shopClient.get(`/BASE_API/users/${id}`);
        const u = res.data ? res.data : res;
        
        setForm({
          name: u.name || ""
        });
      } catch (err) {
        console.error("Lỗi load user:", err);
        alert("Không tìm thấy user này!");
        navigate("/admin/users");
      }
    };

    fetchUser();
  }, [id, navigate]);

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

      // 3. CẬP NHẬT BẰNG SHOPCLIENT (Vẫn giữ trick _method: "PUT")
      await shopClient.post(`/BASE_API/users/${id}`, {
        ...form,
        _method: "PUT"
      });

      alert("Cập nhật user thành công");

      // 4. ĐIỀU HƯỚNG VỀ ĐÚNG TRANG ADMIN
      navigate("/admin/users");

    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Không thể cập nhật user. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // 5. GIAO DIỆN TAILWIND ĐỒNG BỘ
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6 content">
      
      <div className="top-bar mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">✏️ Sửa Thông Tin User</h2>
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
              loading ? "bg-yellow-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "🔄 Cập nhật"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default UserEdit;