import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, getProductsByCategory } from '../data/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categoryParam = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = categoryParam === 'all' ? products : getProductsByCategory(categoryParam);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedTags.length > 0) {
      result = result.filter(p => selectedTags.some(t => p.tags.includes(t)));
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = [...result].sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        break;
    }

    return result;
  }, [categoryParam, searchQuery, priceRange, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 3000]);
    setSelectedTags([]);
    setSortBy('featured');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-gold tracking-[0.4em] text-xs uppercase mb-2">Collection</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-offwhite mb-2">
            {searchQuery ? `Search: "${searchQuery}"` : categories.find(c => c.id === categoryParam)?.name || 'All Products'}
          </h1>
          <p className="text-offwhite/50">{filteredProducts.length} products</p>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gold/10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-offwhite/70 hover:text-gold transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm">Filters</span>
              {(selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 30000) && (
                <span className="w-5 h-5 bg-gold text-dark text-xs rounded-full flex items-center justify-center font-bold">
                  {selectedTags.length + (priceRange[0] > 0 || priceRange[1] < 30000 ? 1 : 0)}
                </span>
              )}
            </button>
            {(selectedTags.length > 0 || priceRange[0] > 0 || priceRange[1] < 30000) && (
              <button onClick={clearFilters} className="text-xs text-gold hover:text-gold-light flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-dark border border-gold/20 rounded-lg px-4 py-2 pr-10 text-sm text-offwhite focus:border-gold/50 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-offwhite/40 pointer-events-none" />
            </div>
            <div className="hidden sm:flex items-center gap-1 border border-gold/20 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-gold/20 text-gold' : 'text-offwhite/40'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-gold/20 text-gold' : 'text-offwhite/40'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 overflow-hidden"
              >
                <div className="w-[280px] space-y-8">
                  {/* Categories */}
                  <div>
                    <h3 className="text-offwhite font-medium mb-4 text-sm tracking-widest uppercase">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            const newParams = new URLSearchParams(searchParams);
                            if (cat.id === 'all') {
                              newParams.delete('category');
                            } else {
                              newParams.set('category', cat.id);
                            }
                            setSearchParams(newParams);
                          }}
                          className={`block w-full text-left text-sm py-1.5 transition-colors ${
                            categoryParam === cat.id ? 'text-gold' : 'text-offwhite/60 hover:text-offwhite'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="text-offwhite font-medium mb-4 text-sm tracking-widest uppercase">Price Range</h3>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="30000"
                        value={priceRange[1]}
                        onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-gold"
                      />
                      <div className="flex justify-between text-sm text-offwhite/60">
                        <span>{priceRange[0].toLocaleString()} د.م.</span>
                        <span>{priceRange[1].toLocaleString()} د.م.</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="text-offwhite font-medium mb-4 text-sm tracking-widest uppercase">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-xs transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-gold text-dark'
                              : 'bg-dark border border-gold/20 text-offwhite/60 hover:border-gold/40'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-offwhite/40 text-lg mb-2">No products found</p>
                <p className="text-offwhite/30 text-sm">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className={`grid gap-4 sm:gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
