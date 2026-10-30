import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Package, Printer, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '../../types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  useEffect(() => {
    if (order) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#D4AF37', '#10B981', '#8B5CF6'],
      });
    }
  }, [order]);

  if (!order) return null;

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

        {/* Receipt Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-8 z-10 shadow-2xl border-white/10 my-auto text-center space-y-6"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon Badge */}
          <div className="w-20 h-20 rounded-full bg-electro-cyan/15 border-2 border-electro-cyan/50 flex items-center justify-center mx-auto text-electro-cyan shadow-[0_0_30px_#00F0FF]">
            <CheckCircle2 className="w-10 h-10 animate-pulse" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3" />
              <span>ACQUISITION CONFIRMED</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">Order Successfully Vaulted</h3>
            <p className="text-xs text-slate-400 mt-1">
              Your serialized technological artifacts are entering white-glove dispatch assembly.
            </p>
          </div>

          {/* Receipt Info Card */}
          <div className="glass-panel p-5 rounded-2xl text-left space-y-3 font-mono text-xs border border-white/10">
            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-slate-400">Order Ref Number:</span>
              <span className="text-electro-cyan font-bold">{order.id}</span>
            </div>

            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-slate-400">Tracking Code:</span>
              <span className="text-amber-400 font-bold">{order.trackingNumber}</span>
            </div>

            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-slate-400">Delivery Recipient:</span>
              <span className="text-white">{order.shippingAddress.fullName}</span>
            </div>

            <div className="flex justify-between pb-2 border-b border-white/10">
              <span className="text-slate-400">Payment Authorization:</span>
              <span className="text-emerald-400">{order.paymentMethod}</span>
            </div>

            <div className="flex justify-between pt-1 font-bold text-sm">
              <span className="text-white">Total Settled:</span>
              <span className="text-electro-cyan">${order.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Vaulted Artifacts</span>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1 no-scrollbar">
              {order.items.map(item => (
                <div key={item.product.id} className="glass-panel p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h5 className="font-bold text-white text-xs">{item.product.name}</h5>
                      <span className="text-[10px] text-slate-400 font-mono">Qty: {item.quantity} • {item.selectedColor}</span>
                    </div>
                  </div>
                  <span className="font-mono text-electro-cyan text-xs font-bold">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-3 rounded-2xl glass-panel text-xs text-slate-300 hover:text-white flex items-center justify-center gap-2 flex-1"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 flex-1 hover:bg-white transition-all shadow-[0_0_15px_#00F0FF] cursor-pointer"
            >
              <span>Back to Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
