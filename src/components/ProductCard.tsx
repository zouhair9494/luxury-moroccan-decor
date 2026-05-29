import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Eye, Star } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-charcoal aspect-[3/4] mb-4">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover img-zoom"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-gold text-dark text-[10px] font-bold tracking-wider uppercase rounded">
                {product.badge}
              </span>
            </div>
          )}

          {/* Discount */}
          {product.originalPrice && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-red-500/90 text-white text-[10px] font-bold rounded">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <a
              href={`https://wa.me/212522123456?text=Hello%20Maison%20Aura!%20I%20would%20like%20to%20order%20${encodeURIComponent(product.name)}%20(${product.id})%20-%20${product.price.toLocaleString()}%20MAD`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-500 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Order via WhatsApp
            </a>
            <button
              onClick={handleToggleWishlist}
              className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 text-offwhite hover:bg-white/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="w-10 h-10 rounded bg-white/10 text-offwhite flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <p className="text-[10px] tracking-widest uppercase text-gold/70">{product.subcategory}</p>
          <h3 className="text-offwhite font-serif text-base group-hover:text-gold transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-gold fill-gold" />
              <span className="text-xs text-offwhite/70">{product.rating}</span>
            </div>
            <span className="text-offwhite/30 text-xs">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold font-medium">{product.price.toLocaleString()} د.م.</span>
            {product.originalPrice && (
              <span className="text-offwhite/40 text-sm line-through">{product.originalPrice.toLocaleString()} د.م.</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
