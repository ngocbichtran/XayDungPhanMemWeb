import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import "./categories.css";
import CategoryCreate from "./create";
import CategoryEdit from "./edit";

function CategoriesIndex() {

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ===== FETCH =====
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://xaydungphanmemweb-umwx.onrender.com/admin/categories"
      );

      const result = res.data?.data ?? res.data;
      setCategories(Array.isArray(result) ? result : []);

    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ===== LOCK SCROLL =====
  useEffect(() => {
    const isOpen = openCreate || openEdit;
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => (document.body.style.overflow = "auto");
  }, [openCreate, openEdit]);

  // ===== SEARCH =====
  const filteredCategories = useMemo(() => {
    const keyword = search.toLowerCase();
    return categories.filter((c) =>
      c.name?.toLowerCase().includes(keyword)
    );
  }, [categories, search]);

  // ===== DELETE =====
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;

    try {
      await axios.delete(
        `https://xaydungphanmemweb-umwx.onrender.com/admin/categories/${id}`
      );

      alert("Xóa thành công");

      setCategories((prev) => prev.filter((c) => c.id !== id));

    } catch {
      alert("Không thể xóa");
    }
  }, []);

  return (
    <div className="flex-1 bg-surface font-body">

      <section className=" space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="text-4xl font-black text-teal-900 font-headline">
            Quản lý Danh mục Điện tử
          </h1>

          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-teal-900 font-bold rounded-md hover:scale-95 transition-all"
          >
            Thêm danh mục mới
          </button>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-xl p-4 flex justify-between items-center gap-4 shadow-sm">
          <input
            type="text"
            placeholder="Tìm kiếm danh mục"
            className="w-96 bg-gray-100 rounded-md px-4 py-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="text-xs font-semibold text-teal-700">
            Tổng: {filteredCategories.length}
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center py-20 text-teal-600 font-bold">
            Đang tải...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" style={{
            transform: "scale(0.75)",
            transformOrigin: "top left",
            width: "133.33%",
          }}>

            {filteredCategories.map((c) => (
              <div key={c.id} className="category-card">

                <div className="flex justify-between">
                  <h3 className="font-bold">{c.name}</h3>

                  <span className={c.status == 1
                    ? "status-active"
                    : "status-hide"}>
                    {c.status == 1 ? "Hoạt động" : "Ẩn"}
                  </span>
                </div>

                <p>{c.description || "Chưa có mô tả"}</p>

                <div className="mt-4 flex justify-end gap-2">

                  <button
                    onClick={() => {
                      setEditId(c.id);
                      setOpenEdit(true);
                    }}
                    className="edit"
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="delete"
                  >
                    Xóa
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* ===== CREATE MODAL ===== */}
      {openCreate && (
        <div className="modal-overlay" onClick={() => setOpenCreate(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <button className="modal-close" onClick={() => setOpenCreate(false)}>✕</button>

            <CategoryCreate
              onClose={() => {
                setOpenCreate(false);
                fetchCategories();
              }}
            />

          </div>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {openEdit && (
        <div className="modal-overlay" onClick={() => setOpenEdit(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>

            <CategoryEdit
              id={editId}
              onClose={() => {
                setOpenEdit(false);
                setEditId(null);
              }}
              onSuccess={fetchCategories}
            />

          </div>
        </div>
      )}

    </div>
  );
}

export default CategoriesIndex;