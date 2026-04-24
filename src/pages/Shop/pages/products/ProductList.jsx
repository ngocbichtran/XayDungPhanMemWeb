import { useEffect, useState } from "react";
import haService from "@/services/haService"; // Dùng service riêng của HA
import "./products.css";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // ── LOAD PRODUCTS (Dùng Service đã cấu hình Proxy) ──
    useEffect(() => {
        const loadData = async () => {
            try {
                // haService sẽ gọi qua /api-ha-store, giúp né lỗi CORS
                const res = await haService.getProducts();
                // Laravel Paginate trả về mảng nằm trong products.data
                setProducts(res.products?.data || res.data || []);
            } catch (err) {
                console.error("Lỗi kết nối HA Store:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const fmt = (n) => Number(n).toLocaleString("vi-VN") + " ₫";

    if (loading) return <div className="text-center py-5">Đang mở kho hàng HA Store...</div>;

    return (
        <div className="container py-4">
            <h4 className="mb-3">🛍️ Sản phẩm HA Store</h4>
            <div className="row g-3">
                {products.length > 0 ? products.map(product => (
                    <div key={product.id} className="col-6 col-md-4 col-lg-3">
                        <div className="product-card">
                            <div className="product-img">
                                <img src={product.image_url || "https://via.placeholder.com/150"} alt={product.name} />
                            </div>
                            <div className="product-body">
                                <div className="fw-semibold mb-2">{product.name}</div>
                                <div className="text-danger fw-bold mb-2">{fmt(product.price)}</div>
                                <button 
                                    className="btn-add-cart"
                                    disabled={product.quantity <= 0}
                                >
                                    {product.quantity <= 0 ? "Hết hàng" : "🛒 Thêm vào giỏ"}
                                </button>
                            </div>
                        </div>
                    </div>
                )) : <p className="text-center">Hiện chưa có sản phẩm nào.</p>}
            </div>
        </div>
    );
}

export default ProductList;