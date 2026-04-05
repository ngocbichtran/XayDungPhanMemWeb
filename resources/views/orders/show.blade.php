@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Chi tiết đơn hàng</h2>

    <p><strong>Mã đơn:</strong> {{ $order->order_code }}</p>
    <p><strong>Địa chỉ:</strong> {{ $order->shipping_address }}</p>
    <p><strong>Thanh toán:</strong> {{ $order->payment_label }}</p>
    <p><strong>Trạng thái:</strong> {{ $order->status_label }}</p>

    <hr>

    <h4>Sản phẩm</h4>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tạm tính</th>
            </tr>
        </thead>
        <tbody>
            @foreach($order->items as $item)
            <tr>
                <td>{{ $item->product->name ?? 'N/A' }}</td>
                <td>{{ number_format($item->price) }} đ</td>
                <td>{{ $item->quantity }}</td>
                <td>{{ number_format($item->price * $item->quantity) }} đ</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h4 class="text-end">
        Tổng tiền: {{ number_format($order->total_amount) }} đ
    </h4>

    <a href="{{ url('/orders') }}" class="btn btn-secondary">Quay lại</a>
</div>
@endsection