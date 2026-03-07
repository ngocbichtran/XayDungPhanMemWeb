@extends('layout.admin')

@section('content')
<h2>Thêm loại sản phẩm</h2>

<form action="{{ route('categories.store') }}" method="POST">
    @csrf

    <div>
        <label>Tên loại</label>
        <input type="text" name="name">
    </div>

    <div>
        <label>Mô tả</label>
        <textarea name="description"></textarea>
    </div>

    <div>
        <label>Trạng thái</label>
        <select name="status">
            <option value="1">Hoạt động</option>
            <option value="0">Ẩn</option>
        </select>
    </div>

    <button type="submit">Lưu</button>
</form>

@endsection
