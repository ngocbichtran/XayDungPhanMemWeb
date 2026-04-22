import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./products.css";

function CreateProduct() {
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://xaydungphanmemweb-umwx.onrender.com/admin/categories"
      );

      setCategories(res.data.data || res.data);
    } catch (error) {
      console.error("Lỗi load categories", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "https://xaydungphanmemweb-umwx.onrender.com/admin/products",
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert("Thêm sản phẩm thành công");
      navigate("/products");

    } catch (error) {
      console.error(error);
      alert(
        "Lỗi khi thêm sản phẩm: " +
        (error.response?.data?.message || "Không xác định")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-page">
      <h1 className="tieudetaosanpham">Tạo sản phẩm mới cho hệ thống</h1>

      <div className="product-card">
        <form className="product-form" onSubmit={handleSubmit}>

          {/* Category + Name */}
          <div className="grid-2">
            <div className="form-group">
              <label>Danh mục</label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Tên sản phẩm</label>
              <input
                name="name"
                type="text"
                required
                minLength="3"
                placeholder="Nhập tên sản phẩm"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Quantity + Price */}
          <div className="grid-2">
            <div className="form-group">
              <label>Số lượng</label>
              <input
                name="quantity"
                type="number"
                min="0"
                required
                placeholder="0"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Giá (VNĐ)</label>
              <input
                name="price"
                type="number"
                min="0"
                required
                placeholder="Ví dụ: 100000"
                value={form.price}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Sale price */}
          <div className="form-group">
            <label>Giá khuyến mãi</label>
            <input
              name="sale_price"
              type="number"
              min="0"
              placeholder="Để trống nếu không có"
              value={form.sale_price}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Thông tin chi tiết sản phẩm..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Status + Image */}
          <div className="grid-2">
            <div className="form-group">
              <label>Trạng thái</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="1">Hoạt động</option>
                <option value="0">Ẩn</option>
              </select>
            </div>

            <div className="form-group">
              <label>URL Hình ảnh</label>
              <input
                type="text"
                name="image"
                placeholder="Dán link ảnh (https://...)"
                value={form.image}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Preview image */}
          {form.image && (
            <div
              className="image-preview"
              style={{ marginTop: "15px", textAlign: "center" }}
            >
              <p style={{ fontSize: "13px", color: "#666" }}>
                Xem trước ảnh:
              </p>

              <img
                src={form.image}
                alt="preview"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: "10px",
                  border: "2px dashed #ccc",
                  padding: "5px"
                }}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/200?text=Link+ảnh+lỗi";
                }}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/products")}
            >
              Hủy
            </button>

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu sản phẩm"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateProduct;