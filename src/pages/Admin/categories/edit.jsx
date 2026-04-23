import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../products/products.css"; // ✅ dùng chung

function CategoryEdit({ id, onClose, onSuccess }) {

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: 1,
  });

  const [loading, setLoading] = useState(false);

  // ===== FETCH DETAIL =====
  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://xaydungphanmemweb-umwx.onrender.com/admin/categories/${id}`
      );

      const c = res.data?.data ?? res.data;

      setForm({
        name: c?.name || "",
        description: c?.description || "",
        status: c?.status != null ? +c.status : 1,
      });

    } catch (error) {
      console.error(error);
      alert("Không thể tải danh mục");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchCategory();
  }, [fetchCategory, id]);

  // ===== ESC =====
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, loading]);

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

    try {
      setLoading(true);

      await axios.put(
        `https://xaydungphanmemweb-umwx.onrender.com/admin/categories/${id}`,
        form
      );

      alert("Cập nhật thành công");

      onSuccess && onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Không thể cập nhật");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={!loading ? onClose : undefined}
    >

      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >



        {/* TITLE */}
        <h2 className="tieudetaosanpham">
          Chỉnh sửa danh mục
        </h2>

        {/* BODY */}
        <div className="product-page">

          <div className="product-card">

            <form onSubmit={handleSubmit} className="product-form">

              {/* GRID 2 */}
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
                  disabled={loading}
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading}
                >
                  {loading ? "Đang cập nhật..." : "Cập nhật"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CategoryEdit;