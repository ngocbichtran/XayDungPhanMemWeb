import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./categories.css";

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
      await axios.post(
        "https://xaydungphanmemweb-umwx.onrender.com/admin/categories",
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert("Thêm loại sản phẩm thành công");

      navigate("/categories");

    } catch (error) {

      console.error("Lỗi:", error.response || error);

      alert("Không thể thêm loại sản phẩm");

    }
    finally {

      setLoading(false);

    }

  };

  return (
    <div className="category-container">

      <h2>Thêm loại sản phẩm</h2>

      <form onSubmit={handleSubmit} className="category-form">

        <div className="form-group">
          <label>Tên loại</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Trạng thái</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value={1}>Hoạt động</option>
            <option value={0}>Ẩn</option>
          </select>
        </div>

        <div className="form-buttons">

          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/categories")}
          >
            Hủy
          </button>

          <button
            type="submit"
            className="btn-save"
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default CategoryCreate;