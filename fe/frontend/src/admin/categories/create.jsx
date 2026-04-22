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
      alert("Tên danh mục không được để trống");
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

      alert("Thêm danh mục thành công");

      navigate("/categories");

    } catch (error) {

      console.error(error);
      alert("Không thể thêm danh mục");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="product-page">

      <h1 className="tieudetaosanpham">
        Tạo danh mục mới
      </h1>

      <div className="product-card">

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >

          {/* Name */}
          <div className="form-group">
            <label>Tên danh mục</label>
            <input
              type="text"
              name="name"
              placeholder="Nhập tên danh mục"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Mô tả danh mục..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Status */}
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

          {/* Buttons */}
          <div className="form-actions">

            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/categories")}
            >
              Hủy
            </button>

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu danh mục"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CategoryCreate;