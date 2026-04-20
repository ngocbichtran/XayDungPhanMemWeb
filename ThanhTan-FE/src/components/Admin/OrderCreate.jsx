import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const OrderCreate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Lưu danh sách đổ vào Dropdown
    const [productList, setProductList] = useState([]); 
    const [userList, setUserList] = useState([]); 

    const [customer, setCustomer] = useState({
        user_id: '',
        phone: '',
        shipping_address: '',
        note: ''
    });

    const [items, setItems] = useState([{ product_id: '', quantity: 1, price: 0 }]);

    // 1. Tải cả sản phẩm và khách hàng khi vào trang
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resProd, resUser] = await Promise.all([
                    api.get('/admin/products/list'),
                    api.get('/admin/users/list')
                ]);
                setProductList(resProd.data);
                setUserList(resUser.data);
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            }
        };
        fetchData();
    }, []);

    const handleAddItem = () => setItems([...items, { product_id: '', quantity: 1, price: 0 }]);

    const handleRemoveItem = (index) => {
        if (items.length === 1) return alert('Phải có ít nhất 1 sản phẩm!');
        setItems(items.filter((_, i) => i !== index));
    };

    const handleProductSelect = (index, productId) => {
        const selectedProd = productList.find(p => p.id === parseInt(productId));
        const newItems = [...items];
        newItems[index].product_id = productId;
        // Giá chỉ dùng để tính toán và hiển thị cho Admin xem trên UI
        if (selectedProd) {
            newItems[index].price = selectedProd.sale_price > 0 ? selectedProd.sale_price : selectedProd.price;
        }
        setItems(newItems);
    };

    const calculateTotal = () => items.reduce((t, i) => t + (i.quantity * i.price), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Tối ưu Payload: Lọc mảng items, CHỈ gửi product_id và quantity lên Backend
            // Ép kiểu quantity về số nguyên (parseInt) để tránh lỗi string
            const cleanItems = items.map(item => ({
                product_id: item.product_id,
                quantity: parseInt(item.quantity)
            }));

            // Tạo cục data gửi đi chuẩn với validate của Laravel
            const payload = {
                user_id: customer.user_id,
                shipping_address: customer.shipping_address,
                items: cleanItems
            };

            await api.post('/admin/orders', payload);
            alert('🎉 Tạo đơn hàng thành công!');
            navigate('/admin/orders');
            
        } catch (error) {
            alert('Lỗi: ' + (error.response?.data?.message || 'Không thể tạo đơn hàng'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <Link to="/admin/orders" className="text-gray-500 hover:text-gray-800 font-semibold">&larr; Quay lại danh sách</Link>
                <h2 className="text-2xl font-bold text-gray-800">Tạo Đơn Hàng Mới</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">1. Thông tin khách hàng</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chọn Khách hàng *</label>
                            <select 
                                required
                                className="w-full border border-gray-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-500"
                                value={customer.user_id}
                                onChange={(e) => setCustomer({...customer, user_id: e.target.value})}
                            >
                                <option value="">-- Chọn khách hàng --</option>
                                {userList.map(u => <option key={u.id} value={u.id}>{u.name} (ID: {u.id})</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                            <input type="text" required className="w-full border border-gray-300 rounded p-2"
                                value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng *</label>
                            <input type="text" required className="w-full border border-gray-300 rounded p-2"
                                value={customer.shipping_address} onChange={(e) => setCustomer({...customer, shipping_address: e.target.value})} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h3 className="text-lg font-bold text-gray-700">2. Sản phẩm trong đơn</h3>
                        <button type="button" onClick={handleAddItem} className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">+ Thêm</button>
                    </div>

                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <div key={index} className="flex flex-wrap md:flex-nowrap items-end gap-3 bg-gray-50 p-3 rounded border">
                                <div className="flex-1 min-w-[200px]">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Sản phẩm *</label>
                                    <select
                                        className="w-full border border-gray-300 rounded p-2 text-sm"
                                        value={item.product_id}
                                        onChange={(e) => handleProductSelect(index, e.target.value)}
                                        required
                                    >
                                        <option value="">-- Chọn sản phẩm --</option>
                                        {productList.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <div className="w-24">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">SL</label>
                                    <input type="number" min="1" className="w-full border border-gray-300 rounded p-2 text-sm"
                                        value={item.quantity} onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[index].quantity = e.target.value;
                                            setItems(newItems);
                                        }} />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Đơn giá</label>
                                    <input type="text" readOnly className="w-full bg-gray-100 border border-gray-200 rounded p-2 text-sm"
                                        value={Number(item.price).toLocaleString()} />
                                </div>
                                <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-500 font-bold px-2">X</button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-right border-t pt-4">
                        <span className="text-2xl font-bold text-red-600">Tổng cộng: {calculateTotal().toLocaleString()} đ</span>
                    </div>
                </div>

                <div className="text-right">
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold">
                        {loading ? 'Đang lưu...' : 'LƯU ĐƠN HÀNG'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderCreate;