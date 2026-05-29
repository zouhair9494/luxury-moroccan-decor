import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, MessageCircle, Star, ChevronRight,
  Minus, Plus, Truck, Shield, RotateCcw
} from 'lucide-react';
import { getProductById, getRelatedProducts, getReviewsByProduct } from '../data/products';
import { useWishlistStore } from '../store/wishlistStore';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const imageRef = useRef<HTMLDivElement>(null);
  const { toggleItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-offwhite mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-gold hover:text-gold-light">Browse all products</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id);
  const reviews = getReviewsByProduct(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const whatsappLink = `https://wa.me/212522123456?text=Hello%20Maison%20Aura!%20I%20would%20like%20to%20order%20${encodeURIComponent(product.name)}%20(${product.id})%20-%20Qty:%20${quantity}%20-%20${(product.price * quantity).toLocaleString()}%20MAD`;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-offwhite/40 mb-8"
        >
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-offwhite/60">{product.name}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              ref={imageRef}
              className="relative aspect-[4/5] rounded-lg overflow-hidden bg-charcoal cursor-zoom-in mb-4"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                style={isZoomed ? {
                  transform: 'scale(2)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transition: 'transform 0.1s ease-out',
                } : {}}
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-dark text-xs font-bold tracking-wider uppercase rounded">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === selectedImage ? 'border-gold' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <p className="text-gold tracking-widest text-xs uppercase mb-2">{product.subcategory}</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-offwhite mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'text-gold fill-gold' : 'text-offwhite/20'}`}
                  />
                ))}
              </div>
              <span className="text-offwhite/60 text-sm">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl text-gold font-medium">{product.price.toLocaleString()} د.م.</span>
              {product.originalPrice && (
                <span className="text-xl text-offwhite/40 line-through">{product.originalPrice.toLocaleString()} د.م.</span>
              )}
              {product.originalPrice && (
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                  Save {(product.originalPrice - product.price).toLocaleString()} د.م.
                </span>
              )}
            </div>

            <p className="text-offwhite/60 leading-relaxed mb-8">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm text-offwhite/60">Quantity</span>
              <div className="flex items-center border border-gold/20 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-offwhite/60 hover:text-gold transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-offwhite">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-offwhite/60 hover:text-gold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleItem(product.id)}
                className={`w-14 h-14 rounded-lg flex items-center justify-center border transition-colors ${
                  inWishlist
                    ? 'bg-red-500/20 border-red-500/30 text-red-400'
                    : 'border-gold/20 text-offwhite/60 hover:text-gold hover:border-gold/40'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-lg bg-charcoal/50">
                <Truck className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="text-xs text-offwhite/60">Free Shipping</p>
                <p className="text-[10px] text-offwhite/40">Over 5,000 د.م.</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-charcoal/50">
                <Shield className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="text-xs text-offwhite/60">2 Year Warranty</p>
                <p className="text-[10px] text-offwhite/40">Full coverage</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-charcoal/50">
                <RotateCcw className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="text-xs text-offwhite/60">30 Day Returns</p>
                <p className="text-[10px] text-offwhite/40">Hassle free</p>
              </div>
            </div>

            {/* Specs */}
            {(product.dimensions || product.material) && (
              <div className="space-y-2 mb-8 text-sm">
                {product.dimensions && (
                  <div className="flex gap-4">
                    <span className="text-offwhite/40 w-20">Dimensions</span>
                    <span className="text-offwhite/70">{product.dimensions}</span>
                  </div>
                )}
                {product.material && (
                  <div className="flex gap-4">
                    <span className="text-offwhite/40 w-20">Material</span>
                    <span className="text-offwhite/70">{product.material}</span>
                  </div>
                )}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/shop?search=${tag}`}
                  className="px-3 py-1 bg-dark border border-gold/10 rounded-full text-xs text-offwhite/50 hover:text-gold hover:border-gold/30 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t border-gold/10 pt-8">
          <div className="flex gap-8 border-b border-gold/10 mb-8">
            {(['description', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm tracking-widest uppercase transition-colors relative ${
                  activeTab === tab ? 'text-gold' : 'text-offwhite/40 hover:text-offwhite/60'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'description' ? (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-2 gap-10"
              >
                <div>
                  <h3 className="font-serif text-xl text-offwhite mb-4">Product Details</h3>
                  <p className="text-offwhite/60 leading-relaxed mb-6">{product.description}</p>
                  <h4 className="text-offwhite font-medium mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-offwhite/60 text-sm">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-charcoal">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-5xl font-serif text-offwhite">{product.rating}</div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={`w-5 h-5 ${star <= Math.round(product.rating) ? 'text-gold fill-gold' : 'text-offwhite/20'}`} />
                      ))}
                    </div>
                    <p className="text-offwhite/50 text-sm">Based on {product.reviewCount} reviews</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {reviews.length > 0 ? reviews.map(review => (
                    <div key={review.id} className="p-6 rounded-lg bg-charcoal/50 border border-gold/5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-medium">
                            {review.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-offwhite text-sm font-medium">{review.userName}</p>
                            <p className="text-offwhite/40 text-xs">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? 'text-gold fill-gold' : 'text-offwhite/20'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-offwhite/60 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  )) : (
                    <p className="text-offwhite/40 text-center py-8">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-2xl text-offwhite mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
