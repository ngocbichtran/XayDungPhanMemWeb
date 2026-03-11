@extends('layout.admin')

@section('title', 'Thêm Page')

@section('content')
<h1 class="text-xl font-bold mb-4">Thêm trang</h1>

<form action="{{ route('pages.store') }}" method="POST" class="space-y-4">
    @csrf

    <input name="title" placeholder="Tiêu đề"
           class="w-full border p-2 rounded">

    <input name="link" placeholder="slug-page"
           class="w-full border p-2 rounded">

    <textarea name="content" rows="5"
              class="w-full border p-2 rounded"
              placeholder="Nội dung"></textarea>

    <select name="status" class="w-full border p-2 rounded">
        <option value="1">Hiện</option>
        <option value="0">Ẩn</option>
    </select>

    <button class="px-5 py-2 bg-blue-600 text-white rounded">
        Lưu
    </button>
</form>
@endsection
