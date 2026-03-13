import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./categories.css";
function CategoriesIndex() {
const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/admin/categories", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest" // Header này cực kỳ quan trọng để lách luật một số hosting
            }
        })
            .then(res => {
                // Kiểm tra xem data trả về nằm ở đâu
                const result = res.data.data ? res.data.data : res.data;
                setCategories(Array.isArray(result) ? result : []);
            })
            .catch(err => {
                console.error("Lỗi chi tiết:", err.response || err);
            });
    }, []);

    return (
        <div className="content">

            <div className="top-bar">
                <h1>Danh sách category</h1>

                <Link to="/categories/create">
                    <button className="btn-add">
                        + Thêm loại
                    </button>
                </Link>
            </div>

            <div className="table-box">

                <table className="product-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Trạng thái</th>
                            <th>Mô tả</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((c) => (
                            <tr key={c.id}>

                                <td>{c.id}</td>
                                <td>{c.name}</td>

                                <td>
                                    {c.status === true ? (
                                        <span className="status-active">
                                            Hoạt động
                                        </span>
                                    ) : (
                                        <span className="status-hide">
                                            Ẩn
                                        </span>
                                    )}
                                </td>
                                <td>{c.description}</td>
                                <td className="actions">
                                    <button
                                        className="edit"
                                        onClick={() => navigate(`/categories/edit/${c.id}`)}
                                    >
                                        Sửa
                                    </button>

                                    <button className="delete">
                                        Xóa
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default CategoriesIndex;