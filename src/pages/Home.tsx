import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Play, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getTrendingProducts, getFeaturedProducts, categories } from '../data/products';
import { roomInspirations, beforeAfters, customerShowcases } from '../data/rooms';

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Luxury Moroccan Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/30" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gold tracking-[0.4em] text-xs sm:text-sm uppercase mb-6"
            >
              Moroccan Luxury Home Decor
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-offwhite leading-[1.1] mb-6"
            >
              Elevate Your<br />
              <span className="text-gold-gradient">Living Space</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-offwhite/60 text-base sm:text-lg max-w-md mb-10 leading-relaxed"
            >
              Discover handcrafted luxury pieces that blend timeless Moroccan artistry with contemporary elegance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-dark font-medium rounded hover:bg-gold-light transition-colors"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/inspiration"
                className="inline-flex items-center gap-3 px-8 py-4 border border-offwhite/20 text-offwhite rounded hover:border-gold hover:text-gold transition-colors"
              >
                <Play className="w-4 h-4" />
                Get Inspired
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-offwhite/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

function FeaturedCollections() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Curated Selection</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-offwhite mb-4">Featured Collections</h2>
          <p className="text-offwhite/50 max-w-md mx-auto">Handpicked pieces that define luxury Moroccan living.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const catImages: Record<string, string> = {
    'led-mirrors': '/images/led-mirror.jpg',
    'modern-lamps': '/images/modern-lamp.jpg',
    'wall-decor': '/images/wall-decor.jpg',
    'living-room': '/images/living-decor.jpg',
    'bedroom': '/images/bedroom-decor.jpg',
    'moroccan-modern': '/images/moroccan-modern.jpg',
  };

  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Browse By</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-offwhite mb-4">Categories</h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.filter(c => c.id !== 'all').map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/shop?category=${cat.id}`} className="group relative block overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={catImages[cat.id] || '/images/hero.jpg'}
                  alt={cat.name}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-offwhite group-hover:text-gold transition-colors">
                    {cat.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-gold text-sm">Explore</span>
                    <ArrowRight className="w-4 h-4 text-gold" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingProducts() {
  const trending = getTrendingProducts();

  return (
    <section className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4"
        >
          <div>
            <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Most Loved</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-offwhite">Trending Now</h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-2 text-gold hover:text-gold-light transition-colors">
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trending.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopTheRoom() {
  const [activeRoom, setActiveRoom] = useState(0);

  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Complete Looks</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-offwhite mb-4">Shop the Room</h2>
          <p className="text-offwhite/50 max-w-md mx-auto">Curated room designs with every piece available to purchase.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-lg overflow-hidden"
          >
            <img
              src={roomInspirations[activeRoom].image}
              alt={roomInspirations[activeRoom].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-gold text-xs tracking-widest uppercase">{roomInspirations[activeRoom].category}</span>
              <h3 className="font-serif text-2xl text-offwhite mt-1">{roomInspirations[activeRoom].title}</h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex gap-3 mb-6">
              {roomInspirations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveRoom(i)}
                  className={`w-12 h-1 rounded-full transition-colors ${
                    i === activeRoom ? 'bg-gold' : 'bg-offwhite/20'
                  }`}
                />
              ))}
            </div>

            <p className="text-offwhite/60 leading-relaxed">
              {roomInspirations[activeRoom].description}
            </p>

            <div className="space-y-3">
              <p className="text-xs tracking-widest uppercase text-gold/70">Featured Products</p>
              {roomInspirations[activeRoom].products.slice(0, 3).map(pid => {
                const p = getFeaturedProducts().find(fp => fp.id === pid);
                if (!p) return null;
                return (
                  <Link
                    key={pid}
                    to={`/product/${pid}`}
                    className="flex items-center gap-4 p-3 rounded-lg bg-dark/50 hover:bg-dark transition-colors group"
                  >
                    <img src={p.image} alt={p.name} className="w-14 h-14 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-offwhite text-sm group-hover:text-gold transition-colors">{p.name}</p>
                      <p className="text-gold text-sm">${p.price}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-offwhite/30 group-hover:text-gold transition-colors" />
                  </Link>
                );
              })}
            </div>

            <Link
              to="/inspiration"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-gold rounded hover:bg-gold/10 transition-colors"
            >
              View All Rooms
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  };

  return (
    <section className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Transformations</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-offwhite mb-4">Before & After</h2>
          <p className="text-offwhite/50 max-w-md mx-auto">See the dramatic difference Maison Aura can make in your space.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {beforeAfters.map((ba, i) => (
            <motion.div
              key={ba.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-ew-resize select-none"
                onMouseMove={e => isDragging && handleMove(e.clientX, e.currentTarget.getBoundingClientRect())}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchMove={e => {
                  const touch = e.touches[0];
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleMove(touch.clientX, rect);
                }}
              >
                {/* After image (full width) */}
                <img src={ba.afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
                
                {/* Before image (clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img src={ba.beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${100 / (sliderPos / 100)}%` }} />
                </div>

                {/* Slider handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-gold cursor-ew-resize"
                  style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={() => setIsDragging(true)}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg">
                    <ChevronLeft className="w-4 h-4 text-dark" />
                    <ChevronRight className="w-4 h-4 text-dark" />
                  </div>
                </div>

                {/* Labels */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-dark/80 text-offwhite text-xs rounded">Before</span>
                <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-dark text-xs rounded font-medium">After</span>
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-xl text-offwhite">{ba.title}</h3>
                <p className="text-offwhite/50 text-sm mt-1">{ba.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomerGallery() {
  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Community</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-offwhite mb-4">#MaisonAuraHome</h2>
          <p className="text-offwhite/50 max-w-md mx-auto">Share your space and inspire others. Tag us to be featured.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {customerShowcases.map((showcase, i) => (
            <motion.div
              key={showcase.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative group overflow-hidden rounded-lg ${
                i === 0 || i === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={showcase.image}
                alt={showcase.caption}
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                <p className="text-offwhite text-sm mb-2 line-clamp-2">{showcase.caption}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gold text-xs font-medium">{showcase.customerName}</p>
                    <p className="text-offwhite/50 text-[10px]">{showcase.location}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                    <span className="text-offwhite/70 text-xs">{showcase.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/hero.jpg" alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/70" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold tracking-[0.4em] text-xs uppercase mb-4">Limited Time</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-offwhite mb-4">
              The Art of<br /><span className="text-gold-gradient">Moroccan Living</span>
            </h2>
            <p className="text-offwhite/60 leading-relaxed mb-8 max-w-md">
              Experience the pinnacle of craftsmanship with our exclusive collection. Each piece is handcrafted by master artisans using techniques passed down through generations.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                  <Star className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-offwhite font-medium">4.9/5</p>
                  <p className="text-offwhite/40 text-xs">Customer Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <p className="text-offwhite font-medium">Free Shipping</p>
                  <p className="text-offwhite/40 text-xs">Orders over 5,000 د.م.</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img src="/images/room-inspiration-1.jpg" alt="" className="rounded-lg aspect-[3/4] object-cover" />
            <img src="/images/room-inspiration-2.jpg" alt="" className="rounded-lg aspect-[3/4] object-cover mt-8" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedCollections />
      <Categories />
      <TrendingProducts />
      <ShopTheRoom />
      <BeforeAfter />
      <PromoBanner />
      <CustomerGallery />
    </div>
  );
}
