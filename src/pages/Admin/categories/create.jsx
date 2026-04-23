import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import "../products/products.css";

function CategoryCreate({ onClose, onSuccess }) {

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: 1,
  });

  const [loading, setLoading] = useState(false);

  // ===== ESC để đóng =====
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // ===== CHANGE =====
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "status" ? +value : value,
    }));
  }, []);

  // ===== SUBMIT =====
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
        form
      );

      alert("Thêm danh mục thành công");

      onSuccess && onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Không thể thêm danh mục");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        {/* TITLE */}
        <h2 className="tieudetaosanpham">
          Tạo danh mục
        </h2>

        {/* BODY */}
        <div className="product-page">

          <div className="product-card">

            <form onSubmit={handleSubmit} className="product-form">

              {/* GRID 2 cho gọn */}
              <div className="grid-2">

                <div className="form-group">
                  <label>Tên danh mục</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
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

              </div>

              {/* DESCRIPTION */}
              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* BUTTON */}
              <div className="form-actions">

                <button
                  type="button"
                  onClick={onClose}
                  className="btn-cancel"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading}
                >
                  {loading ? "Đang lưu..." : "Lưu"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CategoryCreate;