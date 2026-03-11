@extends('layout.admin')

@section('title', 'Sửa Page')

@section('content')
<h1 class="text-xl font-bold mb-4">Cập nhật trang</h1>

<form action="{{ route('pages.update', $page->id) }}"
      method="POST" class="space-y-4">
    @csrf
    @method('PUT')

    <input name="title"
           value="{{ old('title', $page->title) }}"
           class="w-full border p-2 rounded">

    <input name="link"
           value="{{ old('link', $page->link) }}"
           class="w-full border p-2 rounded">

    <textarea name="content" rows="5"
              class="w-full border p-2 rounded">{{ old('content', $page->content) }}</textarea>

    <select name="status" class="w-full border p-2 rounded">
        <option value="1" {{ $page->status ? 'selected' : '' }}>Hiện</option>
        <option value="0" {{ !$page->status ? 'selected' : '' }}>Ẩn</option>
    </select>

    <button class="px-5 py-2 bg-blue-600 text-white rounded">
        Cập nhật
    </button>
</form>
@endsection
