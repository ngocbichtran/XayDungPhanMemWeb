@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Checkout</h2>

    <form id="checkoutForm">
        @csrf

        <div class="mb-3">
            <label>Địa chỉ giao hàng</label>
            <input type="text" name="shipping_address" class="form-control" required>
        </div>

        <div class="mb-3">
            <label>Phương thức thanh toán</label>
            <select name="payment_method" class="form-control" required>
                <option value="cod">COD</option>
                <option value="banking">Banking</option>
                <option value="momo">MoMo</option>
                <option value="zalopay">ZaloPay</option>
                <option value="vnpay">VNPay</option>
            </select>
        </div>

        <div class="mb-3">
            <label>Ghi chú</label>
            <textarea name="note" class="form-control"></textarea>
        </div>

        <button type="submit" id="btnSubmit" class="btn btn-success">
            Đặt hàng
        </button>
    </form>
</div>

{{-- CSRF meta (quan trọng) --}}
<meta name="csrf-token" content="{{ csrf_token() }}">

<script>
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let btn = document.getElementById('btnSubmit');
    btn.disabled = true;
    btn.innerText = 'Đang xử lý...';

    let formData = new FormData(this);

    fetch("{{ route('orders.store') }}",  {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Đặt hàng thành công: ' + data.data.order_code);
            window.location.href = '/orders';
        } else {
            alert(data.message || 'Đặt hàng thất bại');
        }
    })
    .catch(err => {
        console.error(err);
        alert('Có lỗi xảy ra!');
    })
    .finally(() => {
        btn.disabled = false;
        btn.innerText = 'Đặt hàng';
    });
});
</script>
@endsection