import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { items } = useWishlistStore();
  const wishlistProducts = products.filter(p => items.includes(p.id));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-serif text-4xl text-offwhite mb-2">My Wishlist</h1>
          <p className="text-offwhite/50">{wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved</p>
        </motion.div>

        {wishlistProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Heart className="w-16 h-16 text-offwhite/20 mx-auto mb-6" />
            <h2 className="font-serif text-2xl text-offwhite mb-3">Your wishlist is empty</h2>
            <p className="text-offwhite/50 mb-8">Save your favorite pieces for later.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-dark font-medium rounded-lg hover:bg-gold-light transition-colors"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
