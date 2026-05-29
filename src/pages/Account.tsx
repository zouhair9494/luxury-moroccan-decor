import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Heart, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAdminStore } from '../store/adminStore';

export default function Account() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { orders } = useAdminStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const userOrders = orders.filter(o => o.customerEmail === user.email);

  const menuItems = [
    { icon: Package, label: 'My Orders', desc: `${userOrders.length} orders`, path: '#' },
    { icon: Heart, label: 'Wishlist', desc: 'Saved items', path: '/wishlist' },
    { icon: MapPin, label: 'Addresses', desc: 'Manage shipping addresses', path: '#' },
    { icon: Settings, label: 'Settings', desc: 'Account preferences', path: '#' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-6 mb-10">
            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center text-gold text-2xl font-serif">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-3xl text-offwhite">{user.name}</h1>
              <p className="text-offwhite/50">{user.email}</p>
              {user.isAdmin && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-gold/20 text-gold text-xs rounded">Admin</span>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-4 p-5 rounded-lg bg-charcoal/50 border border-gold/5 hover:border-gold/20 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-offwhite font-medium group-hover:text-gold transition-colors">{item.label}</p>
                  <p className="text-offwhite/40 text-sm">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-offwhite/20 group-hover:text-gold transition-colors" />
              </Link>
            ))}
          </div>

          {userOrders.length > 0 && (
            <div className="mb-10">
              <h2 className="font-serif text-xl text-offwhite mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {userOrders.slice(0, 3).map(order => (
                  <div key={order.id} className="p-4 rounded-lg bg-charcoal/50 border border-gold/5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-offwhite text-sm font-medium">{order.id}</p>
                        <p className="text-offwhite/40 text-xs">{order.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs capitalize ${
                        order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                        order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                        'bg-gold/20 text-gold'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-offwhite/60 text-sm">{order.items.length} items</p>
                      <p className="text-gold font-medium">${order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}
