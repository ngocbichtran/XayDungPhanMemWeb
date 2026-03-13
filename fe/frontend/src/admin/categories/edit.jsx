import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./categories.css";

function EditCategory() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    status: 1
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/admin/categories/${id}`)
      .then(res => {

        const c = res.data.data ? res.data.data : res.data;

        setForm({
          name: c.name || "",
          status: c.status ?? 1
        });

      })
      .catch(err => console.log(err));

  }, [id]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    axios.put(`http://127.0.0.1:8000/admin/categories/${id}`, form)
      .then(() => {
        alert("Cập nhật thành công");
        navigate("/categories");
      })
      .catch(err => console.log(err));

  };

  return (
    <div className="category-container">

      <h2>Sửa loại sản phẩm</h2>

      <form onSubmit={handleSubmit} className="category-form">

        <div className="mb-3">
          <label>Tên loại</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Trạng thái</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="1">Hiển thị</option>
            <option value="0">Ẩn</option>
          </select>

        </div>

        <button className="btn-save">
          Cập nhật
        </button>

      </form>

    </div>
  );
}

export default EditCategory;