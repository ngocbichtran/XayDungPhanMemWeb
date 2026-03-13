import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./products.css";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
    image_url: "",
    status: 1
  });

  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/admin/products/${id}`)
      .then(res => {
        const p = res.data;

        setForm({
          name: p.name || "",
          price: p.price || "",
          quantity: p.quantity || "",
          description: p.description || "",
          image: null,
          image_url: "",
          status: p.status
        });

        setCurrentImage(p.image);
      })
      .catch(err => console.log(err));
  }, [id]);

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

    axios.post(`http://127.0.0.1:8000/admin/products/${id}?_method=PUT`, data)
      .then(() => {
        alert("Cập nhật thành công");
        navigate("/products");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="product-form-container">

      <h1 className="form-title">Cập nhật sản phẩm</h1>

      <form className="product-form" onSubmit={handleSubmit}>

        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="grid-2">

          <div>
            <label>Giá</label>
            <input
              type="number"
              step="0.1"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Số lượng</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

        </div>

        <div>
          <label>Mô tả</label>
          <textarea
            rows="4"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="image-box">

          <label>Hình ảnh</label>

          <input
            type="file"
            name="image"
            onChange={handleChange}
          />

          <div className="divider">— hoặc —</div>

          <input
            type="text"
            name="image_url"
            placeholder="Nhập link ảnh hoặc base64"
            value={form.image_url}
            onChange={handleChange}
          />

          {currentImage && (
            <div className="current-img">
              <p>Ảnh hiện tại:</p>
              <img src={currentImage} alt="" />
            </div>
          )}

        </div>

        <div>
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
          >
            Cập nhật
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditProduct;