import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Heart, ShoppingBag, LogOut, ShieldCheck, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-2xl"
        />

        {/* Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-panel-glow rounded-3xl p-6 sm:p-8 z-10 shadow-2xl border-white/10 my-auto max-h-[85vh] flex flex-col"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Profile Header */}
          {user ? (
            <div className="flex items-center gap-4 pb-6 border-b border-white/10 shrink-0">
              <img
                src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={user.fullName}
                className="w-16 h-16 rounded-full object-cover border-2 border-electro-cyan/50 shadow-[0_0_15px_#00F0FF]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-electro-cyan uppercase tracking-widest">
                    {user.role === 'admin' ? 'EXECUTIVE BOARD' : 'VIP CIRCLE MEMBER'}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-xl text-white">{user.fullName}</h3>
                <p className="text-xs text-slate-400 font-mono">{user.email}</p>
              </div>

              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="px-3.5 py-2 rounded-full glass-panel text-xs font-mono text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-6 border-b border-white/10 shrink-0 space-y-3">
              <h3 className="font-display font-bold text-xl text-white">Client Portal</h3>
              <p className="text-xs text-slate-400">Sign in to save wishlist, view active orders & exclusive releases.</p>
              <button
                onClick={() => {
                  onClose();
                  setIsAuthModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-full bg-electro-cyan text-obsidian-950 font-bold text-xs"
              >
                Authenticate Now
              </button>
            </div>
          )}

          {/* Wishlist Section */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 no-scrollbar">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-current" />
                <span>Saved Wishlist Artifacts ({wishlist.length})</span>
              </h4>
            </div>

            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlist.map(product => (
                  <div key={product.id} className="glass-panel p-4 rounded-2xl flex items-center gap-3">
                    <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs text-white truncate">{product.name}</h5>
                      <span className="font-display text-xs text-electro-cyan font-bold block">
                        ${product.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => addToCart(product)}
                          className="px-2.5 py-1 rounded-full bg-white text-obsidian-950 text-[10px] font-bold"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-[10px] text-slate-400 hover:text-rose-400 font-mono"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 glass-panel rounded-2xl">
                <p className="text-xs font-mono text-slate-500">YOUR WISHLIST IS CURRENTLY EMPTY.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
