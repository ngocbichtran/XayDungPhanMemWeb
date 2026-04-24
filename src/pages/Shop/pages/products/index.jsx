import { useEffect, useState } from "react";
import "./products.css";
function ProductList() {
    const [products, setProducts] = useState([]);
    const [loadingId, setLoadingId] = useState(null);

    const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

    // ── LOAD PRODUCTS ──
    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => setProducts(data || []));
    }, []);

    const fmt = (n) => Number(n).toLocaleString("vi-VN") + " ₫";

    const toast = (msg, type = "success") => {
        alert((type === "error" ? "❌ " : "✅ ") + msg);
    };

    // ── ADD TO CART ──
    const addToCart = async (id) => {
        setLoadingId(id);

        try {
            const res = await fetch("/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": CSRF
                },
                body: JSON.stringify({
                    product_id: id,
                    quantity: 1
                })
            });

            const data = await res.json();

            if (data.success) {
                toast(data.message || "Đã thêm vào giỏ");
            } else {
                toast(data.message || "Lỗi", "error");
            }

        } catch {
            toast("Lỗi kết nối", "error");
        }

        setLoadingId(null);
    };

    return (
        <div className="container py-4">
            <h4 className="mb-3">🛍️ Sản phẩm</h4>

            <div className="row g-3">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="col-6 col-md-4 col-lg-3"
                    >
                        <div className="product-card">

                            <div className="product-img">
                                {product.image ? (
                                    <img src={product.image} alt="" />
                                ) : (
                                    <div>📦</div>
                                )}
                            </div>

                            <div className="product-body">
                                <div className="fw-semibold mb-2">
                                    {product.name}
                                </div>

                                <div className="text-danger fw-bold mb-2">
                                    {fmt(product.sale_price || product.price)}
                                </div>

                                <button
                                    className="btn-add-cart"
                                    disabled={product.quantity <= 0 || loadingId === product.id}
                                    onClick={() => addToCart(product.id)}
                                >
                                    {product.quantity <= 0
                                        ? "Hết hàng"
                                        : loadingId === product.id
                                            ? "Đang thêm..."
                                            : "🛒 Thêm vào giỏ"}
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;