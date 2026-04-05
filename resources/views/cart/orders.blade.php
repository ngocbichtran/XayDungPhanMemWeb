{{-- resources/views/cart/orders.blade.php --}}
@extends('layouts.app')

@section('title', 'Lịch sử đơn hàng')

@push('styles')
<style>
    .order-row { background: #fff; border-radius: 12px; box-shadow: 0 1px 6px rgba(0,0,0,.07); padding: 20px 24px; margin-bottom: 16px; transition: box-shadow .2s; }
    .order-row:hover { box-shadow: 0 4px 16px rgba(0,0,0,.1); }
    .order-code { font-family: monospace; font-weight: 700; font-size: 1rem; }
    .badge-status { padding: 4px 12px; border-radius: 20px; font-size: .78rem; font-weight: 700; }
    .badge-warning  { background: #fff3cd; color: #856404; }
    .badge-info     { background: #d0ebff; color: #0c5460; }
    .badge-primary  { background: #dde5ff; color: #3b5bdb; }
    .badge-success  { background: #d3f9d8; color: #1a7431; }
    .badge-danger   { background: #ffe3e3; color: #c92a2a; }
    .order-total { font-size: 1.1rem; font-weight: 800; color: #e63946; }
    .btn-detail { border: 1.5px solid #dee2e6; background: #fff; border-radius: 8px; padding: 6px 14px; font-size: .84rem; cursor: pointer; text-decoration: none; color: #495057; transition: all .15s; }
    .btn-detail:hover { border-color: #e63946; color: #e63946; }
</style>
@endpush

@section('content')
<div class="container py-4">
    <div class="d-flex align-items-center gap-3 mb-4">
        <h4 class="mb-0 fw-bold">📋 Lịch sử đơn hàng</h4>
        <a href="{{ route('cart.index') }}" class="btn btn-sm btn-outline-danger">← Giỏ hàng</a>
    </div>

    @forelse($orders as $order)
        <div class="order-row">
            <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div>
                    <div class="order-code">#{{ $order->order_code }}</div>
                    <div class="text-muted small mt-1">{{ $order->created_at->format('d/m/Y H:i') }}</div>
                </div>
                <span class="badge-status badge-{{ $order->status_color }}">
                    {{ $order->status_label }}
                </span>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
                <div class="text-muted small">
                    {{ $order->items->count() }} sản phẩm •
                    {{ $order->payment_label }}
                    @if($order->payment_status === 'paid')
                        • <span class="text-success fw-bold">Đã thanh toán</span>
                    @else
                        • <span class="text-warning fw-bold">Chưa thanh toán</span>
                    @endif
                </div>
                <div class="d-flex align-items-center gap-3">
                    <span class="order-total">{{ number_format($order->total_amount, 0, ',', '.') }} ₫</span>
                    <a href="{{ route('orders.show', $order->id) }}" class="btn-detail">Xem chi tiết →</a>
                </div>
            </div>
        </div>
    @empty
        <div class="text-center py-5">
            <div style="font-size:3.5rem;opacity:.4">📦</div>
            <h5 class="text-muted mt-3">Bạn chưa có đơn hàng nào</h5>
            <a href="{{ url('/products') }}" class="btn btn-danger mt-3">Mua sắm ngay</a>
        </div>
    @endforelse

    <div class="mt-3">{{ $orders->links() }}</div>
</div>
@endsection
