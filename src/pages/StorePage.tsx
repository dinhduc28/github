import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, Grid2X2, List, Sparkles, X, Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

interface StorePageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const StorePage: React.FC<StorePageProps> = ({ products, onSelectProduct }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceLimit, setPriceLimit] = useState(5000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [layoutMode, setLayoutMode] = useState<'grid3' | 'grid2' | 'list'>('grid3');
  const [inStockOnly, setInStockOnly] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const categories = ['All', 'Spatial Audio', 'Kinetic Timepieces', 'Vision Tech', 'Ambient Light'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory =
        selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price <= priceLimit;
      const matchesStock = !inStockOnly || product.stock > 0;

      return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, priceLimit, sortBy, inStockOnly]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-glow border border-white/10 p-8 md:p-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[11px] font-mono text-electro-cyan uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AURA LUXURY STORE</span>
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
          Cửa Hàng Thiết Bị Độc Quyền
        </h1>
        <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto font-mono">
          Khám phá không gian mua sắm các thiết bị âm thanh, đồng hồ cơ học và kính thực tế không gian dẫn đầu xu hướng.
        </p>
      </div>

      {/* Control Toolbar */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
        {/* Top Row: Search & Category Pills */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo tên, công nghệ, chất liệu..."
              className="w-full glass-panel pl-11 pr-10 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-electro-cyan text-obsidian-950 font-black shadow-[0_0_15px_#00F0FF]'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-white/30'
                }`}
              >
                {cat === 'All' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Row: Filters & Layout Mode */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-300">
            {/* Price Filter Slider */}
            <div className="flex items-center gap-3">
              <span className="text-slate-400 uppercase">Giá tối đa:</span>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={priceLimit}
                onChange={e => setPriceLimit(Number(e.target.value))}
                className="accent-electro-cyan cursor-pointer"
              />
              <span className="font-bold text-electro-cyan">${priceLimit.toLocaleString()}</span>
            </div>

            {/* In Stock Only Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="rounded accent-electro-cyan cursor-pointer"
              />
              <span>Chỉ hiện còn hàng</span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="glass-panel text-xs text-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:border-electro-cyan/60 cursor-pointer"
              >
                <option value="featured" className="bg-obsidian-950">Nổi bật nhất</option>
                <option value="price-asc" className="bg-obsidian-950">Giá: Thấp đến Cao</option>
                <option value="price-desc" className="bg-obsidian-950">Giá: Cao đến Thấp</option>
                <option value="rating" className="bg-obsidian-950">Đánh giá cao nhất</option>
              </select>
            </div>

            {/* Grid Layout Switcher */}
            <div className="hidden sm:flex items-center gap-1 glass-panel p-1 rounded-xl">
              <button
                onClick={() => setLayoutMode('grid3')}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === 'grid3' ? 'bg-electro-cyan/20 text-electro-cyan' : 'text-slate-400 hover:text-white'
                }`}
                title="Lưới 3 cột"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('grid2')}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === 'grid2' ? 'bg-electro-cyan/20 text-electro-cyan' : 'text-slate-400 hover:text-white'
                }`}
                title="Lưới 2 cột"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === 'list' ? 'bg-electro-cyan/20 text-electro-cyan' : 'text-slate-400 hover:text-white'
                }`}
                title="Danh sách"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Results Counter */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <span>Hiển thị <strong className="text-white">{filteredProducts.length}</strong> / {products.length} tuyệt phẩm</span>
        {filteredProducts.length === 0 && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setPriceLimit(5000);
              setInStockOnly(false);
            }}
            className="text-electro-cyan underline hover:text-white"
          >
            Xóa tất cả bộ lọc
          </button>
        )}
      </div>

      {/* Product Grid / List Rendering */}
      {filteredProducts.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
          <p className="text-slate-400 text-sm">Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.</p>
        </div>
      ) : layoutMode === 'list' ? (
        <div className="space-y-4">
          {filteredProducts.map(product => {
            const isWish = isInWishlist(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel-glow rounded-3xl p-6 border border-white/10 flex flex-col md:flex-row items-center gap-6 hover:border-electro-cyan/40 transition-all"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full md:w-48 h-48 rounded-2xl object-cover"
                />
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="text-[10px] font-mono text-electro-cyan uppercase tracking-widest">
                      {product.category}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">{product.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{product.tagline}</p>
                  <p className="text-xs text-slate-300 line-clamp-2">{product.description}</p>
                  <div className="text-xs font-mono text-slate-400 pt-1">
                    Chất liệu: <span className="text-white">{product.material}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full gap-4 min-w-[180px]">
                  <div className="text-right">
                    <div className="font-display font-extrabold text-2xl text-electro-cyan">
                      ${product.price.toLocaleString()}
                    </div>
                    {product.comparePrice && (
                      <span className="text-xs text-slate-500 line-through font-mono">
                        ${product.comparePrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`p-3 rounded-2xl glass-panel flex items-center justify-center transition-colors ${
                        isWish ? 'text-rose-400 border-rose-400/50' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-400' : ''}`} />
                    </button>

                    <button
                      onClick={() => onSelectProduct(product)}
                      className="p-3 rounded-2xl glass-panel text-slate-300 hover:text-electro-cyan transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        addToCart(product);
                        showToast(`Đã thêm ${product.name} vào giỏ hàng!`, 'success');
                      }}
                      className="flex-1 py-3 px-4 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_#00F0FF] cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Mua Ngay</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            layoutMode === 'grid2' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {filteredProducts.map(product => {
            const isWish = isInWishlist(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group glass-panel-glow rounded-3xl p-5 border border-white/10 hover:border-electro-cyan/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden glass-panel">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`w-9 h-9 rounded-full glass-panel flex items-center justify-center transition-all ${
                          isWish ? 'text-rose-400 bg-rose-500/20' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-400' : ''}`} />
                      </button>
                    </div>

                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full glass-panel text-[10px] font-mono text-electro-cyan uppercase tracking-widest border-white/10">
                      {product.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {product.rating}
                      </span>
                      <span className="text-slate-400">Tồn kho: {product.stock}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-electro-cyan transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono line-clamp-1">{product.tagline}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Giá niêm yết</span>
                    <span className="font-display font-extrabold text-xl text-white">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="p-3 rounded-2xl glass-panel text-slate-300 hover:text-electro-cyan transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product);
                        showToast(`Đã thêm ${product.name} vào giỏ!`, 'success');
                      }}
                      className="p-3 rounded-2xl bg-electro-cyan text-obsidian-950 hover:bg-white transition-colors shadow-[0_0_10px_#00F0FF] cursor-pointer"
                      title="Thêm giỏ hàng"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
