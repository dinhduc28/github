import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isListening, setIsListening] = useState(false);

  const categories = ['All', 'Spatial Audio', 'Kinetic Timepieces', 'Vision Tech', 'Ambient Light'];

  // Realtime Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.material.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Voice Search Simulation Trigger
  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setSearchQuery('Titanium');
      setIsListening(false);
    }, 1500);
  };

  return (
    <section id="catalog" className="py-24 max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 text-electro-cyan font-mono text-xs uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXECUTIVE CATALOGUE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            Curated Technological <span className="text-gradient-cyan">Sculptures</span>
          </h2>
        </div>

        {/* Realtime Search & Voice Control Bar */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, material, specs..."
              className="w-full glass-panel pl-11 pr-10 py-3 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleVoiceSearch}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-electro-cyan ${
                  isListening ? 'text-rose-500 animate-bounce' : ''
                }`}
                title="AI Voice Search"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="glass-panel px-4 py-3 rounded-full text-xs text-slate-300 focus:outline-none cursor-pointer border-white/10"
          >
            <option value="featured">Featured Order</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-electro-cyan text-obsidian-950 font-bold shadow-[0_0_15px_#00F0FF]'
                : 'glass-panel text-slate-300 hover:text-white hover:border-white/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} onQuickView={onQuickView} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl space-y-4">
          <p className="text-slate-400 font-mono text-sm">NO BESPOKE PRODUCTS MATCH YOUR SPECIFICATIONS.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-full bg-electro-cyan text-obsidian-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
