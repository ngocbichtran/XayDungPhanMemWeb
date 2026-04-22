import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./userstest.css";

function UsersIndex() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {

    if (!window.confirm("Bạn có chắc muốn xóa user này không?")) return;

    axios.delete(`https://xaydungphanmemweb-umwx.onrender.com/BASE_API/users/${id}`)
      .then(() => {

        setUsers(prev => prev.filter(u => u.id !== id));

        alert("Xóa thành công");

      })
      .catch(err => {
        console.error("Lỗi xóa:", err.response || err);
        alert("Xóa thất bại");
      });

  };

  useEffect(() => {
    setLoading(true);

    axios.get("https://xaydungphanmemweb-umwx.onrender.com/BASE_API/users", {
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {

        const result = res.data.data ? res.data.data : res.data;
        setUsers(Array.isArray(result) ? result : []);

      })
      .catch(err => {
        console.error("Lỗi chi tiết:", err.response || err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  // search filter
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content">
      <div className="top-bar">
        <h1>Quản lý người dùng hệ thống</h1>
        <Link to="/users/create">
          <button className="btn-add">
            + Thêm user
          </button>
        </Link>
      </div>
      <div className="table-header">
        <input
          type="text"
          placeholder=" Tìm user..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="table-box">

        {loading ? (
          <div className="loading">
            Đang tải danh sách user...
          </div>
        ) : (

          <table className="product-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>

                  <td className="actions">

                    <button
                      className="edit"
                      onClick={() => navigate(`/users/edit/${p.id}`)}
                    >
                      Sửa
                    </button>

                    <button
                      className="delete"
                      onClick={() => handleDelete(p.id)}
                    >
                      Xóa
                    </button>

                  </td>

                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="3" className="empty">
                    Không tìm thấy user
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default UsersIndex;