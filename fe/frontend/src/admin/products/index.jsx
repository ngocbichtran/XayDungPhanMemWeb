import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ProductIndex() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get("https://xaydungphanmemweb-umwx.onrender.com/admin/products")
      .then((res) => {
        const result = res.data.data ? res.data.data : res.data;
        setProducts(Array.isArray(result) ? result : []);
      })
      .catch((err) => console.error("Lỗi:", err.response || err))
      .finally(() => setLoading(false));
  };

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
        if (currentProducts.length === 1 && currentPage > 1)
          setCurrentPage(currentPage - 1);
      })
      .catch(() => alert("Không thể xóa sản phẩm"));
  };

  // filter
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // pagination
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
    <div className="flex-1 bg-surface-container-low min-h-screen font-body p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-black text-teal-900 tracking-tight">
            Quản lý sản phẩm
          </h1>
        </div>

        <div className="flex gap-3">
          <Link
            to="/products/create"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-headline font-bold rounded-lg hover:bg-primary-container transition-all shadow-md active:scale-95"
          >
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden border border-outline-variant/10">
        {/* Search */}
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full max-w-md bg-surface-container-low border-none rounded-full py-2.5 px-4"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <div>
            {filteredProducts.length} sản phẩm
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left">
                  Sản phẩm
                </th>
                <th className="px-6 py-4 text-center">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right">
                  Số lượng
                </th>
                <th className="px-6 py-4 text-center">
                  Giá
                </th>
                <th className="px-6 py-4 text-right">
                  Khuyến mãi
                </th>
                <th className="px-6 py-4 text-center">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                currentProducts.map((p) => (
                  <tr key={p.id}>
                    {/* info */}
                    <td className="px-6 py-4">
                      <div className="flex gap-3 items-center">
                        <img
                          src={
                            p.image ||
                            "https://placehold.co/100x100"
                          }
                          className="w-12 h-12 rounded"
                          alt=""
                        />
                        <div>
                          <p>{p.name}</p>
                          <small>ID: {p.id}</small>
                        </div>
                      </div>
                    </td>

                    {/* status */}
                    <td className="text-center">
                      {p.status == 1
                        ? "Active"
                        : "Hidden"}
                    </td>

                    {/* quantity */}
                    <td className="text-right">
                      {p.quantity}
                    </td>

                    {/* price */}
                    <td className="text-center">
                      {Number(
                        p.price
                      ).toLocaleString()}{" "}
                      đ
                    </td>

                    {/* sale price */}
                    <td className="text-right">
                      {p.sale_price > 0 ? (
                        <span className="text-red-500 font-bold">
                          {Number(
                            p.sale_price
                          ).toLocaleString()}{" "}
                          đ
                        </span>
                      ) : (
                        "Chưa có"
                      )}
                    </td>

                    {/* action */}
                    <td className="text-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/products/edit/${p.id}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(p.id)
                        }
                        className="ml-3 text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-5 flex justify-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border ${currentPage === i + 1
                ? "bg-blue-500 text-white"
                : ""
                }`}
              onClick={() =>
                setCurrentPage(i + 1)
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductIndex;