import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShieldCheck, Truck, Rotate3d, ShoppingBag, Heart, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { MOCK_REVIEWS } from '../../data/mockData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [is3DMode, setIs3DMode] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-2xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl glass-panel-glow rounded-3xl overflow-hidden z-10 shadow-2xl border-white/10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-10 max-h-[85vh] overflow-y-auto no-scrollbar">
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative w-full h-[380px] rounded-2xl overflow-hidden glass-panel flex items-center justify-center bg-obsidian-900 group">
                {is3DMode ? (
                  <div className="w-full h-full flex flex-col items-center justify-center space-y-3 bg-gradient-to-b from-obsidian-900 to-obsidian-950">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-electro-cyan animate-spin flex items-center justify-center">
                      <Rotate3d className="w-10 h-10 text-electro-cyan" />
                    </div>
                    <span className="font-mono text-xs text-electro-cyan uppercase tracking-widest">
                      INTERACTIVE 360 MODEL LOADING
                    </span>
                  </div>
                ) : (
                  <img
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {/* 360 View Switcher */}
                <button
                  onClick={() => setIs3DMode(!is3DMode)}
                  className={`absolute bottom-4 left-4 glass-panel px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 ${
                    is3DMode ? 'text-electro-cyan border-electro-cyan/50' : 'text-slate-300'
                  }`}
                >
                  <Rotate3d className="w-4 h-4" />
                  <span>{is3DMode ? 'Exit 360' : '360° Interactive'}</span>
                </button>
              </div>

              {/* Thumbnails row */}
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIs3DMode(false);
                      setActiveImageIndex(idx);
                    }}
                    className={`w-20 h-20 rounded-xl overflow-hidden glass-panel p-1 border transition-all ${
                      activeImageIndex === idx && !is3DMode ? 'border-electro-cyan ring-2 ring-electro-cyan/30' : 'border-white/10'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            </div>

            {/* Information & Configuration Column */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-electro-cyan uppercase tracking-widest">{product.category}</span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-slate-500">({product.reviewCount} Reviews)</span>
                  </div>
                </div>

                {/* Name & Tagline */}
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-white">{product.name}</h2>
                <p className="text-xs text-slate-400 mt-1">{product.tagline}</p>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display font-extrabold text-3xl text-white">${product.price.toLocaleString()}</span>
                  {product.comparePrice && (
                    <span className="text-sm text-slate-500 line-through">${product.comparePrice.toLocaleString()}</span>
                  )}
                  <span className="text-[10px] font-mono text-emerald-400 glass-panel px-2 py-0.5 rounded-full">
                    IN STOCK • READY TO SHIP
                  </span>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-white/10 gap-6 mt-6">
                  {(['overview', 'specs', 'reviews'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 text-xs font-mono uppercase tracking-widest transition-colors relative ${
                        activeTab === tab ? 'text-electro-cyan font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="modal-tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-electro-cyan" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="py-4 text-xs text-slate-300 leading-relaxed min-h-[100px]">
                  {activeTab === 'overview' && <p>{product.description}</p>}
                  {activeTab === 'specs' && (
                    <div className="space-y-2 font-mono">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Material</span>
                        <span className="text-white font-semibold">{product.material}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Warranty</span>
                        <span className="text-white font-semibold">{product.warranty}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-400">Distortion Rating</span>
                        <span className="text-emerald-400 font-semibold">&lt; 0.001% THD</span>
                      </div>
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="space-y-3">
                      {MOCK_REVIEWS.map(r => (
                        <div key={r.id} className="glass-panel p-3 rounded-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-[11px]">{r.userName}</span>
                            <span className="text-[10px] text-amber-400 font-bold">★ {r.rating}.0</span>
                          </div>
                          <p className="text-[11px] text-slate-300">{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Variant Color Picker */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">Select Finish: {selectedColor}</span>
                  <div className="flex items-center gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all ${
                          selectedColor === color
                            ? 'bg-electro-cyan text-obsidian-950 font-bold border-electro-cyan shadow-[0_0_10px_#00F0FF]'
                            : 'glass-panel text-slate-300 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center glass-panel rounded-full px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Favorite Toggle */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-11 h-11 rounded-full glass-panel flex items-center justify-center ${
                    isFavorite ? 'text-rose-500 border-rose-500/50' : 'text-slate-300'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 rounded-full bg-slate-100 hover:bg-white text-obsidian-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Cart • ${(product.price * quantity).toLocaleString()}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
