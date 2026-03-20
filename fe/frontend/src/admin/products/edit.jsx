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
    sale_price: "",
    quantity: "",
    description: "",
    image: null,
    status: 1
  });
  const [loading, setLoading] = useState(false);

  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {

    axios.get(`https://xaydungphanmemweb-umwx.onrender.com/admin/products/${id}`)
      .then(res => {

        const p = res.data;

        setForm({
          name: p.name || "",
          price: p.price || "",
          sale_price: p.sale_price || "",
          quantity: p.quantity || "",
          description: p.description || "",
          image: null,
          status: p.status ?? 1
        });

        if (p.image) {
          setCurrentImage(`https://xaydungphanmemweb-umwx.onrender.com/storage/${p.image}`);
        }

      })
      .catch(err => console.log(err));

  }, [id]);

  const handleChange = (e) => {
    setLoading(true);
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("_method", "PUT");
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("sale_price", form.sale_price);
    data.append("quantity", form.quantity);
    data.append("description", form.description);
    data.append("status", form.status);

    if (form.image) {
      data.append("image", form.image);
    }

    axios.post(
      `https://xaydungphanmemweb-umwx.onrender.com/admin/products/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
      .then(() => {

        alert("Cập nhật thành công");
        navigate("/products");

      })
      .catch(err => {
        console.log(err.response)
          .finally(() => setLoading(false));;
      });

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
            required
          />
        </div>

        <div className="grid-2">

          <div>
            <label>Giá</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Giá khuyến mãi</label>
            <input
              type="number"
              name="sale_price"
              value={form.sale_price}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="grid-2">

          <div>
            <label>Số lượng</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />
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

          {currentImage && (

            <div className="current-img">

              <p>Ảnh hiện tại:</p>

              <img
                src={currentImage}
                alt="product"
                width="120"
              />

            </div>

          )}

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
            className="btn-save"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>

        </div>

      </form>

    </div>

  );

}

export default EditProduct;