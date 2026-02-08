@extends('layout.admin')

@section('content')
<h2>Thêm loại sản phẩm</h2>

<form method="POST" action="{{ route('categories.store') }}">
    @csrf

    <div class="mb-3">
        <label>Tên loại</label>
        <input type="text" name="name" class="form-control" required>
    </div>

    <div class="mb-3">
        <label>Trạng thái</label>
        <select name="status" class="form-control">
            <option value="1">Hiển thị</option>
            <option value="0">Ẩn</option>
        </select>
    </div>

    <button class="btn btn-success">Lưu</button>
</form>
@endsection
