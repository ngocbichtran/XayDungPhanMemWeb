import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./categories.css";

function CategoryCreate() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: 1
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://127.0.0.1:8000/admin/categories", form)
      .then(() => {
        alert("Thêm loại sản phẩm thành công");
        navigate("/categories");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="category-container">

      <h2>Thêm loại sản phẩm</h2>

      <form onSubmit={handleSubmit} className="category-form">

        <div>
          <label>Tên loại</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mô tả</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
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

        <button type="submit" className="btn-save">
          Lưu
        </button>

      </form>

    </div>
  );
}

export default CategoryCreate;