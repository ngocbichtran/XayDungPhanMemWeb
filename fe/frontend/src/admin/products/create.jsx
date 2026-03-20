import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./products.css";

function CreateProduct() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    sale_price: "",
    quantity: "",
    description: "",
    image: null,
    status: 1
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();

      data.append("name", form.name);
      data.append("price", form.price);
      data.append("sale_price", form.sale_price);
      data.append("quantity", form.quantity);
      data.append("description", form.description);
      data.append("status", form.status);

      if (form.image) {
        data.append("image", form.image);
      }

      await axios.post(
        "https://xaydungphanmemweb-umwx.onrender.com/admin/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Thêm sản phẩm thành công");

      navigate("/products");

    } catch (error) {
      console.log(error);
      alert("Lỗi khi thêm sản phẩm");
    }
    finally {

      setLoading(false);

    }
  };

  return (
    <div className="product-container">

      <h3 className="title">Add New Product</h3>

      <form className="product-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Product Name</label>
          <input
            name="name"
            type="text"
            required
            minLength="3"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid-2">

          <div className="form-group">
            <label>Price</label>
            <input
              name="price"
              type="number"
              step="0.1"
              min="0"
              required
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Sale Price</label>
            <input
              name="sale_price"
              type="number"
              min="0"
              value={form.sale_price}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-group">
          <label>Quantity</label>
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
          <label>Description</label>
          <textarea
            name="description"
            maxLength="1000"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="1">Active</option>
            <option value="0">Hidden</option>
          </select>
        </div>

        <div className="form-buttons">

          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/products")}
          >
            Cancel
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

export default CreateProduct;