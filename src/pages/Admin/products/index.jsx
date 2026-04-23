import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CreateProduct from "./create";
import ProductEdit from "./edit";

function ProductIndex() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // popup
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // ===== FETCH =====
  const fetchProducts = useCallback(() => {
    setLoading(true);
    axios
      .get("https://xaydungphanmemweb-umwx.onrender.com/admin/products")
      .then((res) => {
        const result = res.data.data ?? res.data;
        setProducts(Array.isArray(result) ? result : []);
      })
      .catch((err) => console.error("Lỗi:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ===== DELETE =====
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    axios
      .delete(
        `https://xaydungphanmemweb-umwx.onrender.com/admin/products/${id}`
      )
      .then(() => {
        alert("Xóa thành công");

        const newProducts = products.filter((p) => p.id !== id);
        setProducts(newProducts);

        if (currentProducts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      })
      .catch(() => alert("Không thể xóa sản phẩm"));
  };

  // ===== FILTER =====
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== PAGINATION =====
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
          <p className="text-gray-500 text-sm">
            Danh sách sản phẩm trong hệ thống
          </p>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {/* SEARCH */}
        <div className="p-5 flex justify-between items-center border-b">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="w-80 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <span className="text-sm text-gray-500">
            {filteredProducts.length} sản phẩm
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4 text-left">Sản phẩm</th>
                <th className="p-4 text-center">Trạng thái</th>
                <th className="p-4 text-right">Số lượng</th>
                <th className="p-4 text-center">Giá</th>
                <th className="p-4 text-right">Khuyến mãi</th>
                <th className="p-4 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    ⏳ Đang tải...
                  </td>
                </tr>
              ) : currentProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                currentProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image || "https://placehold.co/100"}
                          className="w-14 h-14 rounded-lg object-cover border"
                          alt=""
                        />
                        <div>
                          <p className="font-semibold">{p.name}</p>
                          <small className="text-gray-400">
                            ID: {p.id}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${p.status == 1
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                          }`}
                      >
                        {p.status == 1 ? "Active" : "Hidden"}
                      </span>
                    </td>

                    <td className="text-right font-medium">
                      {p.quantity}
                    </td>

                    <td className="text-center font-semibold">
                      {Number(p.price).toLocaleString()} đ
                    </td>

                    <td className="text-right">
                      {p.sale_price > 0 ? (
                        <span className="text-red-500 font-bold">
                          {Number(p.sale_price).toLocaleString()} đ
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          Không có
                        </span>
                      )}
                    </td>

                    <td className="text-center">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => {
                            setEditId(p.id);
                            setOpenEdit(true);
                          }}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        >
                          Sửa
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-3 py-1 text-sm bg-red-100 text-red-500 rounded hover:bg-red-200"
                        >
                          Xóa
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-5 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
                }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>

      {/* ===== POPUP CREATE ===== */}
      {openCreate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateProduct
              onClose={() => setOpenCreate(false)}
              onSuccess={fetchProducts}
            />
          </div>
        </div>
      )}

      {/* ===== POPUP EDIT ===== */}
      {openEdit && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ProductEdit
              id={editId}
              onClose={() => setOpenEdit(false)}
              onSuccess={fetchProducts}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductIndex;