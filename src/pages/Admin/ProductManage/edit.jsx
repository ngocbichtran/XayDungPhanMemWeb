import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 1. GỌI CỖ MÁY API TỪ SERVICES
import { shopClient } from '../../../services/apiFactory'; 
import "./ProductManage.css";

function EditProduct() {
  const { id } = useParams();
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
  const [currentImage, setCurrentImage] = useState("");

  // Lấy dữ liệu sản phẩm cũ
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await shopClient.get(`/admin/products/${id}`);
        const p = res.data ? res.data : res;

        setForm({
          name: p.name || "",
          price: p.price || "",
          sale_price: p.sale_price || "",
          quantity: p.quantity || "",
          description: p.description || "",
          image: null,
          status: p.status ?? 1
        });

        // XỬ LÝ ẢNH CŨ: Fix lỗi Mixed Content (http -> https)
        if (p.image) {
          // Nếu link trả về đã có http, ta ép sang https
          if (p.image.startsWith('http')) {
            setCurrentImage(p.image.replace('http://', 'https://'));
          } else {
            // Nếu chỉ là path, ta ghép với link server và ép https
            const baseUrl = "https://xaydungphanmemweb-umwx.onrender.com";
            const fullUrl = `${baseUrl}/storage/${p.image}`;
            setCurrentImage(fullUrl.replace('http://', 'https://'));
          }
        }
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
        alert("Không tìm thấy sản phẩm này!");
        navigate("/admin/products");
      }
    };

    fetchProduct();
  }, [id, navigate]);

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
    setLoading(true);

    const data = new FormData();
    data.append("_method", "PUT"); // Bắt buộc cho Laravel khi update có file
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("sale_price", form.sale_price || 0);
    data.append("quantity", form.quantity);
    data.append("description", form.description);
    data.append("status", form.status);

    if (form.image) {
      data.append("image", form.image);
    }

    try {
      await shopClient.post(`/admin/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Cập nhật sản phẩm thành công! 🎉");
      navigate("/admin/products");

    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Lỗi: " + (err.response?.data?.message || "Không thể cập nhật sản phẩm"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6 product-form-container">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 form-title">✏️ Cập Nhật Sản Phẩm</h2>

      <form onSubmit={handleSubmit} className="space-y-6 product-form">
        
        {/* Tên sản phẩm */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tên sản phẩm <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Giá & Giá KM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Giá gốc (VNĐ) <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Giá khuyến mãi (VNĐ)</label>
            <input
              type="number"
              name="sale_price"
              value={form.sale_price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Số lượng & Trạng thái */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Số lượng kho <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value={1}>🟢 Đang hoạt động</option>
              <option value={0}>🔴 Ẩn</option>
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
          ></textarea>
        </div>

        {/* Upload Ảnh */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Thay đổi hình ảnh</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
          />
          
          {currentImage && (
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Ảnh đang hiển thị:</p>
              <img
                src={currentImage}
                alt="preview"
                className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                onError={(e) => { e.target.src = 'https://placehold.co/150x150?text=Lỗi+Ảnh'; }}
              />
            </div>
          )}
        </div>

        {/* Nút bấm */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t mt-8">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Hủy bỏ
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded-lg font-medium transition-colors ${
              loading ? "bg-yellow-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {loading ? "Đang cập nhật..." : "🔄 Cập nhật Sản Phẩm"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default EditProduct;