{{-- resources/views/cart/order-detail.blade.php --}}
@extends('layouts.app')

@section('title', 'Chi tiết đơn hàng #' . $order->order_code)

@push('styles')
<style>
    .detail-card { background: #fff; border-radius: 14px; box-shadow: 0 1px 8px rgba(0,0,0,.07); padding: 28px; margin-bottom: 20px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media(max-width:576px){ .info-grid { grid-template-columns: 1fr; } }
    .info-item label { font-size: .75rem; font-weight: 700; color: #6c757d; text-transform: uppercase; display: block; margin-bottom: 3px; }
    .info-item span  { font-size: .95rem; font-weight: 600; }
    .badge-status { padding: 5px 14px; border-radius: 20px; font-size: .8rem; font-weight: 700; }
    .badge-warning { background: #fff3cd; color: #856404; }
    .badge-info    { background: #d0ebff; color: #0c5460; }
    .badge-primary { background: #dde5ff; color: #3b5bdb; }
    .badge-success { background: #d3f9d8; color: #1a7431; }
    .badge-danger  { background: #ffe3e3; color: #c92a2a; }
    .item-row { display: flex; gap: 14px; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f3f5; }
    .item-row:last-child { border-bottom: none; }
    .item-thumb { width: 60px; height: 60px; border-radius: 8px; background: #f1f3f5; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; flex-shrink: 0; }
    .item-thumb img { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; }
    .grand-total { background: linear-gradient(135deg, #e63946, #c1121f); color: #fff; border-radius: 12px; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; }
    .grand-total .label { font-size: 1rem; opacity: .9; }
    .grand-total .amount { font-size: 1.6rem; font-weight: 800; }
</style>
@endpush

@section('content')
<div class="container py-4" style="max-width:800px">
    <div class="d-flex align-items-center gap-3 mb-4">
        <a href="{{ route('orders.index') }}" class="btn btn-sm btn-outline-secondary">← Quay lại</a>
        <h4 class="mb-0 fw-bold">Chi tiết đơn hàng</h4>
    </div>

    {{-- Thông tin đơn hàng --}}
    <div class="detail-card">
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
                <div style="font-family:monospace;font-size:1.15rem;font-weight:800">#{{ $order->order_code }}</div>
                <div class="text-muted small">{{ $order->created_at->format('d/m/Y H:i') }}</div>
            </div>
            <span class="badge-status badge-{{ $order->status_color }}">{{ $order->status_label }}</span>
        </div>

        <div class="info-grid">
            <div class="info-item">
                <label>Địa chỉ giao hàng</label>
                <span>{{ $order->shipping_address }}</span>
            </div>
            <div class="info-item">
                <label>Phương thức thanh toán</label>
                <span>{{ $order->payment_label }}</span>
            </div>
            <div class="info-item">
                <label>Trạng thái thanh toán</label>
                <span class="{{ $order->payment_status === 'paid' ? 'text-success' : 'text-warning' }}">
                    {{ $order->payment_status === 'paid' ? '✅ Đã thanh toán' : '⏳ Chưa thanh toán' }}
                </span>
            </div>
            @if($order->note)
            <div class="info-item">
                <label>Ghi chú</label>
                <span>{{ $order->note }}</span>
            </div>
            @endif
        </div>
    </div>

    {{-- Sản phẩm --}}
    <div class="detail-card">
        <h6 class="fw-bold mb-3">🛍️ Sản phẩm trong đơn ({{ $order->items->count() }})</h6>

        @foreach($order->items as $item)
            <div class="item-row">
                <div class="item-thumb">
                    @if($item->product?->image)
                        <img src="{{ asset($item->product->image) }}" alt="{{ $item->product->name }}">
                    @else
                        📦
                    @endif
                </div>
                <div class="flex-grow-1">
                    <div class="fw-semibold">{{ $item->product->name ?? 'Sản phẩm đã xóa' }}</div>
                    <div class="text-muted small">
                        {{ number_format($item->price, 0, ',', '.') }} ₫ × {{ $item->quantity }}
                    </div>
                </div>
                <div class="fw-bold text-danger">
                    {{ number_format($item->quantity * $item->price, 0, ',', '.') }} ₫
                </div>
            </div>
        @endforeach
    </div>

    {{-- Tổng tiền --}}
    <div class="grand-total">
        <span class="label">Tổng cộng ({{ $order->items->count() }} sản phẩm)</span>
        <span class="amount">{{ number_format($order->total_amount, 0, ',', '.') }} ₫</span>
    </div>
</div>
@endsection
