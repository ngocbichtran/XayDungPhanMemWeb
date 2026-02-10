@extends('layout.shop')
@section('content')
<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
        <a class="hover:text-primary" href="{{ route('trangchu') }}">Home</a>
        <span class="material-symbols-outlined text-sm">chevron_right</span>

        <a class="hover:text-primary" href="{{ route('shop.category', $product->category->id) }}">
            {{ $product->category->name }}
        </a>

        <span class="material-symbols-outlined text-sm">chevron_right</span>
        <span class="font-medium text-slate-900 dark:text-white">
            {{ $product->name }}
        </span>
    </nav>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="lg:col-span-7 space-y-4">
            <div id="mainImage" class="aspect-[4/3] w-full rounded-2xl overflow-hidden border shadow-sm mb-4
            flex items-center justify-center bg-white">
                <div class="w-[75%] h-[75%] bg-center bg-contain bg-no-repeat"
                    style="background-image:url('{{ $product->image }}')">
                </div>
            </div>

            <!-- THUMBNAILS -->
            <!-- <div class="flex gap-4">
                <div class="thumb w-24 aspect-square rounded-xl border-2 border-indigo-600 cursor-pointer overflow-hidden"
                    data-image="https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-15t-5g-22.jpg?_gl=1*9yjatd*_gcl_au*MTI0MzMzNzMwMi4xNzcwNTIwODQy*_ga*MTQwMzA4NjY2NS4xNzcwNTIwODQy*_ga_QLK8WFHNK9*czE3NzA1MjkwNjYkbzMkZzEkdDE3NzA1MjkwNzIkajU0JGwwJGgxOTQ1MTQyNDYw">
                    <div class="w-full h-full bg-cover bg-center"
                        style="background-image:url('https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-15t-5g-22.jpg?_gl=1*9yjatd*_gcl_au*MTI0MzMzNzMwMi4xNzcwNTIwODQy*_ga*MTQwMzA4NjY2NS4xNzcwNTIwODQy*_ga_QLK8WFHNK9*czE3NzA1MjkwNjYkbzMkZzEkdDE3NzA1MjkwNzIkajU0JGwwJGgxOTQ1MTQyNDYw')">
                    </div>
                </div>

                <div class="thumb w-24 aspect-square rounded-xl border-2 border-transparent hover:border-slate-300 cursor-pointer overflow-hidden"
                    data-image="https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-15t-5g-11.jpg?_gl=1*le3zyo*_gcl_au*MTI0MzMzNzMwMi4xNzcwNTIwODQy*_ga*MTQwMzA4NjY2NS4xNzcwNTIwODQy*_ga_QLK8WFHNK9*czE3NzA1MjkwNjYkbzMkZzEkdDE3NzA1MjkwNzIkajU0JGwwJGgxOTQ1MTQyNDYw">
                    <div class="w-full h-full bg-cover bg-center"
                        style="background-image:url('https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-15t-5g-11.jpg?_gl=1*le3zyo*_gcl_au*MTI0MzMzNzMwMi4xNzcwNTIwODQy*_ga*MTQwMzA4NjY2NS4xNzcwNTIwODQy*_ga_QLK8WFHNK9*czE3NzA1MjkwNjYkbzMkZzEkdDE3NzA1MjkwNzIkajU0JGwwJGgxOTQ1MTQyNDYw')">
                    </div>
                </div>

                <div class="thumb w-24 aspect-square rounded-xl border-2 border-transparent hover:border-slate-300 cursor-pointer overflow-hidden"
                    data-image="https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-15t-5g-13.jpg?_gl=1*le3zyo*_gcl_au*MTI0MzMzNzMwMi4xNzcwNTIwODQy*_ga*MTQwMzA4NjY2NS4xNzcwNTIwODQy*_ga_QLK8WFHNK9*czE3NzA1MjkwNjYkbzMkZzEkdDE3NzA1MjkwNzIkajU0JGwwJGgxOTQ1MTQyNDYw">
                    <div class="w-full h-full bg-cover bg-center"
                        style="background-image:url('https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-15t-5g-13.jpg?_gl=1*le3zyo*_gcl_au*MTI0MzMzNzMwMi4xNzcwNTIwODQy*_ga*MTQwMzA4NjY2NS4xNzcwNTIwODQy*_ga_QLK8WFHNK9*czE3NzA1MjkwNjYkbzMkZzEkdDE3NzA1MjkwNzIkajU0JGwwJGgxOTQ1MTQyNDYw')">
                    </div>
                </div>
            </div> -->

        </div>
        <div class="lg:col-span-5 flex flex-col">
            <div id="rating-stars" style="display:flex;gap:4px;font-size:28px;">

                <div style="position:relative;cursor:pointer;">
                    <span data-value="0.5"
                        style="position:absolute;left:0;top:0;width:50%;height:100%;z-index:10;"></span>
                    <span data-value="1"
                        style="position:absolute;right:0;top:0;width:50%;height:100%;z-index:10;"></span>

                    <span class="material-symbols-outlined star-icon"
                        style="font-variation-settings:'FILL' 0; color:#d1d5db;">
                        star
                    </span>
                </div>

                <div style="position:relative;cursor:pointer;">
                    <span data-value="1.5"
                        style="position:absolute;left:0;top:0;width:50%;height:100%;z-index:10;"></span>
                    <span data-value="2"
                        style="position:absolute;right:0;top:0;width:50%;height:100%;z-index:10;"></span>

                    <span class="material-symbols-outlined star-icon"
                        style="font-variation-settings:'FILL' 0; color:#d1d5db;">
                        star
                    </span>
                </div>

                <div style="position:relative;cursor:pointer;">
                    <span data-value="2.5"
                        style="position:absolute;left:0;top:0;width:50%;height:100%;z-index:10;"></span>
                    <span data-value="3"
                        style="position:absolute;right:0;top:0;width:50%;height:100%;z-index:10;"></span>

                    <span class="material-symbols-outlined star-icon"
                        style="font-variation-settings:'FILL' 0; color:#d1d5db;">
                        star
                    </span>
                </div>

                <div style="position:relative;cursor:pointer;">
                    <span data-value="3.5"
                        style="position:absolute;left:0;top:0;width:50%;height:100%;z-index:10;"></span>
                    <span data-value="4"
                        style="position:absolute;right:0;top:0;width:50%;height:100%;z-index:10;"></span>

                    <span class="material-symbols-outlined star-icon"
                        style="font-variation-settings:'FILL' 0; color:#d1d5db;">
                        star
                    </span>
                </div>

                <!-- SAO 5 -->
                <div style="position:relative;cursor:pointer;">
                    <span data-value="4.5"
                        style="position:absolute;left:0;top:0;width:50%;height:100%;z-index:10;"></span>
                    <span data-value="5"
                        style="position:absolute;right:0;top:0;width:50%;height:100%;z-index:10;"></span>

                    <span class="material-symbols-outlined star-icon"
                        style="font-variation-settings:'FILL' 0; color:#d1d5db;">
                        star
                    </span>
                </div>
            </div>

            <p style="margin-top:8px;font-size:14px;">
                Bạn chọn: <b id="rating-value">0</b> sao
            </p>

            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                {{ $product->name }}
            </h2>
            <div class="flex items-center gap-4 mb-6">
                <span class="text-3xl font-bold text-slate-900 dark:text-white">
                    {{ number_format($product->price) }}
                </span>
            </div>
            <p class="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
                {{ $product->description }}
            </p>
            <div class="space-y-6 mb-8 border-t border-slate-200 dark:border-slate-800 pt-6">
                <div>
                    <span class="block text-sm font-bold text-slate-900 dark:text-white mb-3">Quantity</span>
                    <div
                        class="flex items-center bg-slate-100 dark:bg-slate-800 w-fit rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                        <button class="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <span class="material-symbols-outlined text-xl">remove</span>
                        </button>
                        <span class="px-6 font-bold text-slate-900 dark:text-white">1</span>
                        <button class="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            <span class="material-symbols-outlined text-xl">add</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                <button
                    class="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span class="material-symbols-outlined">shopping_cart</span>
                    Add to Cart
                </button>
                <button
                    class="flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                    <span class="material-symbols-outlined">bolt</span>
                    Buy Now
                </button>
            </div>
            <div class="mt-8 flex items-center justify-between py-4 border-y border-slate-100 dark:border-slate-800">
                <div class="flex flex-col items-center text-center gap-1">
                    <span class="material-symbols-outlined text-primary text-xl">local_shipping</span>
                    <span class="text-[10px] font-bold uppercase text-slate-400">Free Delivery</span>
                </div>
                <div class="flex flex-col items-center text-center gap-1">
                    <span class="material-symbols-outlined text-primary text-xl">verified_user</span>
                    <span class="text-[10px] font-bold uppercase text-slate-400">2 Yr Warranty</span>
                </div>
                <div class="flex flex-col items-center text-center gap-1">
                    <span class="material-symbols-outlined text-primary text-xl">assignment_return</span>
                    <span class="text-[10px] font-bold uppercase text-slate-400">30 Day Return</span>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-20">
        <div class="flex border-b border-slate-200 dark:border-slate-800 gap-8">
            <button class="pb-4 text-sm font-bold text-primary border-b-2 border-primary">Specifications</button>
            <button
                class="pb-4 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Customer
                Reviews (124)</button>
            <button
                class="pb-4 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Shipping
                &amp; Returns</button>
        </div>
        <div class="py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div class="space-y-4">
                    <h4 class="font-bold text-lg text-slate-900 dark:text-white">Technical Details</h4>
                    <dl class="space-y-3">
                        <div class="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                            <dt class="text-sm text-slate-500">Driver Type</dt>
                            <dd class="text-sm font-medium text-slate-900 dark:text-white">40mm Dynamic, Titanium Coated
                            </dd>
                        </div>
                        <div class="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                            <dt class="text-sm text-slate-500">Frequency Response</dt>
                            <dd class="text-sm font-medium text-slate-900 dark:text-white">10Hz - 40,000Hz</dd>
                        </div>
                        <div class="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                            <dt class="text-sm text-slate-500">Battery Life</dt>
                            <dd class="text-sm font-medium text-slate-900 dark:text-white">Up to 45 Hours (ANC Off)</dd>
                        </div>
                        <div class="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                            <dt class="text-sm text-slate-500">Bluetooth Version</dt>
                            <dd class="text-sm font-medium text-slate-900 dark:text-white">5.2 with aptX HD</dd>
                        </div>
                    </dl>
                </div>
                <div class="space-y-4">
                    <h4 class="font-bold text-lg text-slate-900 dark:text-white">What's in the Box</h4>
                    <ul class="space-y-3">
                        <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Elite Pro Wireless Headphones
                        </li>
                        <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Premium Travel Hard Case
                        </li>
                        <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
                            USB-C Charging Cable (1.2m)
                        </li>
                        <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <span class="material-symbols-outlined text-primary text-lg">check_circle</span>
                            3.5mm Analog Audio Cable
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-20 border-t border-slate-200 dark:border-slate-800 pt-16">
        <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">People Also Viewed</h3>
            <a class="text-primary font-semibold hover:underline flex items-center gap-1" href="#">View all <span
                    class="material-symbols-outlined text-sm">arrow_forward</span></a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
  
            <div class="group cursor-pointer">
                <div
                    class="aspect-square rounded-xl overflow-hidden bg-white dark:bg-slate-800 mb-4 border border-slate-200 dark:border-slate-800 relative">
                    <div class="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                        data-alt="Compact portable bluetooth speaker in grey"
                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1-HoND7-aMMdW_z-romwXm3Vq2M-B94SRUp-PRsegh-lHiYS4Wiwn0yBJnWLz5bA0fDEkTC5f_pLDU5f0rzcDVPZB9o9j5KpngwxuWsNiMS3Ypi6up0gVICCeVDr5842lbwYntMO6qhpOCqPZIfN5mvf-ZAnyXNw9MqDHKr0w1OGrTw-YIeJnahGDand6V45qj6QGpw-jHkOWBIbdIsew0qz9C0R6tYNNcKJiAR-OitILfDphNjjJl6cEmdWAr_bfa6XCeZW5OBVH')">
                    </div>
                    <button
                        class="absolute bottom-3 right-3 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="material-symbols-outlined text-slate-900">favorite</span>
                    </button>
                </div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1">Sonic Mini Speaker</h4>
                <span class="text-sm text-primary font-bold">$79.00</span>
            </div>

            <div class="group cursor-pointer">
                <div
                    class="aspect-square rounded-xl overflow-hidden bg-white dark:bg-slate-800 mb-4 border border-slate-200 dark:border-slate-800 relative">
                    <div class="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                        data-alt="High quality studio microphone on arm"
                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB15fErQtqcfJNuiTDx7g0NGxepL7CkR3uZv3Y2IRW3tuE-zy6Qt34ERaKYyIvUUoYLp1psNCnJVntRQHLxjA-ZUFvwXUQ6qNrqfQEFYBpLS3bLbeJKcHMfESixfZmXC3QfQ9HNaQpTbom1d8R-kONMmZUw7WOFwjBroVf4KwDiY95W6WmDBpVXTeFA9_LNAD1evluvbguoS-JJw_2t93gHaEg_grPA_CHciGYF9HyJAlWOsetlmJoNPD__MQwUgT8gKPhTo0JvNZaq')">
                    </div>
                    <button
                        class="absolute bottom-3 right-3 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="material-symbols-outlined text-slate-900">favorite</span>
                    </button>
                </div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1">Pro Stream Mic</h4>
                <span class="text-sm text-primary font-bold">$189.00</span>
            </div>

            <div class="group cursor-pointer">
                <div
                    class="aspect-square rounded-xl overflow-hidden bg-white dark:bg-slate-800 mb-4 border border-slate-200 dark:border-slate-800 relative">
                    <div class="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                        data-alt="Sleek in-ear wireless earbuds with charging case"
                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjBo61xuFvQowPPdTJy-6vtZWZyh3W_GHeLSMM-id_sE7Mq54BUHiL0qdP8CaGbNLcBqITuVEtw60LtEQXPVC8OXHNvr0vhDfb13kjw05ik86mo3yeaNNnkmUtzm6tGrcws_HZe_kF8dyJXyurTeHKqbtN_APjNi7olIPl5R7JiEvDPA4z_r2GzVBhM1MB-X3IQTiG0JBXcpzj0RtOfzvWNKLeeTBqlbEfpdXUoaF-oGKQGQraVA81dw9I0ob6LOExKt_x1woZahpJ')">
                    </div>
                    <button
                        class="absolute bottom-3 right-3 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="material-symbols-outlined text-slate-900">favorite</span>
                    </button>
                </div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1">Buds Pro ANC</h4>
                <span class="text-sm text-primary font-bold">$129.00</span>
            </div>

            <div class="group cursor-pointer">
                <div
                    class="aspect-square rounded-xl overflow-hidden bg-white dark:bg-slate-800 mb-4 border border-slate-200 dark:border-slate-800 relative">
                    <div class="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-105"
                        data-alt="White modern smart watch with silicone band"
                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAiUuQlrZnsDVnohaJxljYoZg5p7r9OZt0EuCL0RNj3I31ipHqB0nP_ySTFVIAdnj2k6nP8VI5PufkthtruH6oIC-NDCDtV3TTB0x1dK8YIgwo9hDQQs7UC696ZO1GzuhgLcvSphp9RxrEPET8dDeoet4_G51EhdsnZQOj2T83LEJZvGd31ycYGA9oSXAWi0TS-7BZof7Y8yoUplo4HYbW2LQ0EZ-WwO1JcQontccxBdnglYY_NDaEwsOkaBTzePhV2bOkq1EhqHYLu')">
                    </div>
                    <button
                        class="absolute bottom-3 right-3 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="material-symbols-outlined text-slate-900">favorite</span>
                    </button>
                </div>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-1">Active Series Watch</h4>
                <span class="text-sm text-primary font-bold">$349.00</span>
            </div>
        </div>
    </div>
