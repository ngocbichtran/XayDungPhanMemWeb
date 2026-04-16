import { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Box, Package, 
  DollarSign, Hash, Layers, Tag, X, Image as ImageIcon,
  CheckCircle2, AlertCircle, Save
} from 'lucide-react';
import api from '../api/axios';
import type { ProductAdmin } from '../types';

interface Category {
  id: number;
  name: string;
}

export default function ProductsManagement() {
  const [products, setProducts] = useState<ProductAdmin[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductAdmin | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  
  // Form State
  const [formData, setFormData] = useState<Partial<ProductAdmin>>({
    name: '',
    category_id: 1,
    price: 0,
    sale_price: 0,
    quantity: 0,
    image: '',
    description: '',
    status: 1
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products.php'),
        api.get('/categories.php')
      ]);
      
      if (prodRes.data.success) setProducts(prodRes.data.data);
      if (catRes.data.success) setCategories(catRes.data.data);
    } catch (err) {
      console.error("Failed to load data");
      setError("Failed to fetch products or categories. Please verify your admin session.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product: ProductAdmin | null = null) => {
    setSelectedFile(null);
    if (product) {
      setEditingProduct(product);
      setFormData(product);
      setPreviewImage(product.image || '');
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category_id: categories[0]?.id || 1,
        price: 0,
        sale_price: 0,
        quantity: 0,
        image: '',
        description: '',
        status: 1
      });
      setPreviewImage('');
    }
    setIsModalOpen(true);
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'price' || name === 'sale_price' || name === 'quantity' || name === 'category_id' || name === 'status') 
        ? Number(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size exceeds 5MB limit.');
        e.target.value = '';
        return;
      }
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== 'image') {
        submitData.append(key, value.toString());
      }
    });

    if (selectedFile) {
      submitData.append('image_file', selectedFile);
    } else if (formData.image) {
      submitData.append('image', formData.image); 
    }

    try {
      if (editingProduct) {
        submitData.append('_method', 'PUT');
        submitData.append('id', editingProduct.id.toString());
        const response = await api.post('/products.php', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data.success) {
          setSuccess("Product updated successfully!");
          fetchData();
          setIsModalOpen(false);
        }
      } else {
        const response = await api.post('/products.php', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data.success) {
          setSuccess("Product created successfully!");
          fetchData();
          setIsModalOpen(false);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await api.delete(`/products.php?id=${id}`);
        if (response.data.success) {
          setSuccess("Product deleted!");
          fetchData();
        }
      } catch (err) {
        setError("Failed to delete product.");
      } finally {
        setTimeout(() => setSuccess(null), 3000);
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount));
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full ring-1 ring-black/5">
      {/* Header Area */}
      <div className="p-8 border-b border-gray-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Products Management</h2>
            <p className="text-gray-500 mt-1">Total {products.length} products in inventory</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus className="w-5 h-5 mr-2" /> Add New Product
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name or description..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {success && (
            <div className="px-4 py-2 bg-green-50 text-green-700 rounded-xl flex items-center text-sm font-medium border border-green-100 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4 mr-2" /> {success}
            </div>
          )}
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
             <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-gray-500 font-medium">Fetching catalog database...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50">
             <Package className="w-16 h-16 text-gray-200 mb-4" />
             <p className="text-gray-500 font-medium text-lg">No products found matching your search</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-400 uppercase text-[10px] font-black tracking-widest border-b border-gray-100 whitespace-nowrap">
                <th className="px-8 py-4">Product Info</th>
                <th className="px-6 py-4 text-center">Category</th>
                <th className="px-6 py-4">Price / Sale</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="group hover:bg-indigo-50/30 transition-colors border-b border-gray-50 last:border-0">
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100 group-hover:border-indigo-100 transition-colors">
                        {prod.image ? (
                          <img 
                            src={prod.image.startsWith('http') || prod.image.startsWith('blob') ? prod.image : `http://localhost:7777${prod.image}`} 
                            alt={prod.name} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 line-clamp-1">{prod.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-[200px]">{prod.description || 'No description'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${prod.category_name ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                      {prod.category_name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(prod.price)}</div>
                      {Number(prod.sale_price) > 0 && (
                        <div className="text-xs font-bold text-red-500 bg-red-50 inline-block px-1.5 rounded">
                          Sale: {formatCurrency(prod.sale_price)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${prod.quantity > 5 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-bold text-gray-700">{prod.quantity} Units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      prod.status === 1 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {prod.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button 
                        onClick={() => handleOpenModal(prod)}
                        className="p-2 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
                      >
                        <Edit2 className="w-4.5 h-4.5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(prod.id)}
                        className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-auto animate-in zoom-in-95 duration-200 border border-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                  <Box className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Create New Product'}</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-6 flex items-start space-x-3 shadow-inner">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Product Name</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                      placeholder="Enter product title..."
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Category</label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select 
                      name="category_id"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-medium"
                      value={formData.category_id}
                      onChange={handleInputChange}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Quantity</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="number" 
                      name="quantity"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-mono"
                      value={formData.quantity}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Base Price (VND)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="number" 
                      name="price"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-bold"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 text-red-600">Sale Price (VND)</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 w-5 h-5" />
                    <input 
                      type="number" 
                      name="sale_price"
                      className="w-full pl-12 pr-4 py-3.5 bg-red-50/50 border border-red-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-bold text-red-700"
                      value={formData.sale_price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 ml-1 font-medium italic">Set to 0 if no sale is active</p>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Product Description</label>
                  <textarea 
                    name="description"
                    rows={3}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                    placeholder="Tell us about the product..."
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Product Image</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      name="image_file"
                      className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                      onChange={handleFileChange}
                    />
                  </div>
                  {previewImage && (
                    <div className="mt-4">
                      <p className="text-sm font-bold text-gray-600 mb-2">Image Preview:</p>
                      <img 
                        src={previewImage.startsWith('blob:') || previewImage.startsWith('http') ? previewImage : `http://localhost:7777${previewImage}`} 
                        alt="Preview" 
                        className="h-32 rounded-xl object-contain bg-gray-100 p-2 border border-gray-200" 
                      />
                    </div>
                  )}
                </div>

                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Status</label>
                   <select 
                     name="status"
                     className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-medium"
                     value={formData.status}
                     onChange={handleInputChange}
                   >
                     <option value={1}>Active in Shop</option>
                     <option value={0}>Hidden / Inactive</option>
                   </select>
                </div>

              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 px-6 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-[2] py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                     <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      {editingProduct ? 'Save Changes' : 'Publish Product'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
