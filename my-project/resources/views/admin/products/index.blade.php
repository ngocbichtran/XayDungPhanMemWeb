
@extends('layout.admin')

@section('title', 'Quản lý sản phẩm')

@section('content')
<div class="flex items-center justify-between mb-4">
    <h1 class="text-xl font-bold">Danh sách sản phẩm</h1>

    <a href="{{ route('products.create') }}"
       class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        + Thêm sản phẩm
    </a>
</div>

<div class="bg-white p-4 rounded shadow">
    <table id="products" class="w-full text-sm">
        <thead>
            <tr class="bg-gray-50">
                <th>ID</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
            </tr>
        </thead>
    </table>
</div>
@endsection
@push('js')
<script>
$(document).ready(function () {
    $('#products').DataTable({
        processing: true,
        serverSide: true,
        ajax: "{{ route('products.data') }}",

        pageLength: 15,          // mặc định 15 dòng
        lengthChange: false,     // ẩn dropdown số dòng

        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'price' },
            { data: 'quantity' },
            { data: 'status', orderable:false, searchable:false },
            { data: 'action', orderable:false, searchable:false },
        ],

        language: {
            search: "Tìm kiếm:",
            info: "Hiển thị _START_ → _END_ / _TOTAL_ sản phẩm",
            processing: "Đang tải...",
            paginate: {
                previous: "‹",
                next: "›"
            }
        }
    });
});
</script>
@endpush
