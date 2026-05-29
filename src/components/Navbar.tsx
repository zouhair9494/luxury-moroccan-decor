import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Search, Menu, X, User, ChevronDown, LogOut
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';
import { categories } from '../data/products';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cartTotal = useCartStore(s => s.getTotalItems());
  const wishlistCount = useWishlistStore(s => s.items.length);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Inspiration', path: '/inspiration' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass py-3 shadow-lg shadow-black/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 border border-gold/40 rounded-full flex items-center justify-center group-hover:border-gold transition-colors">
                <span className="text-gold font-serif text-lg font-bold">M</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-serif text-xl tracking-wider text-offwhite group-hover:text-gold transition-colors">
                  MAISON AURA
                </h1>
                <p className="text-[10px] tracking-[0.3em] text-gold/60 uppercase">Luxury Moroccan Decor</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm tracking-widest uppercase transition-colors relative group ${
                    location.pathname === link.path ? 'text-gold' : 'text-offwhite/80 hover:text-gold'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-offwhite/80 hover:text-gold transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link to="/wishlist" className="p-2 text-offwhite/80 hover:text-gold transition-colors relative">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="p-2 text-offwhite/80 hover:text-gold transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                {cartTotal > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartTotal}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-2 text-offwhite/80 hover:text-gold transition-colors flex items-center gap-1"
                  >
                    <User className="w-5 h-5" />
                    <ChevronDown className="w-3 h-3 hidden sm:block" />
                  </button>
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 glass rounded-lg overflow-hidden shadow-xl"
                      >
                        <div className="p-3 border-b border-gold/10">
                          <p className="text-sm text-offwhite font-medium">{user?.name}</p>
                          <p className="text-xs text-offwhite/50">{user?.email}</p>
                        </div>
                        <Link to="/account" className="block px-4 py-2.5 text-sm text-offwhite/80 hover:text-gold hover:bg-white/5 transition-colors">
                          My Account
                        </Link>
                        {user?.isAdmin && (
                          <Link to="/admin" className="block px-4 py-2.5 text-sm text-offwhite/80 hover:text-gold hover:bg-white/5 transition-colors">
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => { logout(); setIsProfileOpen(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="p-2 text-offwhite/80 hover:text-gold transition-colors">
                  <User className="w-5 h-5" />
                </Link>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-offwhite/80 hover:text-gold transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-xl flex items-start justify-center pt-32"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2 text-offwhite/60 hover:text-gold transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSearch}
              className="w-full max-w-2xl px-6"
            >
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gold/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search for products, categories..."
                  className="w-full bg-transparent border-b-2 border-gold/30 focus:border-gold text-2xl sm:text-3xl text-offwhite placeholder:text-offwhite/30 py-4 pl-10 pr-4 outline-none transition-colors font-serif"
                  autoFocus
                />
              </div>
              <p className="mt-4 text-sm text-offwhite/40">Press Enter to search</p>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-dark/98 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <Link to="/" className="font-serif text-2xl text-offwhite">MAISON AURA</Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-offwhite/60 hover:text-gold">
                  <X className="w-7 h-7" />
                </button>
              </div>
              <div className="flex-1 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-2xl font-serif text-offwhite hover:text-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="border-t border-gold/20 pt-6 mt-4">
                  <p className="text-xs tracking-widest text-gold/60 uppercase mb-4">Categories</p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.filter(c => c.id !== 'all').map(cat => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.id}`}
                        className="text-sm text-offwhite/70 hover:text-gold transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-gold/20 pt-6">
                {isAuthenticated ? (
                  <button
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300"
                  >
                    <LogOut className="w-5 h-5" /> Sign Out
                  </button>
                ) : (
                  <Link to="/login" className="text-gold hover:text-gold-light transition-colors">
                    Sign In / Register
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
