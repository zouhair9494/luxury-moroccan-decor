import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CreditCard, Truck, Check, Lock } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { getProductById } from '../data/products';
import { useAuthStore } from '../store/authStore';

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    country: user?.address?.country || 'Morocco',
    zip: user?.address?.zip || '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const cartItems = items.map(item => {
    const product = getProductById(item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 ? 0 : 350;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setIsComplete(true);
      clearCart();
    }
  };

  if (items.length === 0 && !isComplete) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-offwhite mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-gold hover:text-gold-light">Continue shopping</Link>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="font-serif text-3xl text-offwhite mb-4">Order Confirmed!</h1>
          <p className="text-offwhite/60 mb-2">Thank you for your purchase.</p>
          <p className="text-offwhite/40 text-sm mb-8">Order #ORD-{Date.now().toString().slice(-6)}</p>
          <p className="text-offwhite/50 text-sm mb-8">A confirmation email has been sent to {formData.email}</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark font-medium rounded-lg hover:bg-gold-light transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {['Information', 'Shipping', 'Payment'].map((label, i) => (
            <div key={label} className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${i + 1 <= step ? 'text-gold' : 'text-offwhite/30'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 <= step ? 'bg-gold text-dark' : 'bg-charcoal text-offwhite/30'
                }`}>
                  {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className="hidden sm:block text-sm">{label}</span>
              </div>
              {i < 2 && <ChevronRight className="w-4 h-4 text-offwhite/20" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-2xl text-offwhite">Contact Information</h2>
                  <div>
                    <label className="block text-sm text-offwhite/60 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                    />
                  </div>

                  <h2 className="font-serif text-2xl text-offwhite pt-4">Shipping Address</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-offwhite/60 mb-2">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-offwhite/60 mb-2">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-offwhite/60 mb-2">Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-offwhite/60 mb-2">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-offwhite/60 mb-2">Country</label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-offwhite/60 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={e => setFormData({ ...formData, zip: e.target.value })}
                        className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-offwhite/60 mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-2xl text-offwhite">Shipping Method</h2>
                  <div className="space-y-3">
                    <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                      shipping === 0 ? 'border-gold bg-gold/5' : 'border-gold/10'
                    }`}>
                      <input type="radio" name="shipping" checked={shipping === 0} readOnly className="accent-gold" />
                      <Truck className="w-5 h-5 text-gold" />
                      <div className="flex-1">
                        <p className="text-offwhite text-sm">Free Express Shipping</p>
                        <p className="text-offwhite/40 text-xs">3-5 business days</p>
                      </div>
                      <span className="text-green-400 text-sm font-medium">Free</span>
                    </label>
                    <label className="flex items-center gap-4 p-4 rounded-lg border border-gold/10 cursor-pointer hover:border-gold/30 transition-colors">
                      <input type="radio" name="shipping" className="accent-gold" />
                      <Truck className="w-5 h-5 text-offwhite/40" />
                      <div className="flex-1">
                        <p className="text-offwhite text-sm">Standard Shipping</p>
                        <p className="text-offwhite/40 text-xs">7-10 business days</p>
                      </div>
                      <span className="text-offwhite/60 text-sm">350 د.م.</span>
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h2 className="font-serif text-2xl text-offwhite">Payment</h2>
                  <div className="flex items-center gap-2 text-offwhite/40 text-sm mb-4">
                    <Lock className="w-4 h-4" />
                    All transactions are secure and encrypted
                  </div>
                  <div>
                    <label className="block text-sm text-offwhite/60 mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-offwhite/30" />
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-dark border border-gold/20 rounded-lg pl-12 pr-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-offwhite/60 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={e => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-offwhite/60 mb-2">CVC</label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={e => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full bg-dark border border-gold/20 rounded-lg px-4 py-3 text-offwhite focus:border-gold/50 focus:outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-gold/20 text-offwhite rounded-lg hover:border-gold/40 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-gold text-dark font-medium rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : step === 3 ? `Pay ${total.toLocaleString()} د.م.` : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="p-6 rounded-lg bg-charcoal/50 border border-gold/10">
              <h2 className="font-serif text-xl text-offwhite mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative shrink-0">
                      <img src={item.product?.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-dark text-xs rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-offwhite text-sm truncate">{item.name}</p>
                      <p className="text-offwhite/40 text-xs">{item.price.toLocaleString()} د.م. x {item.quantity}</p>
                    </div>
                    <p className="text-offwhite text-sm">{(item.price * item.quantity).toLocaleString()} د.م.</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t border-gold/10 pt-4">
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
                <div className="flex justify-between pt-3 border-t border-gold/10">
                  <span className="text-offwhite font-medium">Total</span>
                  <span className="text-gold text-xl font-medium">{total.toLocaleString()} د.م.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
