import { useEffect, useState } from "react";
import "./cart.css";
function CartPage() {
    const [cart, setCart] = useState({
        items: [],
        total: 0,
        count: 0
    });

    const [loading, setLoading] = useState(false);

    const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

    // ── LOAD CART ──
    useEffect(() => {
        fetch("/api/cart")
            .then(res => res.json())
            .then(data => {
                setCart({
                    items: data.items || [],
                    total: data.total || 0,
                    count: data.count || 0
                });
            });
    }, []);

    const fmt = (n) => Number(n).toLocaleString("vi-VN") + " ₫";

    const toast = (msg, type = "success") => {
        alert((type === "success" ? "✅ " : "❌ ") + msg);
    };

    // ── UPDATE QTY ──
    const updateQty = async (id, qty) => {
        if (qty < 1) return;

        try {
            const res = await fetch("/api/cart/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": CSRF
                },
                body: JSON.stringify({ product_id: id, quantity: qty })
            });

            const data = await res.json();

            if (data.success) {
                setCart({
                    items: data.items,
                    total: data.cart_total,
                    count: data.cart_count
                });
            } else {
                toast(data.message, "error");
            }
        } catch {
            toast("Lỗi kết nối", "error");
        }
    };

    // ── REMOVE ITEM ──
    const removeItem = async (id) => {
        if (!window.confirm("Xóa sản phẩm?")) return;

        const res = await fetch("/api/cart/remove", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": CSRF
            },
            body: JSON.stringify({ product_id: id })
        });

        const data = await res.json();

        if (data.success) {
            setCart({
                items: data.items,
                total: data.cart_total,
                count: data.cart_count
            });
        }
    };

    // ── CLEAR CART ──
    const clearCart = async () => {
        if (!window.confirm("Xóa toàn bộ giỏ?")) return;

        const res = await fetch("/api/cart/clear", {
            method: "DELETE",
            headers: { "X-CSRF-TOKEN": CSRF }
        });

        const data = await res.json();

        if (data.success) {
            setCart({ items: [], total: 0, count: 0 });
        }
    };

    // ── ORDER ──
    const handleOrder = async () => {
        const address = document.getElementById("address").value;

        if (!address) {
            toast("Nhập địa chỉ", "error");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": CSRF
                },
                body: JSON.stringify({
                    shipping_address: address
                })
            });

            const data = await res.json();

            if (data.success) {
                toast("🎉 Đặt hàng thành công");
                setCart({ items: [], total: 0, count: 0 });
            } else {
                toast(data.message, "error");
            }
        } catch {
            toast("Lỗi server", "error");
        }

        setLoading(false);
    };

    return (
        <div className="container py-4">
            <h3>🛒 Giỏ hàng ({cart.count})</h3>

            {cart.items.length === 0 ? (
                <div className="text-center mt-5">
                    <h5>Giỏ hàng trống</h5>
                </div>
            ) : (
                <div className="row">
                    {/* LEFT */}
                    <div className="col-md-8">
                        {cart.items.map(item => (
                            <div key={item.product.id} className="card mb-3 p-3">
                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src={item.product.image}
                                        alt=""
                                        width="80"
                                        height="80"
                                    />

                                    <div className="flex-grow-1">
                                        <h6>{item.product.name}</h6>
                                        <div className="text-danger fw-bold">
                                            {fmt(item.product.sale_price)}
                                        </div>

                                        <div className="d-flex mt-2">
                                            <button
                                                onClick={() =>
                                                    updateQty(item.product.id, item.quantity - 1)
                                                }
                                            >-</button>

                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateQty(item.product.id, Number(e.target.value))
                                                }
                                                style={{ width: 50, textAlign: "center" }}
                                            />

                                            <button
                                                onClick={() =>
                                                    updateQty(item.product.id, item.quantity + 1)
                                                }
                                            >+</button>
                                        </div>
                                    </div>

                                    <div>
                                        <div>{fmt(item.subtotal)}</div>

                                        <button onClick={() => removeItem(item.product.id)}>
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button onClick={clearCart}>Xóa tất cả</button>
                    </div>

                    {/* RIGHT */}
                    <div className="col-md-4">
                        <div className="card p-3">
                            <h5>Tóm tắt</h5>

                            <p>Tổng: <b>{fmt(cart.total)}</b></p>

                            <input
                                id="address"
                                className="form-control mb-2"
                                placeholder="Địa chỉ"
                            />

                            <button
                                onClick={handleOrder}
                                disabled={loading}
                            >
                                {loading ? "Đang xử lý..." : "Đặt hàng"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;