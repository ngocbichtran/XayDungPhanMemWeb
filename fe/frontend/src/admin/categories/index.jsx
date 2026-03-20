import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./categories.css";

function CategoriesIndex() {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios.get("https://xaydungphanmemweb-umwx.onrender.com/admin/categories")
      .then(res => {

        const result = res.data.data ? res.data.data : res.data;
        setCategories(Array.isArray(result) ? result : []);

      })
      .catch(err => {
        console.error("Lỗi:", err.response || err);
      })
      .finally(() => {
        setLoading(false);
      });

  };

  const handleDelete = (id) => {

    if (!window.confirm("Bạn có chắc muốn xóa category này?")) {
      return;
    }

    axios.delete(`https://xaydungphanmemweb-umwx.onrender.com/admin/categories/${id}`)
      .then(() => {

        alert("Xóa thành công");

        setCategories(categories.filter(c => c.id !== id));

      })
      .catch(err => {

        console.error("Lỗi xóa:", err.response || err);
        alert("Không thể xóa");

      });

  };

  return (
    <div className="content">

      <div className="top-bar">
        <h1>Danh sách category</h1>

        <Link to="/categories/create">
          <button className="btn-add">
            + Thêm loại
          </button>
        </Link>
      </div>

      <div className="table-box">
        {loading ? (
          <div className="loading">
            Đang tải dữ liệu...
          </div>
        ) : (

          <table className="product-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Trạng thái</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>
                    {c.status == 1 ? (
                      <span className="status-active">
                        Hoạt động
                      </span>
                    ) : (
                      <span className="status-hide">
                        Ẩn
                      </span>
                    )}
                  </td>

                  <td>{c.description}</td>

                  <td className="actions">

                    <button
                      className="edit"
                      onClick={() => navigate(`/categories/edit/${c.id}`)}
                    >
                      Sửa
                    </button>

                    <button
                      className="delete"
                      onClick={() => handleDelete(c.id)}
                    >
                      Xóa
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