<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Sản phẩm - ThanhTan Shop</title>

    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body { font-family: 'Be Vietnam Pro', sans-serif; background: #f8f9fa; }
        .navbar { background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,.08); }
        .navbar-brand { font-weight: 700; color: #e63946 !important; }
        .product-card { background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 1px 6px rgba(0,0,0,.06); }
        .product-img { height:200px; display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .product-img img { width:100%; height:100%; object-fit:cover; }
        .product-body { padding:12px; }
        .btn-add-cart {
            background:#e63946; color:#fff; border:none;
            border-radius:8px; padding:8px; width:100%;
        }
        .btn-add-cart:hover { background:#c1121f; }
        .toast-stack { position: fixed; bottom: 20px; right: 20px; z-index: 9999; }
        .toast-msg {
            background:#2a9d8f; color:#fff; padding:10px 14px;
            border-radius:8px; margin-top:6px;
        }
        .toast-msg.error { background:#e63946; }
    </style>
</head>

<body>

<!-- NAVBAR -->
<nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
        <a class="navbar-brand" href="/">🛍️ ThanhTan Shop</a>

        <div class="ms-auto">
            <a href="/cart" class="btn btn-outline-danger">
                🛒 Giỏ hàng
            </a>
        </div>
    </div>
</nav>

<div class="container py-4">

    <!-- PRODUCTS -->
    <div class="row g-3">
        @foreach($products as $product)
        <div class="col-6 col-md-4 col-lg-3">
            <div class="product-card">

                <div class="product-img">
                    @if($product->image)
                        <img src="{{ asset($product->image) }}">
                    @else
                        📦
                    @endif
                </div>

                <div class="product-body">
                    <div class="fw-semibold mb-2">
                        {{ $product->name }}
                    </div>

                    <div class="text-danger fw-bold mb-2">
                        {{ number_format($product->sale_price ?: $product->price, 0, ',', '.') }} ₫
                    </div>

                    <button class="btn-add-cart"
                            data-id="{{ $product->id }}"
                            {{ $product->quantity <= 0 ? 'disabled' : '' }}>
                        {{ $product->quantity <= 0 ? 'Hết hàng' : '🛒 Thêm vào giỏ' }}
                    </button>
                </div>

            </div>
        </div>
        @endforeach
    </div>

</div>

<!-- TOAST -->
<div class="toast-stack" id="toastStack"></div>

<script>
const CSRF = document.querySelector('meta[name="csrf-token"]').content;

function toast(msg, type = 'success') {
    const el = document.createElement('div');
    el.className = 'toast-msg ' + (type === 'error' ? 'error' : '');
    el.innerText = msg;
    document.getElementById('toastStack').appendChild(el);

    setTimeout(() => el.remove(), 3000);
}

/*
|--------------------------------------------------------------------------
| ADD TO CART (CHUẨN)
|--------------------------------------------------------------------------
*/
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', async () => {

        const id = btn.dataset.id;

        btn.disabled = true;
        btn.innerText = 'Đang thêm...';

        try {
            const res = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': CSRF
                },
                body: JSON.stringify({
                    product_id: id,
                    quantity: 1
                })
            });

            const data = await res.json();

            if (data.success) {
                toast(data.message || 'Đã thêm vào giỏ');
            } else {
                toast(data.message || 'Lỗi', 'error');
            }

        } catch (e) {
            toast('Lỗi kết nối', 'error');
        }

        btn.disabled = false;
        btn.innerText = '🛒 Thêm vào giỏ';
    });
});
</script>

</body>
</html>