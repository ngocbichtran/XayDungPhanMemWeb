import { useState } from "react";
import axios from "axios";
import "./products.css";

function CreateProduct() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    sale_price: "",
    quantity: "",
    description: "",
    image: null,
    status: "active"
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    axios.post("http://127.0.0.1:8000/api/products", data)
      .then(() => {
        alert("Thêm sản phẩm thành công");
      })
      .catch(err => console.log(err));
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

        <div className="form-buttons">
          <button type="button" className="btn-cancel">
            Cancel
          </button>

          <button type="submit" className="btn-submit">
            Lưu
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreateProduct;