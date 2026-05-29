import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Star, Tag,
  TrendingUp, DollarSign, ArrowUpRight,
  Search, Plus, Edit2, Trash2, X
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAdminStore } from '../store/adminStore';
import { products as allProducts } from '../data/products';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  processing: 'bg-blue-500/20 text-blue-400',
  shipped: 'bg-purple-500/20 text-purple-400',
  delivered: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    products, orders, customers, reviews, coupons,
    updateOrderStatus, deleteProduct,
    deleteCoupon, deleteReview
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user?.isAdmin) return null;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'coupons', label: 'Coupons', icon: Tag },
  ];

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (type: string, item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="glass rounded-xl p-4 sticky top-28">
              <div className="mb-6 px-3">
                <p className="text-xs text-offwhite/40 uppercase tracking-wider">Admin Panel</p>
                <p className="text-offwhite font-medium text-sm">{user.name}</p>
              </div>
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gold/20 text-gold'
                        : 'text-offwhite/60 hover:text-offwhite hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="font-serif text-3xl text-offwhite mb-8">Dashboard</h1>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Total Revenue', value: `${totalRevenue.toLocaleString()} د.م.`, icon: DollarSign, change: '+12%' },
                    { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingCart, change: '+8%' },
                    { label: 'Customers', value: totalCustomers.toString(), icon: Users, change: '+15%' },
                    { label: 'Avg Order', value: `${avgOrderValue.toFixed(0)} د.م.`, icon: TrendingUp, change: '+5%' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-lg bg-charcoal/50 border border-gold/5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <stat.icon className="w-5 h-5 text-gold" />
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" /> {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl text-offwhite font-medium">{stat.value}</p>
                      <p className="text-offwhite/40 text-xs mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="p-5 rounded-lg bg-charcoal/50 border border-gold/5">
                    <h3 className="text-offwhite font-medium mb-4">Recent Orders</h3>
                    <div className="space-y-3">
                      {orders.slice(0, 5).map(order => (
                        <div key={order.id} className="flex items-center justify-between py-2 border-b border-gold/5 last:border-0">
                          <div>
                            <p className="text-offwhite text-sm">{order.id}</p>
                            <p className="text-offwhite/40 text-xs">{order.customerName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gold text-sm">{order.total.toLocaleString()} د.م.</p>
                            <span className={`text-xs px-2 py-0.5 rounded ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-lg bg-charcoal/50 border border-gold/5">
                    <h3 className="text-offwhite font-medium mb-4">Top Products</h3>
                    <div className="space-y-3">
                      {allProducts.slice(0, 5).map(product => (
                        <div key={product.id} className="flex items-center gap-3 py-2 border-b border-gold/5 last:border-0">
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-offwhite text-sm truncate">{product.name}</p>
                            <p className="text-offwhite/40 text-xs">{product.category}</p>
                          </div>
                          <p className="text-gold text-sm">${product.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Products */}
            {activeTab === 'products' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="font-serif text-3xl text-offwhite">Products</h1>
                  <button
                    onClick={() => openModal('product')}
                    className="flex items-center gap-2 px-4 py-2 bg-gold text-dark text-sm font-medium rounded-lg hover:bg-gold-light transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-offwhite/30" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full bg-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-offwhite focus:border-gold/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold/10">
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Product</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Category</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Price</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Stock</th>
                        <th className="text-right text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id} className="border-b border-gold/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                              <span className="text-offwhite text-sm">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-offwhite/60 text-sm">{product.category}</td>
                          <td className="py-3 px-4 text-gold text-sm">${product.price}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded ${product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openModal('product', product)}
                                className="p-1.5 text-offwhite/40 hover:text-gold transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className="p-1.5 text-offwhite/40 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="font-serif text-3xl text-offwhite mb-6">Orders</h1>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-offwhite/30" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search orders..."
                      className="w-full bg-dark border border-gold/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-offwhite focus:border-gold/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold/10">
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Order</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Customer</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Date</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Total</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Status</th>
                        <th className="text-right text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map(order => (
                        <tr key={order.id} className="border-b border-gold/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-offwhite text-sm">{order.id}</td>
                          <td className="py-3 px-4 text-offwhite/60 text-sm">{order.customerName}</td>
                          <td className="py-3 px-4 text-offwhite/60 text-sm">{order.date}</td>
                          <td className="py-3 px-4 text-gold text-sm">${order.total}</td>
                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                              className={`text-xs px-2 py-1 rounded border-0 cursor-pointer ${statusColors[order.status]}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button className="p-1.5 text-offwhite/40 hover:text-gold transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Customers */}
            {activeTab === 'customers' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="font-serif text-3xl text-offwhite mb-6">Customers</h1>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold/10">
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Name</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Email</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Orders</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Total Spent</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(customer => (
                        <tr key={customer.id} className="border-b border-gold/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-offwhite text-sm">{customer.name}</td>
                          <td className="py-3 px-4 text-offwhite/60 text-sm">{customer.email}</td>
                          <td className="py-3 px-4 text-offwhite/60 text-sm">{customer.orders}</td>
                          <td className="py-3 px-4 text-gold text-sm">${customer.totalSpent.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded ${customer.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {customer.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Reviews */}
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="font-serif text-3xl text-offwhite mb-6">Reviews</h1>
                <div className="space-y-4">
                  {reviews.map(review => (
                    <div key={review.id} className="p-4 rounded-lg bg-charcoal/50 border border-gold/5 flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-offwhite text-sm font-medium">{review.userName}</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(star => (
                              <svg key={star} className={`w-3 h-3 ${star <= review.rating ? 'text-gold fill-gold' : 'text-offwhite/20'}`} viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-offwhite/60 text-sm">{review.comment}</p>
                        <p className="text-offwhite/30 text-xs mt-1">{review.date}</p>
                      </div>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="p-1.5 text-offwhite/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Coupons */}
            {activeTab === 'coupons' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="font-serif text-3xl text-offwhite">Coupons</h1>
                  <button
                    onClick={() => openModal('coupon')}
                    className="flex items-center gap-2 px-4 py-2 bg-gold text-dark text-sm font-medium rounded-lg hover:bg-gold-light transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Coupon
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold/10">
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Code</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Discount</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Usage</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Expiry</th>
                        <th className="text-left text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Status</th>
                        <th className="text-right text-offwhite/40 text-xs uppercase tracking-wider py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map(coupon => (
                        <tr key={coupon.id} className="border-b border-gold/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 text-offwhite text-sm font-mono">{coupon.code}</td>
                          <td className="py-3 px-4 text-gold text-sm">
                            {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                          </td>
                          <td className="py-3 px-4 text-offwhite/60 text-sm">{coupon.usageCount}/{coupon.maxUsage}</td>
                          <td className="py-3 px-4 text-offwhite/60 text-sm">{coupon.expiryDate}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded ${coupon.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {coupon.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => deleteCoupon(coupon.id)}
                              className="p-1.5 text-offwhite/40 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-charcoal rounded-xl p-6 w-full max-w-md border border-gold/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl text-offwhite">
                  {modalType === 'product' ? (editingItem ? 'Edit Product' : 'Add Product') : 'Add Coupon'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-offwhite/40 hover:text-offwhite">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center py-8">
                <p className="text-offwhite/50 text-sm">
                  {modalType === 'product'
                    ? 'Product management form would go here with full CRUD functionality.'
                    : 'Coupon creation form would go here with validation and generation.'}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gold/20 text-offwhite rounded-lg hover:border-gold/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-gold text-dark rounded-lg hover:bg-gold-light transition-colors"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
