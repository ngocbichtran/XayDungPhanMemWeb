import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `https://xaydungphanmemweb-umwx.onrender.com/admin/categories/${id}`
      );

      const c = res.data.data ? res.data.data : res.data;

      setForm({
        name: c.name || "",
        description: c.description || "",
        status: Number(c.status) ?? 1
      });

    } catch (error) {

      console.error(error);
      alert("Không thể tải danh mục");

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "status" ? Number(value) : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.put(
        `https://xaydungphanmemweb-umwx.onrender.com/admin/categories/${id}`,
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert("Cập nhật danh mục thành công");

      navigate("/categories");

    } catch (error) {

      console.error(error);
      alert("Không thể cập nhật danh mục");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="product-page">

      <h2 className="tieudetaosanpham">
        Chỉnh sửa danh mục
      </h2>

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
              required
              placeholder="Nhập tên danh mục"
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
              {loading
                ? "Đang cập nhật..."
                : "Cập nhật danh mục"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditCategory;