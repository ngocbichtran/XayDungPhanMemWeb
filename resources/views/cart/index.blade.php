{{-- resources/views/cart/index.blade.php --}}
@extends('layouts.app')

@section('title', 'Giỏ hàng')

@push('styles')
<style>
    :root {
        --red: #e63946;
        --red-dark: #c1121f;
        --green: #2a9d8f;
        --border: #e9ecef;
        --muted: #6c757d;
        --radius: 14px;
    }

    /* ── BREADCRUMB ── */
    .breadcrumb-wrap { background: #fff; border-bottom: 1px solid var(--border); padding: 10px 0; }
    .breadcrumb-wrap .breadcrumb { margin: 0; font-size: .85rem; }

    /* ── LAYOUT ── */
    .cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: 24px; margin-top: 28px; }
    @media (max-width: 991px) { .cart-layout { grid-template-columns: 1fr; } }

    /* ── SECTION HEADER ── */
    .section-title {
        font-size: 1.25rem; font-weight: 700; margin-bottom: 16px;
        display: flex; align-items: center; gap: 10px;
    }
    .section-title .count {
        background: var(--red); color: #fff;
        font-size: .72rem; padding: 2px 9px; border-radius: 20px; font-weight: 700;
    }

    /* ── CART CARD ── */
    .cart-card { background: #fff; border-radius: var(--radius); box-shadow: 0 1px 8px rgba(0,0,0,.07); overflow: hidden; }

    /* ── CART ITEM ── */
    .cart-item {
        display: grid; grid-template-columns: 86px 1fr auto;
        gap: 16px; align-items: center;
        padding: 18px 20px;
        border-bottom: 1px solid var(--border);
        transition: background .15s;
    }
    .cart-item:last-child { border-bottom: none; }
    .cart-item:hover { background: #fafafa; }

    .product-thumb {
        width: 86px; height: 86px;
        border-radius: 10px; overflow: hidden;
        background: linear-gradient(135deg, #f1f3f5, #dee2e6);
        display: flex; align-items: center; justify-content: center;
        font-size: 2.2rem; flex-shrink: 0; border: 1px solid var(--border);
    }
    .product-thumb img { width: 100%; height: 100%; object-fit: cover; }

    .item-name { font-weight: 600; font-size: .95rem; margin-bottom: 3px; line-height: 1.3; }
    .item-category { font-size: .78rem; color: var(--muted); margin-bottom: 8px; }
    .item-price { color: var(--red); font-weight: 700; font-size: 1.05rem; }
    .item-price-orig { color: var(--muted); font-size: .8rem; text-decoration: line-through; margin-left: 6px; }
    .item-discount { background: #fff0f0; color: var(--red); font-size: .72rem; font-weight: 700; padding: 1px 7px; border-radius: 20px; margin-left: 6px; }

    /* ── QTY CONTROL ── */
    .qty-wrap { display: flex; align-items: center; margin-top: 10px; width: fit-content; }
    .qty-btn {
        width: 30px; height: 30px; border-radius: 8px;
        border: 1.5px solid var(--border); background: #f8f9fa;
        font-size: 1.1rem; font-weight: 700; cursor: pointer; line-height: 1;
        transition: all .15s; display: flex; align-items: center; justify-content: center;
    }
    .qty-btn:hover { background: var(--red); border-color: var(--red); color: #fff; }
    .qty-btn:disabled { opacity: .4; cursor: not-allowed; }
    .qty-input {
        width: 44px; height: 30px; text-align: center; border: 1.5px solid var(--border);
        border-left: none; border-right: none; font-size: .9rem; font-weight: 600;
        outline: none; background: #fff;
    }
    .qty-input:focus { background: #fff8f8; }

    /* ── ITEM RIGHT ── */
    .item-right { text-align: right; }
    .item-subtotal { font-weight: 800; font-size: 1.05rem; color: #212529; white-space: nowrap; }
    .btn-remove {
        background: none; border: none; cursor: pointer;
        color: #ced4da; margin-top: 10px; font-size: .85rem;
        transition: color .15s; display: flex; align-items: center; gap: 4px; margin-left: auto;
    }
    .btn-remove:hover { color: var(--red); }

    /* ── EMPTY ── */
    .empty-cart { text-align: center; padding: 64px 24px; }
    .empty-cart .icon { font-size: 4.5rem; margin-bottom: 16px; opacity: .5; }
    .empty-cart h5 { color: var(--muted); }

    /* ── CART ACTIONS ── */
    .cart-actions { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
    .btn-link-red { color: var(--red); border: 1.5px solid #ffc9cc; background: #fff5f5; border-radius: 8px; padding: 7px 16px; font-size: .84rem; font-weight: 600; cursor: pointer; transition: all .15s; }
    .btn-link-red:hover { background: var(--red); color: #fff; }
    .btn-link-gray { color: var(--muted); border: 1.5px solid var(--border); background: #fff; border-radius: 8px; padding: 7px 16px; font-size: .84rem; cursor: pointer; transition: all .15s; }
    .btn-link-gray:hover { border-color: #adb5bd; }

    /* ── SUMMARY ── */
    .summary-card { background: #fff; border-radius: var(--radius); box-shadow: 0 1px 8px rgba(0,0,0,.07); padding: 24px; position: sticky; top: 80px; }
    .summary-card h5 { font-weight: 700; margin-bottom: 20px; font-size: 1.05rem; }
    .summary-row { display: flex; justify-content: space-between; padding: 9px 0; font-size: .9rem; border-bottom: 1px solid var(--border); }
    .summary-row:last-of-type { border-bottom: 2px solid #212529; font-weight: 800; font-size: 1.1rem; padding-top: 14px; }
    .summary-row span:last-child { color: var(--red); font-weight: 700; }
    .summary-total { font-size: 1.5rem !important; }

    /* ── CHECKOUT FORM ── */
    .checkout-section { margin-top: 20px; }
    .checkout-section label { font-size: .8rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .3px; display: block; margin-bottom: 5px; }
    .checkout-section input,
    .checkout-section select,
    .checkout-section textarea {
        width: 100%; padding: 10px 13px;
        border: 1.5px solid var(--border); border-radius: 10px;
        font-size: .9rem; outline: none; margin-bottom: 14px;
        transition: border-color .15s; background: #fdfdfd;
    }
    .checkout-section input:focus,
    .checkout-section select:focus,
    .checkout-section textarea:focus { border-color: var(--red); background: #fff; }
    .checkout-section textarea { resize: none; height: 65px; }

    .btn-order {
        width: 100%; padding: 14px;
        background: linear-gradient(135deg, var(--red), var(--red-dark));
        color: #fff; border: none; border-radius: 12px;
        font-size: 1rem; font-weight: 700; cursor: pointer;
        box-shadow: 0 4px 16px rgba(230,57,70,.35);
        transition: all .2s; letter-spacing: .3px;
    }
    .btn-order:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 7px 22px rgba(230,57,70,.45); }
    .btn-order:disabled { opacity: .65; cursor: not-allowed; transform: none !important; }

    /* ── ORDER SUCCESS ── */
    #orderSuccessBox { display: none; }
    .success-icon { font-size: 3.5rem; }
    .order-code-badge {
        background: #f1f3f5; border: 2px dashed #ced4da;
        border-radius: 10px; padding: 10px 20px;
        font-family: monospace; font-size: 1.15rem; font-weight: 700;
        display: inline-block; letter-spacing: 1px;
    }

    /* ── TOAST ── */
    .toast-stack { position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
    .toast-msg {
        min-width: 240px; padding: 12px 18px; border-radius: 10px;
        color: #fff; font-size: .88rem; font-weight: 500;
        box-shadow: 0 4px 18px rgba(0,0,0,.18);
        animation: toastIn .25s ease;
    }
    .toast-msg.success { background: #2a9d8f; }
    .toast-msg.error   { background: var(--red); }
    @keyframes toastIn { from { opacity:0; transform: translateX(60px); } }

    /* ── SPINNER ── */
    .spin { display: inline-block; width: 16px; height: 16px; border: 2.5px solid rgba(255,255,255,.4); border-top-color: #fff; border-radius: 50%; animation: spin .65s linear infinite; vertical-align: middle; }
    @keyframes spin { to { transform: rotate(360deg); } }
</style>
@endpush

@section('content')
<!-- Breadcrumb -->
<div class="breadcrumb-wrap">
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="{{ url('/') }}">Trang chủ</a></li>
                <li class="breadcrumb-item active">Giỏ hàng</li>
            </ol>
        </nav>
    </div>
</div>

<div class="container pb-5">
    <div class="cart-layout">

        {{-- ══ LEFT: Danh sách sản phẩm ══ --}}
        <div>
            <div class="section-title">
                🛒 Giỏ hàng
                <span class="count" id="itemCountBadge">{{ $cart->items->count() }}</span>
            </div>

            <div class="cart-card" id="cartList">
                @forelse($cart->items as $item)
                    @php $product = $item->product; @endphp
                    <div class="cart-item" id="row-{{ $product->id }}" data-product="{{ $product->id }}">
                        {{-- Ảnh --}}
                        <div class="product-thumb">
                            @if($product->image)
                                <img src="{{ asset($product->image) }}" alt="{{ $product->name }}">
                            @else
                                📦
                            @endif
                        </div>

                        {{-- Thông tin --}}
                        <div>
                            <div class="item-name">{{ $product->name }}</div>
                            <div class="item-category">{{ $product->category->name ?? '' }}</div>
                            <div>
                                <span class="item-price">{{ number_format($product->sale_price, 0, ',', '.') }} ₫</span>
                                @if($product->price > $product->sale_price)
                                    <span class="item-price-orig">{{ number_format($product->price, 0, ',', '.') }} ₫</span>
                                    <span class="item-discount">-{{ $product->discount_percent }}%</span>
                                @endif
                            </div>
                            <div class="qty-wrap">
                                <button class="qty-btn btn-minus"
                                        data-id="{{ $product->id }}"
                                        {{ $item->quantity <= 1 ? 'disabled' : '' }}>−</button>
                                <input type="number"
                                       class="qty-input"
                                       id="qty-{{ $product->id }}"
                                       value="{{ $item->quantity }}"
                                       min="1"
                                       max="{{ $product->quantity }}"
                                       data-id="{{ $product->id }}">
                                <button class="qty-btn btn-plus"
                                        data-id="{{ $product->id }}"
                                        {{ $item->quantity >= $product->quantity ? 'disabled' : '' }}>+</button>
                            </div>
                        </div>

                        {{-- Subtotal + Xóa --}}
                        <div class="item-right">
                            <div class="item-subtotal" id="sub-{{ $product->id }}">
                                {{ number_format($item->subtotal, 0, ',', '.') }} ₫
                            </div>
                            <button class="btn-remove" data-id="{{ $product->id }}">
                                🗑 Xóa
                            </button>
                        </div>
                    </div>
                @empty
                    <div class="empty-cart" id="emptyMsg">
                        <div class="icon">🛒</div>
                        <h5>Giỏ hàng trống</h5>
                        <p class="text-muted mt-2">Hãy thêm sản phẩm để bắt đầu mua sắm!</p>
                        <a href="{{ url('/products') }}" class="btn btn-danger mt-3">Mua sắm ngay</a>
                    </div>
                @endforelse
            </div>

            <div class="cart-actions">
                <button class="btn-link-red" id="btnClear">🗑️ Xóa toàn bộ giỏ</button>
                <a href="{{ url('/products') }}" class="btn-link-gray">← Tiếp tục mua sắm</a>
                <a href="{{ route('orders.index') }}" class="btn-link-gray">📋 Lịch sử đơn hàng</a>
            </div>
        </div>

        {{-- ══ RIGHT: Tổng tiền + Đặt hàng ══ --}}
        <div>
            <div class="summary-card">

                {{-- Thành công --}}
                <div id="orderSuccessBox" class="text-center">
                    <div class="success-icon mb-2">✅</div>
                    <h5 class="text-success fw-bold">Đặt hàng thành công!</h5>
                    <p class="text-muted small mt-1">Mã đơn hàng của bạn</p>
                    <div class="order-code-badge mt-1" id="successCode">—</div>
                    <p class="text-muted small mt-3" id="successTotal"></p>
                    <a href="{{ route('orders.index') }}" class="btn btn-success w-100 mt-3">📋 Xem đơn hàng</a>
                    <button class="btn btn-outline-danger w-100 mt-2" onclick="location.reload()">🛍️ Tiếp tục mua sắm</button>
                </div>

                {{-- Form đặt hàng --}}
                <div id="orderFormBox">
                    <h5>📦 Tóm tắt đơn hàng</h5>

                    {{-- Summary rows --}}
                    <div class="summary-row">
                        <span>Tạm tính (<span id="summaryCount">{{ $cart->items->count() }}</span> sp)</span>
                        <span id="summaryAmount">{{ number_format($cart->total_amount, 0, ',', '.') }} ₫</span>
                    </div>
                    <div class="summary-row">
                        <span>Phí vận chuyển</span>
                        <span>Miễn phí</span>
                    </div>
                    <div class="summary-row">
                        <span>Tổng cộng</span>
                        <span class="summary-total" id="summaryTotal">{{ number_format($cart->total_amount, 0, ',', '.') }} ₫</span>
                    </div>

                    {{-- Checkout form --}}
                    <div class="checkout-section mt-3">
                        <label>Địa chỉ giao hàng <span class="text-danger">*</span></label>
                        <input type="text"
                               id="shippingAddress"
                               placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành…"
                               value="{{ Auth::user()->userProfile->address ?? '' }}">

                        <label>Phương thức thanh toán <span class="text-danger">*</span></label>
                        <select id="paymentMethod">
                            <option value="cod">💵 Thanh toán khi nhận hàng (COD)</option>
                            <option value="banking">🏦 Chuyển khoản ngân hàng</option>
                            <option value="momo">💜 Ví MoMo</option>
                            <option value="zalopay">🟦 ZaloPay</option>
                            <option value="vnpay">🔴 VNPay</option>
                        </select>

                        <label>Ghi chú (tuỳ chọn)</label>
                        <textarea id="orderNote" placeholder="Giao giờ hành chính, để hàng ở cổng…"></textarea>

                        <button class="btn-order" id="btnOrder" {{ $cart->items->isEmpty() ? 'disabled' : '' }}>
                            Đặt hàng ngay 🛒
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<!-- Toast container -->
<div class="toast-stack" id="toastStack"></div>
@endsection

@push('scripts')
<script>
const ROUTES = {
    add:     "{{ route('cart.add') }}",
    update:  "{{ route('cart.update') }}",
    remove:  "{{ route('cart.remove') }}",
    clear:   "{{ route('cart.clear') }}",
    order:   "{{ route('orders.store') }}" // ✅ QUAN TRỌNG
};
const CSRF = "{{ csrf_token() }}";

// ── TOAST ──────────────────────────────────────
function toast(msg, type = 'success') {
    const stack = document.getElementById('toastStack');
    const el    = document.createElement('div');
    el.className = `toast-msg ${type}`;
    el.textContent = (type === 'success' ? '✅ ' : '❌ ') + msg;
    stack.appendChild(el);
    setTimeout(() => el.remove(), 3500);
}

// ── FORMAT NUMBER ──────────────────────────────
function fmt(n) {
    return Number(n).toLocaleString('vi-VN') + ' ₫';
}

// ── AJAX HELPER ─────────────────────────────────
async function apiCall(url, method, body) {
    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': CSRF },
        body: JSON.stringify(body),
    });
    return res.json();
}

// ── UPDATE SUMMARY ──────────────────────────────
function updateSummary(count, total) {
    document.getElementById('itemCountBadge').textContent = count;
    document.getElementById('summaryCount').textContent   = count;
    const formatted = fmt(total);
    document.getElementById('summaryAmount').textContent  = formatted;
    document.getElementById('summaryTotal').textContent   = formatted;
    // Disable nút đặt hàng nếu giỏ trống
    document.getElementById('btnOrder').disabled = count === 0;
}

// ── MINUS BUTTON ────────────────────────────────
document.querySelectorAll('.btn-minus').forEach(btn => {
    btn.addEventListener('click', () => {
        const id    = btn.dataset.id;
        const input = document.getElementById('qty-' + id);
        const newQ  = Math.max(1, parseInt(input.value) - 1);
        input.value = newQ;
        doUpdate(id, newQ);
    });
});

// ── PLUS BUTTON ─────────────────────────────────
document.querySelectorAll('.btn-plus').forEach(btn => {
    btn.addEventListener('click', () => {
        const id    = btn.dataset.id;
        const input = document.getElementById('qty-' + id);
        const max   = parseInt(input.max);
        const newQ  = Math.min(max, parseInt(input.value) + 1);
        input.value = newQ;
        doUpdate(id, newQ);
    });
});

// ── INPUT CHANGE ─────────────────────────────────
document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', () => {
        const id   = input.dataset.id;
        const qty  = Math.max(1, Math.min(parseInt(input.max), parseInt(input.value) || 1));
        input.value = qty;
        doUpdate(id, qty);
    });
});

// ── DO UPDATE (AJAX) ─────────────────────────────
async function doUpdate(productId, quantity) {
    try {
        const data = await apiCall(ROUTES.update, 'PUT', { product_id: parseInt(productId), quantity });
        if (data.success) {
            if (data.deleted) {
                document.getElementById('row-' + productId)?.remove();
            } else {
                document.getElementById('sub-' + productId).textContent = fmt(data.subtotal);
                // Update minus btn state
                const minBtn = document.querySelector(`.btn-minus[data-id="${productId}"]`);
                if (minBtn) minBtn.disabled = quantity <= 1;
            }
            updateSummary(data.cart_count, data.cart_total);
            if (data.cart_count === 0) showEmptyCart();
        } else {
            toast(data.message, 'error');
        }
    } catch {
        toast('Lỗi kết nối, vui lòng thử lại', 'error');
    }
}

// ── REMOVE ITEM ─────────────────────────────────
document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', async () => {
        if (!confirm('Xóa sản phẩm này khỏi giỏ?')) return;
        const id   = btn.dataset.id;
        const data = await apiCall(ROUTES.remove, 'DELETE', { product_id: parseInt(id) });
        if (data.success) {
            document.getElementById('row-' + id)?.remove();
            toast(data.message);
            updateSummary(data.cart_count, data.cart_total);
            if (data.cart_count === 0) showEmptyCart();
        } else {
            toast(data.message, 'error');
        }
    });
});

// ── CLEAR CART ───────────────────────────────────
document.getElementById('btnClear')?.addEventListener('click', async () => {
    if (!confirm('Xóa toàn bộ giỏ hàng?')) return;
    const data = await apiCall(ROUTES.clear, 'DELETE', {});
    if (data.success) {
        showEmptyCart();
        toast(data.message);
        updateSummary(0, 0);
    }
});

function showEmptyCart() {
    const list = document.getElementById('cartList');
    list.innerHTML = `
        <div class="empty-cart">
            <div class="icon">🛒</div>
            <h5>Giỏ hàng trống</h5>
            <p class="text-muted mt-2">Hãy thêm sản phẩm để bắt đầu mua sắm!</p>
            <a href="/products" class="btn btn-danger mt-3">Mua sắm ngay</a>
        </div>`;
}

document.getElementById('btnOrder')?.addEventListener('click', async () => {
    const address = document.getElementById('shippingAddress').value.trim();
    const payment = document.getElementById('paymentMethod').value;
    const note    = document.getElementById('orderNote').value.trim();

    if (!address) {
        toast('Vui lòng nhập địa chỉ giao hàng', 'error');
        document.getElementById('shippingAddress').focus();
        return;
    }

    const btn = document.getElementById('btnOrder');
    btn.disabled = true;
    btn.innerHTML = '<span class="spin"></span> Đang xử lý…';

    try {
        const res  = await fetch(ROUTES.order, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': CSRF
            },
            body: JSON.stringify({
                shipping_address: address,
                payment_method: payment,
                note: note
            })
        });

        const data = await res.json();

        // ❌ Backend trả lỗi (422, 500)
        if (!res.ok || !data.success) {
            toast(data.message || 'Đặt hàng thất bại!', 'error');
            return;
        }

        // ✅ SUCCESS
        document.getElementById('orderFormBox').style.display = 'none';
        document.getElementById('orderSuccessBox').style.display = 'block';

        document.getElementById('successCode').textContent =
            data.data?.order_code ?? '---';

        document.getElementById('successTotal').textContent =
            `Tổng tiền: ${fmt(data.data?.total_amount ?? 0)} • ${data.data?.payment_label ?? ''}`;

        showEmptyCart();
        toast('🎉 Đặt hàng thành công!');

        // 👉 OPTIONAL: tự chuyển trang
        setTimeout(() => {
            window.location.href = "/orders";
        }, 2500);

    } catch (err) {
        console.error(err);
        toast('Lỗi kết nối server!', 'error');
    }

    btn.disabled = false;
    btn.innerHTML = 'Đặt hàng ngay 🛒';
});
</script>
@endpush
