import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { getProductById } from '../data/products';

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();

  const cartItems = items.map(item => {
    const product = getProductById(item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 ? 0 : 350;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-serif text-4xl text-offwhite mb-2">Shopping Cart</h1>
          <p className="text-offwhite/50">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-16 h-16 text-offwhite/20 mx-auto mb-6" />
            <h2 className="font-serif text-2xl text-offwhite mb-3">Your cart is empty</h2>
            <p className="text-offwhite/50 mb-8">Discover our luxury collection and find something you love.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark font-medium rounded-lg hover:bg-gold-light transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map(item => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-4 rounded-lg bg-charcoal/50 border border-gold/5"
                  >
                    <Link to={`/product/${item.productId}`} className="shrink-0">
                      <img
                        src={item.product?.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <Link to={`/product/${item.productId}`} className="font-serif text-offwhite hover:text-gold transition-colors truncate">
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-1 text-offwhite/30 hover:text-red-400 transition-colors shrink-0 ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gold text-sm mb-3">{item.price.toLocaleString()} د.م.</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gold/20 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-2 text-offwhite/60 hover:text-gold transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-offwhite text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 text-offwhite/60 hover:text-gold transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-offwhite font-medium">{(item.price * item.quantity).toLocaleString()} د.م.</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex justify-between pt-4">
                <Link to="/shop" className="text-gold hover:text-gold-light text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-offwhite/40 hover:text-red-400 text-sm transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-28 h-fit"
            >
              <div className="p-6 rounded-lg bg-charcoal/50 border border-gold/10">
                <h2 className="font-serif text-xl text-offwhite mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-offwhite/60">Subtotal</span>
                      <span className="text-offwhite">{subtotal.toLocaleString()} د.م.</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-offwhite/60">Shipping</span>
                    <span className={shipping === 0 ? 'text-green-400' : 'text-offwhite'}>
                      {shipping === 0 ? 'Free' : `${shipping.toLocaleString()} د.م.`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-offwhite/40 flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      Free shipping on orders over 5,000 د.م.
                    </p>
                  )}
                  <div className="border-t border-gold/10 pt-3">
                    <div className="flex justify-between">
                      <span className="text-offwhite font-medium">Total</span>
                      <span className="text-gold text-xl font-medium">{total.toLocaleString()} د.م.</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full py-4 bg-gold text-dark text-center font-medium rounded-lg hover:bg-gold-light transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <div className="mt-4 flex justify-center gap-4">
                  <div className="w-8 h-5 bg-offwhite/10 rounded" />
                  <div className="w-8 h-5 bg-offwhite/10 rounded" />
                  <div className="w-8 h-5 bg-offwhite/10 rounded" />
                  <div className="w-8 h-5 bg-offwhite/10 rounded" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
