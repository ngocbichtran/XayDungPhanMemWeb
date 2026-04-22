import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// 1. GỌI CỖ MÁY API 
import { shopClient } from '../../../services/apiFactory'; 
import "./ProductManage.css";

function CreateProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    sale_price: "",
    quantity: "",
    description: "",
    image: null,
    status: 1
  });
  
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null); // State để xem trước ảnh

  // Xử lý tạo URL xem trước ảnh khi người dùng chọn file
  useEffect(() => {
    if (!form.image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(form.image);
    setPreview(objectUrl);

    // Dọn dẹp bộ nhớ khi component bị unmount hoặc ảnh thay đổi
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.image]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // KIỂM TRA NHẸ: Giá khuyến mãi không được lớn hơn giá gốc
    if (form.sale_price && Number(form.sale_price) >= Number(form.price)) {
      alert("⚠️ Giá khuyến mãi phải nhỏ hơn giá gốc bồ ơi!");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", form.price);
      // Nếu không nhập sale_price thì gửi về 0 để tránh lỗi database
      data.append("sale_price", form.sale_price || 0);
      data.append("quantity", form.quantity);
      data.append("description", form.description);
      data.append("status", form.status);

      if (form.image) {
        data.append("image", form.image);
      }

      // 2. GỌI API THÊM MỚI
      await shopClient.post("/admin/products", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("🎉 Chúc mừng Tân! Thêm sản phẩm thành công rùi nha.");
      navigate("/admin/products");

    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      const errorMsg = error.response?.data?.message || "Lỗi server rồi, kiểm tra lại bồ ơi!";
      alert("❌ " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6 product-container">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 title">🆕 Thêm Sản Phẩm Mới</h2>

      <form className="space-y-6 product-form" onSubmit={handleSubmit}>
        
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tên sản phẩm <span className="text-red-500">*</span></label>
          <input
            name="name"
            type="text"
            required
            minLength="3"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Ví dụ: iPhone 15 Pro Max..."
          />
        </div>

        {/* Grid 2 cột: Giá & Giá KM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Giá gốc (VNĐ) <span className="text-red-500">*</span></label>
            <input
              name="price"
              type="number"
              min="0"
              required
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Giá khuyến mãi (VNĐ)</label>
            <input
              name="sale_price"
              type="number"
              min="0"
              value={form.sale_price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0"
            />
          </div>
        </div>

        {/* Grid 2 cột: Số lượng & Trạng thái */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Số lượng kho <span className="text-red-500">*</span></label>
            <input
              name="quantity"
              type="number"
              min="0"
              required
              value={form.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái hiển thị</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="1">🟢 Đang kinh doanh</option>
              <option value="0">🔴 Tạm ẩn</option>
            </select>
          </div>
        </div>

        {/* Mô tả */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả sản phẩm</label>
          <textarea
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Nhập thông tin chi tiết về sản phẩm..."
          />
        </div>

        {/* Upload Ảnh & Preview */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 text-center">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Hình ảnh đại diện sản phẩm</label>
          
          {/* Vùng xem trước ảnh */}
          {preview ? (
            <div className="mb-4 relative inline-block">
              <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg border-2 border-white shadow-md" />
              <button 
                type="button"
                onClick={() => setForm({...form, image: null})}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="mb-4 py-8 text-gray-400">
              <span className="text-4xl block mb-2">📸</span>
              <p className="text-xs">Chưa có ảnh được chọn</p>
            </div>
          )}

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {/* Nút bấm */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t mt-8">
          <button
            type="button"
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            onClick={() => navigate("/admin/products")}
          >
            Hủy bỏ
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-2 text-white rounded-lg font-bold shadow-md transition-all ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {loading ? "⌛ Đang xử lý..." : "💾 Lưu Sản Phẩm"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreateProduct;