import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. GỌI CỖ MÁY API VÀO
import { shopClient } from '../../../services/apiFactory'; 
import "./UserManage.css";

function UsersIndex() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 2. GỌI API BẰNG CỖ MÁY (Giữ đúng chuẩn đuôi BASE_API của bạn)
      const res = await shopClient.get("/BASE_API/users");
      
      const result = res.data ? res.data : res;
      setUsers(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Lỗi chi tiết:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này không?")) return;

    try {
      // 3. XÓA BẰNG CỖ MÁY API
      await shopClient.delete(`/BASE_API/users/${id}`);
      
      setUsers(prev => prev.filter(u => u.id !== id));
      alert("Xóa thành công");
    } catch (err) {
      console.error("Lỗi xóa:", err);
      alert("Xóa thất bại");
    }
  };

  // 4. ĐẮP GIAO DIỆN TAILWIND ĐỒNG BỘ
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 content">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4 top-bar">
        <h1 className="text-2xl font-bold text-gray-800">👥 Danh sách Users</h1>

        {/* 5. SỬA ĐƯỜNG DẪN THÊM MỚI CÓ /admin/ */}
        <Link to="/admin/users/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 btn-add">
            <span>+</span> Thêm user
          </button>
        </Link>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto table-box">
        {loading ? (
          <div className="flex justify-center items-center py-10 loading">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Đang tải danh sách user...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 text-gray-500 italic">
            Chưa có user nào.
          </div>
        ) : (
          <table className="w-full text-left border-collapse product-table">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b">
                <th className="py-3 px-4 font-semibold w-24">ID</th>
                <th className="py-3 px-4 font-semibold">Tên User</th>
                <th className="py-3 px-4 font-semibold text-center w-48">Hành động</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-600 font-medium">#{p.id}</td>
                  <td className="py-3 px-4 text-gray-800 font-bold">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {p.name ? p.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      {p.name}
                    </div>
                  </td>

                  <td className="py-3 px-4 flex justify-center gap-2 actions">
                    {/* 6. SỬA ĐƯỜNG DẪN SỬA CÓ /admin/ */}
                    <button
                      className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors edit"
                      onClick={() => navigate(`/admin/users/edit/${p.id}`)}
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

export default UsersIndex;