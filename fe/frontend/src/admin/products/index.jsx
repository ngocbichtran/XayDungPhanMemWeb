import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./products.css";

function ProductIndex() {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios.get("https://xaydungphanmemweb-umwx.onrender.com/admin/products")
      .then(res => {

        const result = res.data.data ? res.data.data : res.data;
        setProducts(Array.isArray(result) ? result : []);

      })
      .catch(err => {
        console.error("Lỗi:", err.response || err);
      })
      .finally(() => {
        setLoading(false); // kết thúc load
      });
  };

  const handleDelete = (id) => {

    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      return;
    }

    axios.delete(`https://xaydungphanmemweb-umwx.onrender.com/admin/products/${id}`)
      .then(() => {

        alert("Xóa thành công");

        setProducts(products.filter(p => p.id !== id));

      })
      .catch(err => {
        console.error("Lỗi xóa:", err.response || err);
        alert("Không thể xóa sản phẩm");
      });

  };

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
        {loading ? (
          <div className="loading">
            Đang tải dữ liệu...
          </div>
        ) : (
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
                  <td>{Number(p.price).toLocaleString()} đ</td>
                  <td>{Number(p.sale_price).toLocaleString()} đ</td>
                  <td>{p.quantity}</td>

                  <td>
                    {p.image ? (
                      <img
                        src={p.image}
                        className="product-img"
                        alt="product"
                      />
                    ) : (
                      <span className="no-img">
                        Không có ảnh
                      </span>
                    )}
                  </td>

                  <td>
                    {p.status == 1 ? (
                      <span className="status-active">
                        Hoạt động
                      </span>
                    ) : (
                      <span className="status-hide">
                        Ẩn
                      </span>
                    )}
                  </td>
                  <td className="actions">

                    <button className="edit" onClick={() => navigate(`/products/edit/${p.id}`)}>
                      Sửa
                    </button>

                    <button className="delete" onClick={() => handleDelete(p.id)}  >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductIndex;