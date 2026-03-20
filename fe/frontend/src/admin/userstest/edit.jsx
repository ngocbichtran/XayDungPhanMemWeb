import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./userstest.css";

function UserEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    axios.get(
      `https://xaydungphanmemweb-umwx.onrender.com/BASE_API/users/${id}`,
      {
        headers: { Accept: "application/json" }
      }
    )
      .then(res => {

        const u = res.data.data ? res.data.data : res.data;

        setForm({
          name: u.name || ""
        });

      })
      .catch(err => {
        console.error("Lỗi load user:", err.response || err);
      });

  }, [id]);

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
        `https://xaydungphanmemweb-umwx.onrender.com/BASE_API/users/${id}`,
        {
          ...form,
          _method: "PUT"
        },
        {
          headers: {
            Accept: "application/json"
          }
        }
      );

      alert("Cập nhật user thành công");

      navigate("/BASE_FE/users");

    } catch (error) {

      console.error("Lỗi cập nhật:", error.response || error);
      alert("Không thể cập nhật user");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="content">

      <div className="top-bar">
        <h1>Sửa User</h1>
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
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default UserEdit;