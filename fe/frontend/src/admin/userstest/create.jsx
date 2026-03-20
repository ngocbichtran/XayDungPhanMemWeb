import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./userstest.css";

function UserCreate() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.name.trim()) {
      alert("Tên user không được để trống");
      return;
    }

    try {

      setLoading(true);

      await axios.post(
        "https://xaydungphanmemweb-umwx.onrender.com/BASE_API/users",
        form,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        }
      );

      alert("Thêm user thành công");

      navigate("/BASE_FE/users");

    } catch (error) {

      console.error("Lỗi:", error.response || error);
      alert("Không thể thêm user");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="content">

      <div className="top-bar">
        <h1>Thêm User</h1>
      </div>

      <form className="form-box" onSubmit={handleSubmit}>

        <div className="form-group">

          <label>Tên user</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/BASE_FE/users")}
          >
            Hủy
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

export default UserCreate;