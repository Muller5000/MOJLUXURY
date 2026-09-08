import React, { useState, useEffect } from 'react';
import { getSupabase } from '../supabaseClient';
import imageCompression from 'browser-image-compression';
import { Product } from '../types';

export const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  // New Product Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('featured');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const supabase = getSupabase();
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSCODE || '12345';

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASS) setIsAuthenticated(true);
    else alert('Incorrect passcode');
  };

  const fetchOrders = async () => {
    if (!supabase) return;
    setLoadingOrders(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, bespoke_measurements(*)')
      .order('created_at', { ascending: false });
    if (error) console.error('Error fetching orders:', error);
    else setOrders(data || []);
    setLoadingOrders(false);
  };

  const updateOrderStatus = async (orderRef: string, newStatus: string) => {
    if (!supabase) return;
    const { error: updateError } = await supabase.from('orders').update({ status: newStatus }).eq('reference', orderRef);
    if (updateError) return alert('Error updating status: ' + updateError.message);

    const logMessages: Record<string, string> = {
      'verified': 'Payment verified successfully.',
      'tailoring': 'Measurements received. Fabric cutting and tailoring has begun.',
      'inspection': 'Garment has entered quality control and finishing inspection.',
      'transit': 'Order has been packaged and is out for delivery.',
      'delivered': 'Order successfully delivered to customer.'
    };

    await supabase.from('atelier_logs').insert({
      order_reference: orderRef,
      log_text: logMessages[newStatus] || "Status updated to " + newStatus,
      log_time: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: newStatus === 'transit' || newStatus === 'delivered' ? 'shipping' : 'atelier'
    });

    alert('Order status updated!');
    fetchOrders();
  };

  const fetchProducts = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      const mapped = (data || []).map(p => ({
        ...p,
        imageUrl: p.image_url,
        badgeColor: p.badge_color,
        isPreOrder: p.is_pre_order
      })) as Product[];
      setProducts(mapped);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !window.confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) alert('Error deleting: ' + error.message);
    else fetchProducts();
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return alert('Database connection missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to Vercel.');
    if (!file || !name || !price) return alert('Please fill required fields and select an image.');
    
    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      
      const fileName = `${Date.now()}-${compressedFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, compressedFile);
        
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      const newProduct = {
        id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name,
        price: parseFloat(price),
        category,
        image_url: publicUrl,
        badge: category === 'dresses' ? 'Custom Tailored' : 'Pre-Order: Ships in 5 Days',
        badge_color: category === 'dresses' ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-amber-100 text-amber-800 border-amber-200',
        fabric: 'Premium Selection',
        occasion: 'Any Occasion',
        is_pre_order: true
      };

      const { error: dbError } = await supabase.from('products').insert([newProduct]);
      if (dbError) throw dbError;

      alert('Product added successfully!');
      setName('');
      setPrice('');
      setFile(null);
      fetchProducts();
    } catch (err: any) {
      alert('Error adding product: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full border border-gray-100">
          <h2 className="text-2xl font-serif text-amber-950 mb-6 text-center">Admin Portal</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Passcode" 
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-amber-500 focus:border-amber-500"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
            <button type="submit" className="w-full bg-amber-950 text-white py-2 rounded font-semibold hover:bg-amber-900 transition-colors">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-serif text-amber-950">Store Dashboard</h1>
          <button onClick={() => window.location.hash = ''} className="text-gray-500 hover:text-amber-950 transition-colors text-sm">Return to Store</button>
        </div>

        <div className="flex gap-4 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`pb-2 px-1 font-semibold text-sm uppercase tracking-wider ${activeTab === 'inventory' ? 'border-b-2 border-amber-900 text-amber-950' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Inventory Management
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`pb-2 px-1 font-semibold text-sm uppercase tracking-wider ${activeTab === 'orders' ? 'border-b-2 border-amber-900 text-amber-950' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Orders & Sizing
          </button>
        </div>

        {activeTab === 'inventory' ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-1 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="e.g. Silk Ankara Gown" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                  <input required type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="e.g. 55000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded">
                    <option value="featured">Featured (Ready to Wear)</option>
                    <option value="dresses">Dresses (Bespoke)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <input required type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
                  <p className="text-xs text-gray-400 mt-2">Image will be automatically compressed before upload.</p>
                </div>
                <button disabled={isUploading} type="submit" className="w-full bg-amber-950 text-white py-2 rounded font-semibold hover:bg-amber-900 transition-colors disabled:opacity-50">
                  {isUploading ? 'Compressing & Uploading...' : 'Add Product'}
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Current Inventory</h2>
              {loading ? <p className="text-gray-500 animate-pulse">Loading products...</p> : (
                <div className="space-y-4">
                  {products.length === 0 ? (
                    <p className="text-gray-500 italic">No products found. Start by adding one!</p>
                  ) : (
                    products.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-amber-200 transition-colors">
                        <div className="flex items-center gap-4">
                          <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover rounded-md bg-gray-100" />
                          <div>
                            <h3 className="font-bold text-gray-900">{p.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span>₦{p.price.toLocaleString()}</span>
                              <span className="capitalize px-2 py-0.5 bg-gray-100 rounded-full text-xs">{p.category}</span>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold px-3 py-1 bg-red-50 hover:bg-red-100 rounded transition-colors">
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
            {loadingOrders ? <p className="text-gray-500 animate-pulse">Loading orders...</p> : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 font-semibold text-gray-700 text-sm">Reference</th>
                      <th className="py-3 px-4 font-semibold text-gray-700 text-sm">Amount</th>
                      <th className="py-3 px-4 font-semibold text-gray-700 text-sm">Bespoke Specs</th>
                      <th className="py-3 px-4 font-semibold text-gray-700 text-sm">Status</th>
                      <th className="py-3 px-4 font-semibold text-gray-700 text-sm">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr><td colSpan={5} className="py-4 text-gray-500 italic text-center">No orders yet.</td></tr>
                    ) : orders.map(o => (
                      <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{o.reference}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">₦{o.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {o.bespoke_measurements && o.bespoke_measurements.length > 0 ? (
                            <ul className="text-xs space-y-1">
                              {o.bespoke_measurements.map((m: any, i: number) => (
                                <li key={i}>
                                  <strong>Prod ID:</strong> {m.product_id} <br/>
                                  B:{m.bust} W:{m.waist} H:{m.hips} L:{m.length}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-400">Standard</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <select 
                            className="text-xs border border-gray-300 rounded px-2 py-1 bg-white font-medium"
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.reference, e.target.value)}
                          >
                            <option value="verified">Verified</option>
                            <option value="tailoring">Tailoring</option>
                            <option value="inspection">Inspection</option>
                            <option value="transit">Transit</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-500">
                          {new Date(o.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

