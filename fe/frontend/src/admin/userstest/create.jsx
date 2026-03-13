import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./userstest.css";

function UserCreate() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(
      "https://xaydungphanmemweb-umwx.onrender.com/BASE_API/users",
      form,
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(() => {
        alert("Thêm user thành công");
        navigate("/users");
      })
      .catch(err => {
        console.error("Lỗi:", err.response || err);
      });
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
          >
            Lưu
          </button>

        </div>

      </form>

    </div>
  );
}

export default UserCreate;