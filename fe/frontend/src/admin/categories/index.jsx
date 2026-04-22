import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./categories.css";

function CategoriesIndex() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios.get("https://xaydungphanmemweb-umwx.onrender.com/admin/categories")
      .then(res => {
        const result = res.data.data ? res.data.data : res.data;
        setCategories(Array.isArray(result) ? result : []);
      })
      .catch(err => console.error("Lỗi:", err))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;

    axios.delete(`https://xaydungphanmemweb-umwx.onrender.com/admin/categories/${id}`)
      .then(() => {
        alert("Xóa thành công");
        setCategories(categories.filter(c => c.id !== id));
      })
      .catch(() => alert("Không thể xóa"));
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-surface min-h-screen font-body">

      {/* Page Header */}
      <section className="p-6 md:p-8 space-y-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-teal-900 tracking-tight font-headline">
              Quản lý Danh mục Điện tử
            </h1>
          </div>

          <Link
            to="/categories/create"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 text-teal-900 font-bold rounded-md shadow-sm hover:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">
              add_circle
            </span>

            <span>
              Thêm danh mục mới
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">

          <div className="relative w-full sm:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-teal-600/50">
              search
            </span>

            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="text-xs font-semibold text-teal-700/50 uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              sort
            </span>

            Tổng số: {filteredCategories.length}
          </div>

        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 text-teal-600 font-bold">
            Đang tải dữ liệu...
          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredCategories.map((c) => (

              <div key={c.id} className="category-card group">

                {/* Title + Status */}
                <div className="flex items-start justify-between mb-2 gap-2">

                  <h3 className="text-xl font-bold text-teal-900 font-headline leading-snug">
                    {c.name}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded text-xs font-bold whitespace-nowrap flex-shrink-0
                      ${c.status == 1
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-gray-100 text-gray-500'
                      }`}
                  >
                    {c.status == 1 ? 'Hoạt động' : 'Ẩn'}
                  </span>

                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-h-[40px]">
                  {c.description || "Chưa có mô tả cho danh mục này."}
                </p>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-end gap-2 pt-4 border-t border-gray-100">

                  <button
                    onClick={() => navigate(`/categories/edit/${c.id}`)}
                    className="p-2 text-teal-600 hover:bg-teal-50 rounded transition-colors"
                    title="Sửa"
                  >
                    <span className="material-symbols-outlined">
                      edit
                    </span>
                  </button>

                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Xóa"
                  >
                    <span className="material-symbols-outlined">
                      delete
                    </span>
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* Empty */}
        {!loading && filteredCategories.length === 0 && (

          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">
              Không tìm thấy category nào phù hợp.
            </p>
          </div>

        )}

      </section>

    </div>
  );
}

export default CategoriesIndex;