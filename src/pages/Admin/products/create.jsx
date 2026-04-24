import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./products.css";

function CreateProduct({ onClose, onSuccess }) {

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    price: "",
    sale_price: "",
    quantity: "",
    description: "",
    image: "",
    status: 1
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===== FETCH CATEGORY =====
  const fetchCategories = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://xaydungphanmemweb-umwx.onrender.com/admin/categories"
      );
      setCategories(res.data?.data ?? res.data);
    } catch (error) {
      console.error("Lỗi load categories", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ===== HANDLE CHANGE =====
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        ["status", "category_id", "price", "sale_price", "quantity"].includes(name)
          ? value === "" ? "" : +value
          : value
    }));
  }, []);

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "https://xaydungphanmemweb-umwx.onrender.com/admin/products",
        form
      );

      alert("Thêm sản phẩm thành công");

      onSuccess && onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert(
        "Lỗi: " +
        (error.response?.data?.message || "Không xác định")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal-content">

        {/* TITLE */}
        <h2 className="tieudetaosanpham">
          Tạo sản phẩm
        </h2>

        {/* BODY */}
        <div className="product-page">

          <div className="product-card">

            <form onSubmit={handleSubmit} className="product-form">

              {/* GRID 3 */}
              <div className="grid-3">

                <div className="form-group">
                  <label>Danh mục</label>
                  <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Chọn --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Số lượng</label>
                  <input
                    name="quantity"
                    type="number"
                    value={form.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Giá</label>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Giá KM</label>
                  <input
                    name="sale_price"
                    type="number"
                    value={form.sale_price}
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

              </div>

              {/* DESCRIPTION */}
              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  rows="2"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* IMAGE */}
              <div className="grid-2">

                <div className="form-group">
                  <label>URL ảnh</label>
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                  />
                </div>

                {form.image && (
                  <div className="image-preview">
                    <img
                      src={form.image}
                      alt="preview"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/150?text=Error";
                      }}
                    />
                  </div>
                )}

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

export default CreateProduct;