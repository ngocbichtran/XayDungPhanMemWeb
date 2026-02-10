@extends('layout.admin')

@section('content')
<div
    class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
    <div class="px-8 py-4 border-b border-[#dbe0e6] dark:border-gray-800 flex justify-between items-center">
        <h3 class="text-xl font-bold text-[#111418] dark:text-white">Add New Product</h3>
    </div>
    <div class="p-4">
        <form class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                    <label class="text-sm font-bold text-[#111418] dark:text-white">Product Name</label>
                    <input
                        class="form-input rounded-lg border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm"
                        type="text" />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-sm font-bold text-[#111418] dark:text-white">Category</label>
                    <select
                        class="form-select rounded-lg border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm">
                        <option>Electronics</option>
                        <option>Accessories</option>
                        <option>Apparel</option>
                        <option>Home Decor</option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                    <label class="text-sm font-bold text-[#111418] dark:text-white">Price</label>
                    <input
                        class="form-input rounded-lg border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm"
                        placeholder="0.0" step="0.1" type="number" />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-sm font-bold text-[#111418] dark:text-white">Quantity</label>
                    <input
                        class="form-input rounded-lg border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm"
                        placeholder="0" type="number" />
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-[#111418] dark:text-white">Description</label>
                <textarea
                    class="form-textarea rounded-lg border-[#dbe0e6] dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary text-sm"
                    placeholder="Write a short description about the product..." rows="3"></textarea>
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-sm font-bold text-[#111418] dark:text-white">Product Image</label>
                <div
                    class="border-2 border-dashed border-[#dbe0e6] dark:border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center gap-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                    <div
                        class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span class="material-symbols-outlined">cloud_upload</span>
                    </div>
                    <div class="text-center">
                        <p class="text-sm font-bold text-primary">Click to upload or drag and drop</p>
                    </div>
                </div>
            </div>
            <div class="flex justify-end gap-2 mt-2">
                <a href="{{ route('products.index') }}"
                    class="inline-flex items-center px-6 py-2.5 rounded-lg text-sm font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 shadow transition-all">
                    Cancel
                </a>
            </div>
        </form>
    </div>
</div>
@endsection