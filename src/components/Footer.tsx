import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-charcoal border-t border-gold/10">
      {/* Newsletter */}
      <div className="border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl text-offwhite mb-3">
                Join the <span className="text-gold-gradient">Inner Circle</span>
              </h3>
              <p className="text-offwhite/60 max-w-md">
                Subscribe for exclusive access to new collections, private sales, and Moroccan design inspiration delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-dark/50 border border-gold/20 rounded-lg px-5 py-4 text-offwhite placeholder:text-offwhite/30 focus:border-gold/50 focus:outline-none transition-colors"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-4 bg-gold text-dark font-medium rounded-lg hover:bg-gold-light transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h2 className="font-serif text-2xl text-offwhite tracking-wider">MAISON AURA</h2>
              <p className="text-[10px] tracking-[0.3em] text-gold/60 uppercase mt-1">Luxury Moroccan Decor</p>
            </Link>
            <p className="text-offwhite/50 text-sm leading-relaxed mb-6">
              Curating the finest Moroccan craftsmanship for the modern home. Each piece tells a story of heritage, artistry, and timeless elegance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-offwhite/60 hover:text-gold hover:border-gold transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-offwhite/60 hover:text-gold hover:border-gold transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-offwhite/60 hover:text-gold hover:border-gold transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-offwhite font-medium mb-6 text-sm tracking-widest uppercase">Explore</h4>
            <ul className="space-y-3">
              {['Shop All', 'LED Mirrors', 'Modern Lamps', 'Wall Decor', 'Living Room', 'Bedroom', 'Moroccan Modern'].map(item => (
                <li key={item}>
                  <Link
                    to={item === 'Shop All' ? '/shop' : `/shop?category=${item.toLowerCase().replace(' ', '-')}`}
                    className="text-offwhite/50 hover:text-gold transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-offwhite font-medium mb-6 text-sm tracking-widest uppercase">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Story', 'Artisans', 'Sustainability', 'Press', 'Careers'].map(item => (
                <li key={item}>
                  <Link to="/about" className="text-offwhite/50 hover:text-gold transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-offwhite font-medium mb-6 text-sm tracking-widest uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-offwhite/50 text-sm">
                  123 Boulevard Mohammed VI<br />
                  Casablanca, Morocco 20000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href="tel:+212522123456" className="text-offwhite/50 hover:text-gold transition-colors text-sm">
                  +212 522 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:hello@maisonaura.com" className="text-offwhite/50 hover:text-gold transition-colors text-sm">
                  hello@maisonaura.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-offwhite/30 text-xs">
            &copy; {new Date().getFullYear()} Maison Aura. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="text-offwhite/30 hover:text-gold text-xs transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-offwhite/30 hover:text-gold text-xs transition-colors">Terms of Service</Link>
            <Link to="/" className="text-offwhite/30 hover:text-gold text-xs transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
