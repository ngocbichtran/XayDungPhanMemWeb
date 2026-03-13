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

  useEffect(() => {

    axios.get(`https://xaydungphanmemweb-umwx.onrender.com/BASE_API/users/${id}`, {
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {

        const u = res.data.data ? res.data.data : res.data;

        setForm({
          name: u.name || ""
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

    axios.put(
      `https://xaydungphanmemweb-umwx.onrender.com/BASE_API/users/${id}`,
      form,
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(() => {

        alert("Cập nhật user thành công");
        navigate("/users");

      })
      .catch(err => console.log(err));

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
            onClick={() => navigate("/users")}
          >
            Hủy
          </button>

          <button
            type="submit"
            className="btn-save"
          >
            Cập nhật
          </button>

        </div>

      </form>

    </div>
  );
}

export default UserEdit;