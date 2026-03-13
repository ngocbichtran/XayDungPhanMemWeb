import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./userstest.css";

function UsersIndex() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
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
      });
  }, []);

  return (
    <div className="content">

      <div className="top-bar">
        <h1>Danh sách users</h1>

        <Link to="/users/create">
          <button className="btn-add">
            + Thêm user
          </button>
        </Link>
      </div>

      <div className="table-box">

        <table className="product-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {users.map((p) => (
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
                  <button className="delete">Xóa</button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UsersIndex;