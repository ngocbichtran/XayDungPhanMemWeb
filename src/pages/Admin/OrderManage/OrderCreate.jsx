import React, { useState, useEffect } from 'react';
import { orderClient, shopClient } from '../../../services/apiFactory';
import { useNavigate, Link } from 'react-router-dom';

const OrderCreate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [productList, setProductList] = useState([]); 
    const [userList, setUserList] = useState([]); 

    const [customer, setCustomer] = useState({
        user_id: '',
        phone: '',
        shipping_address: '',
        note: ''
    });

    const [items, setItems] = useState([{ product_id: '', quantity: 1, price: 0 }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resProd, resUser] = await Promise.all([
                    api.get('/admin/products/list'),
                    api.get('/admin/users/list')
                ]);
                setProductList(resProd.data || []);
                setUserList(resUser.data || []);
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            }
        };
        fetchData();
    }, []);

    const handleProductSelect = (index, productId) => {
        const selectedProd = productList.find(p => p.id === parseInt(productId));
        const newItems = [...items];
        newItems[index].product_id = productId;
        if (selectedProd) {
            newItems[index].price = selectedProd.sale_price > 0 ? selectedProd.sale_price : selectedProd.price;
        }
        setItems(newItems);
    };

    const calculateTotal = () => items.reduce((t, i) => t + (i.quantity * i.price), 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!customer.user_id) return alert('Chưa chọn khách hàng!');

        setLoading(true);
        
        try {
            const cleanItems = items.map(item => ({
                product_id: parseInt(item.product_id),
                quantity: parseInt(item.quantity)
            }));

            // Cấu trúc Payload khớp với SQL lỗi của ông
            const payload = {
                user_id: parseInt(customer.user_id),
                shipping_address: customer.shipping_address,
                phone: customer.phone,
                total_amount: calculateTotal(), // Đã đổi từ total_price sang total_amount
                payment_method: 'cod',          // Thêm cho đủ bộ như SQL của ông
                status: 'pending',
                items: cleanItems
            };

            await api.post('/admin/orders', payload);
            alert('🎉 Tạo đơn hàng thành công!');
            navigate('/admin/orders');
            
        } catch (error) {
            console.error('Lỗi Submit:', error.response?.data);
            alert('Lỗi: ' + (error.response?.data?.message || 'Lỗi Foreign Key - Check lại ID User!'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <Link to="/admin/orders" className="text-blue-500 font-semibold">&larr; Quay lại</Link>
                <h2 className="text-2xl font-bold">Tạo Đơn Hàng Mới</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Khách hàng *</label>
                            <select 
                                required className="w-full border p-2 rounded"
                                value={customer.user_id}
                                onChange={(e) => setCustomer({...customer, user_id: e.target.value})}
                            >
                                <option value="">-- Chọn khách hàng --</option>
                                {userList.map(u => <option key={u.id} value={u.id}>{u.name} (ID: {u.id})</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Số điện thoại *</label>
                            <input type="text" required className="w-full border p-2 rounded"
                                value={customer.phone} onChange={(e) => setCustomer({...customer, phone: e.target.value})} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold mb-1">Địa chỉ giao hàng *</label>
                            <input type="text" required className="w-full border p-2 rounded"
                                value={customer.shipping_address} onChange={(e) => setCustomer({...customer, shipping_address: e.target.value})} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow border">
                    <h3 className="font-bold mb-4">Sản phẩm</h3>
                    {items.map((item, index) => (
                        <div key={index} className="flex gap-3 mb-2 items-end">
                            <div className="flex-1">
                                <select className="w-full border p-2 rounded" value={item.product_id}
                                    onChange={(e) => handleProductSelect(index, e.target.value)} required>
                                    <option value="">-- Chọn --</option>
                                    {productList.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="w-20">
                                <input type="number" className="w-full border p-2 rounded" value={item.quantity}
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        newItems[index].quantity = e.target.value;
                                        setItems(newItems);
                                    }} />
                            </div>
                            <div className="text-red-600 font-bold">{Number(item.price * item.quantity).toLocaleString()}đ</div>
                        </div>
                    ))}
                    <button type="button" onClick={() => setItems([...items, { product_id: '', quantity: 1, price: 0 }])} className="text-blue-500 text-sm mt-2">+ Thêm dòng</button>
                    <div className="text-right text-xl font-bold mt-4">Tổng: {calculateTotal().toLocaleString()} đ</div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
                    {loading ? 'Đang xử lý...' : '💾 LƯU ĐƠN HÀNG'}
                </button>
            </form>
        </div>
    );
};

export default OrderCreate;