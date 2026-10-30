import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { Product } from '../../types';
import { INITIAL_PRODUCTS } from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['All', 'Spatial Audio', 'Kinetic Timepieces', 'Vision Tech', 'Ambient Light'];

  const results = INITIAL_PRODUCTS.filter(product => {
    const matchesCat = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesQuery =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.material.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-2xl"
        />

        {/* Search Panel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-3xl glass-panel-glow rounded-3xl p-6 z-10 shadow-2xl border-white/10 space-y-6 max-h-[80vh] flex flex-col"
        >
          {/* Input Header */}
          <div className="relative flex items-center border-b border-white/10 pb-4">
            <Search className="w-5 h-5 text-electro-cyan absolute left-4" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by product name, materials (Titanium, Carbon Fiber), specs..."
              className="w-full bg-transparent pl-12 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-12 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white shrink-0 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-electro-cyan text-obsidian-950 font-bold'
                    : 'glass-panel text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 no-scrollbar">
            {results.length > 0 ? (
              results.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="glass-panel p-4 rounded-2xl flex items-center justify-between group hover:border-electro-cyan/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-obsidian-900 border border-white/10"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-electro-cyan uppercase">{product.category}</span>
                        <span className="text-[10px] text-slate-500">•</span>
                        <span className="text-[10px] text-amber-400 font-bold">★ {product.rating}</span>
                      </div>
                      <h4 className="font-bold text-sm text-white group-hover:text-electro-cyan transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{product.tagline}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-display font-extrabold text-base text-white block">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-electro-cyan flex items-center justify-end gap-1">
                      Quick View <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-2">
                <p className="text-xs font-mono text-slate-500">NO PRODUCTS MATCH "{query}"</p>
                <p className="text-[11px] text-slate-600">Try searching for Titanium, Headphones, Watch, or Audio.</p>
              </div>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>PRESS ESC OR CLICK OUTSIDE TO CLOSE</span>
            <span className="text-electro-cyan">{results.length} RESULTS AVAILABLE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
