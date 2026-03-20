import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./categories.css";

function EditCategory() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: 1
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    axios.get(`https://xaydungphanmemweb-umwx.onrender.com/admin/categories/${id}`)
      .then(res => {

        const c = res.data.data ? res.data.data : res.data;

        setForm({
          name: c.name || "",
          description: c.description || "",
          status: Number(c.status) ?? 1
        });

      });

  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "status" ? Number(value) : value
    });

  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    axios.put(`https://xaydungphanmemweb-umwx.onrender.com/admin/categories/${id}`, form)
      .then(() => {

        alert("Cập nhật thành công");

        navigate("/categories");

      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));;

  };

  return (
    <div className="category-container">

      <h2>Sửa loại sản phẩm</h2>

      <form onSubmit={handleSubmit} className="category-form">

        <div className="form-group">
          <label>Tên loại</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            name="description"
            value={form.description}
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
            <option value={1}>Hiển thị</option>
            <option value={0}>Ẩn</option>
          </select>

        </div>

        <button
          type="submit"
          className="btn-save"
          disabled={loading}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>

      </form>

    </div>
  );
}

export default EditCategory;