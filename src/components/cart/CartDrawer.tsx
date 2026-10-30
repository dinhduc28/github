import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Tag, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, subtotal, total, discount, applyVoucher } = useCart();
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherError, setVoucherError] = useState(false);

  if (!isCartOpen) return null;

  const handleVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode) return;
    const success = applyVoucher(voucherCode);
    if (!success) {
      setVoucherError(true);
      setTimeout(() => setVoucherError(false), 2000);
    } else {
      setVoucherCode('');
    }
  };

  const freeShippingThreshold = 5000;
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-obsidian-950/70 backdrop-blur-md"
        />

        {/* Slide-in Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md h-full glass-panel-glow border-l border-white/10 p-6 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto"
        >
          {/* Drawer Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-electro-cyan" />
                <h3 className="font-display font-bold text-lg text-white">Private Cart</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full glass-panel text-slate-300">
                  {cart.length} Items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Insured Shipping Progress Bar */}
            <div className="py-4 space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-300">
                <span>INSURED GLOBAL EXPRESS</span>
                <span>{subtotal >= freeShippingThreshold ? 'COMPLIMENTARY SHIPPING UNLOCKED' : `$${(freeShippingThreshold - subtotal).toLocaleString()} AWAY`}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-obsidian-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-electro-cyan to-amber-400 transition-all duration-500"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-1 no-scrollbar my-2">
              {cart.length > 0 ? (
                cart.map(item => (
                  <div key={item.product.id} className="glass-panel p-3.5 rounded-2xl flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-obsidian-900 border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-white truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{item.selectedColor}</p>
                      <div className="font-display font-bold text-xs text-electro-cyan mt-1">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1 glass-panel px-2 py-1 rounded-full text-xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="text-slate-400 hover:text-white px-1"
                      >
                        -
                      </button>
                      <span className="font-bold text-white px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="text-slate-400 hover:text-white px-1"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400 font-mono">YOUR CART IS CURRENTLY EMPTY.</p>
                </div>
              )}
            </div>
          </div>

          {/* Drawer Footer & Checkout */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            {/* Voucher Input */}
            <form onSubmit={handleVoucher} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={voucherCode}
                  onChange={e => setVoucherCode(e.target.value)}
                  placeholder="PROMO: AURA10"
                  className="w-full glass-panel pl-9 pr-3 py-2 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-full glass-panel text-xs text-electro-cyan font-bold hover:bg-electro-cyan/10"
              >
                Apply
              </button>
            </form>
            {voucherError && <p className="text-[10px] text-rose-400 font-mono">Invalid or expired promo voucher code.</p>}

            {/* Calculations Summary */}
            <div className="space-y-1.5 text-xs text-slate-300 font-mono">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>VIP DISCOUNT (15%)</span>
                  <span>-${(subtotal * discount).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-white/10">
                <span>TOTAL</span>
                <span className="text-electro-cyan">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              disabled={cart.length === 0}
              onClick={() => {
                setIsCartOpen(false);
                onCheckout();
              }}
              className="w-full py-4 rounded-full bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white shadow-[0_0_20px_#00F0FF] transition-all disabled:opacity-50 cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
