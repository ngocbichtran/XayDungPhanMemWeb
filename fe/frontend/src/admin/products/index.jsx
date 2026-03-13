import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./products.css";

function ProductIndex() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/admin/products", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(res => {
        const result = res.data.data ? res.data.data : res.data;
        setProducts(Array.isArray(result) ? result : []);
      })
      .catch(err => {
        console.error("Lỗi chi tiết:", err.response || err);
      });
  }, []);

  return (
    <div className="content">

      <div className="top-bar">
        <h1>Danh sách sản phẩm</h1>

        <Link to="/products/create">
          <button className="btn-add">
            + Thêm sản phẩm
          </button>
        </Link>

      </div>

      <div className="table-box">

        <table className="product-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Giá khuyến mãi</th>
              <th>Số lượng</th>
              <th>Hình ảnh</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>

                <td>{p.id}</td>
                <td>{p.name}</td>

                <td>{(p.price || 0).toLocaleString()} đ</td>
                <td>{(p.sale_price || 0).toLocaleString()} đ</td>

                <td>{p.quantity}</td>

                <td>
                  {p.image ? (
                    <img src={p.image} className="product-img" />
                  ) : (
                    <span className="no-img">Không có ảnh</span>
                  )}
                </td>

                <td>
                  {p.status === 1 ? (
                    <span className="status-active">Hoạt động</span>
                  ) : (
                    <span className="status-hide">Ẩn</span>
                  )}
                </td>

                <td className="actions">
                  <button
                    className="edit"
                    onClick={() => navigate(`/products/edit/${p.id}`)}
                  >
                    Sửa
                  </button>
                  <button className="delete">Xóa</button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProductIndex;