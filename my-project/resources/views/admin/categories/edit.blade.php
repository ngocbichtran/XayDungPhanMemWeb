@extends('layout.admin')

@section('content')
<h2>Sửa loại sản phẩm</h2>

<form method="POST" action="{{ route('categories.update', $category->id) }}">
    @csrf
    @method('PUT')

    <div class="mb-3">
        <label>Tên loại</label>
        <input type="text" name="name"
               class="form-control"
               value="{{ $category->name }}" required>
    </div>

    <div class="mb-3">
        <label>Trạng thái</label>
        <select name="status" class="form-control">
            <option value="1" {{ $category->status ? 'selected' : '' }}>Hiển thị</option>
            <option value="0" {{ !$category->status ? 'selected' : '' }}>Ẩn</option>
        </select>
    </div>

    <button class="btn btn-success">Cập nhật</button>
</form>
@endsection