</main>

<script>
const halves = document.querySelectorAll('#rating-stars span[data-value]');
const icons = document.querySelectorAll('#rating-stars .star-icon');
let currentRating = 0;

halves.forEach(h => {
    h.addEventListener('mouseenter', () => paint(parseFloat(h.dataset.value)));
    h.addEventListener('mouseleave', () => paint(currentRating));
    h.addEventListener('click', () => {
        currentRating = parseFloat(h.dataset.value);
        document.getElementById('rating-value').innerText = currentRating;
    });
});

function paint(value) {
    icons.forEach((icon, index) => {
        const starVal = index + 1;

        if (value >= starVal) {
            icon.textContent = 'star';
            icon.style.fontVariationSettings = "'FILL' 1";
            icon.style.color = '#f59e0b';
        } else if (value >= starVal - 0.5) {
            icon.textContent = 'star_half';
            icon.style.fontVariationSettings = "'FILL' 1";
            icon.style.color = '#f59e0b';
        } else {
            icon.textContent = 'star';
            icon.style.fontVariationSettings = "'FILL' 0";
            icon.style.color = '#d1d5db';
        }
    });
}

const mainImage = document.querySelector('#mainImage > div');
const thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        mainImage.style.backgroundImage =
            `url('${thumb.dataset.image}')`;

        thumbs.forEach(t => {
            t.classList.remove('border-indigo-600');
            t.classList.add('border-transparent');
        });

        thumb.classList.add('border-indigo-600');
        thumb.classList.remove('border-transparent');
    });
});
</script>

@endsection