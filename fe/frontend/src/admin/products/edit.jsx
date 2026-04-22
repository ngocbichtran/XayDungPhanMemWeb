import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./products.css";

function EditProduct() {

  const navigate = useNavigate();
  const { id } = useParams();

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
    fetchProduct();
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

  const fetchProduct = async () => {
    try {

      setLoading(true);

      const res = await axios.get(
        `https://xaydungphanmemweb-umwx.onrender.com/admin/products/${id}`
      );

      const data = res.data;

      setForm({
        category_id: data.category_id || "",
        name: data.name || "",
        price: data.price || "",
        sale_price: data.sale_price || "",
        quantity: data.quantity || "",
        description: data.description || "",
        image: data.image || "",
        status: data.status ?? 1
      });

    } catch (error) {

      console.error(error);
      alert("Không thể tải sản phẩm");

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
        `https://xaydungphanmemweb-umwx.onrender.com/admin/products/${id}`,
        form,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      alert("Cập nhật sản phẩm thành công");

      navigate("/products");

    } catch (error) {

      console.error(error);

      alert(
        "Lỗi khi cập nhật sản phẩm: " +
        (error.response?.data?.message || "Không xác định")
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="product-page">

      <h1 className="tieudetaosanpham">
        Chỉnh sửa sản phẩm
      </h1>

      <div className="product-card">

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >

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
                <option value="">
                  -- Chọn danh mục --
                </option>

                {categories.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
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
                value={form.name}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Số lượng</label>
              <input
                name="quantity"
                type="number"
                min="0"
                required
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
                value={form.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Giá khuyến mãi</label>
            <input
              name="sale_price"
              type="number"
              min="0"
              value={form.sale_price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid-2">

            <div className="form-group">
              <label>Trạng thái</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="1">
                  Hoạt động
                </option>
                <option value="0">
                  Ẩn
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>URL Hình ảnh</label>
              <input
                type="text"
                name="image"
                placeholder="https://..."
                value={form.image}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Preview image */}
          {form.image && (
            <div
              className="image-preview"
              style={{
                marginTop: "15px",
                textAlign: "center"
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "#666"
                }}
              >
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
              {loading
                ? "Đang cập nhật..."
                : "Cập nhật sản phẩm"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;