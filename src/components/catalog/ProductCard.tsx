import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Eye, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';
import { TiltCard } from '../UI/TiltCard';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  return (
    <TiltCard className="h-full flex flex-col justify-between p-5">
      {/* Product Image Stage */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-obsidian-900 group">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Overlay Dark Blur Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
          {product.isFeatured && (
            <span className="px-3 py-1 rounded-full bg-electro-cyan/90 text-obsidian-950 font-mono text-[10px] font-black uppercase tracking-wider shadow-[0_0_10px_#00F0FF]">
              Bespoke Edition
            </span>
          )}
          <span className="px-3 py-1 rounded-full glass-panel text-slate-300 font-mono text-[10px] uppercase">
            {product.category}
          </span>
        </div>

        {/* Favorite & Quick View Hover Floating Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          <button
            onClick={e => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-9 h-9 rounded-full glass-panel flex items-center justify-center transition-all duration-300 ${
              isFavorite ? 'text-rose-500 border-rose-500/50 bg-rose-500/10' : 'text-slate-300 hover:text-rose-400'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-electro-cyan transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
            title="3D Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Floating Stock Indicator */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 text-[10px] font-mono text-slate-300 glass-panel px-2.5 py-1 rounded-full">
          <span className={`w-1.5 h-1.5 rounded-full ${product.stock < 10 ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
          <span>{product.stock} Units In Stock</span>
        </div>
      </div>

      {/* Product Information Header */}
      <div className="pt-5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-400 text-xs">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold text-slate-200">{product.rating}</span>
            <span className="text-slate-500 text-[11px]">({product.reviewCount})</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase">{product.material.split('&')[0]}</span>
        </div>

        <h3 className="font-display text-lg font-bold text-slate-100 group-hover:text-electro-cyan transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-1">{product.tagline}</p>
      </div>

      {/* Price & Add to Cart Footer */}
      <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">Price</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-xl text-white">${product.price.toLocaleString()}</span>
            {product.comparePrice && (
              <span className="text-xs text-slate-500 line-through">${product.comparePrice.toLocaleString()}</span>
            )}
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-white text-obsidian-950 font-bold text-xs flex items-center gap-1.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </TiltCard>
  );
};
