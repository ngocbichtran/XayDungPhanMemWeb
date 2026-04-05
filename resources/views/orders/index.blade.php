@extends('layouts.app')

@section('content')
<div class="container">
    <h2 class="mb-4">Danh sách đơn hàng</h2>

    @if($orders->isEmpty())
        <div class="alert alert-info">
            Chưa có đơn hàng nào.
        </div>
    @else
        <div class="card">
            <div class="card-body">
                <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Tổng tiền</th>
                            <th>Thanh toán</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th class="text-center">Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($orders as $order)
                        <tr>
                            <td><strong>{{ $order->order_code }}</strong></td>

                            {{-- dùng đúng field DB --}}
                            <td>{{ number_format($order->total_price) }} đ</td>

                            <td>{{ ucfirst($order->payment_method) }}</td>

                            <td>
                                <span class="badge bg-secondary">
                                    {{ $order->status ?? 'pending' }}
                                </span>
                            </td>

                            <td>{{ $order->created_at->format('d/m/Y H:i') }}</td>

                            <td class="text-center">
                                <a href="{{ url('/orders/'.$order->id) }}" class="btn btn-sm btn-primary">
                                    Xem
                                </a>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>

                {{-- Pagination --}}
                <div class="mt-3">
                    {{ $orders->links() }}
                </div>
            </div>
        </div>
    @endif
</div>
@endsection