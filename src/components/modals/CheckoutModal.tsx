import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, ShieldCheck, Truck, Lock, CheckCircle2, Cpu, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Order } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOrderComplete }) => {
  const { cart, total, subtotal, discount, clearCart } = useCart();

  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'applepay'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('Julian Sterling');
  const [street, setStreet] = useState('742 Fifth Avenue, Suite 1800');
  const [city, setCity] = useState('New York');
  const [country, setCountry] = useState('United States');
  const [phone, setPhone] = useState('+1 (555) 019-2834');

  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('942');

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const mockOrder: Order = {
        id: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        shippingAddress: {
          fullName,
          street,
          city,
          country,
          phone,
        },
        paymentMethod: paymentMethod === 'card' ? 'Visa Black Edition' : paymentMethod === 'crypto' ? 'USDT (Solana Pay)' : 'Apple Pay VIP',
        totalAmount: total,
        status: 'Processing',
        paymentStatus: 'Paid',
        trackingNumber: `TRK-AURA-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
      };

      clearCart();
      setIsSubmitting(false);
      onOrderComplete(mockOrder);
      onClose();
    }, 1500);
  };

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

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl glass-panel-glow rounded-3xl p-6 lg:p-8 z-10 shadow-2xl border-white/10 my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-electro-cyan font-mono text-[10px] uppercase tracking-widest">
                <Lock className="w-3 h-3" />
                <span>256-BIT ENCRYPTED INSURED CHECKOUT</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-white">Private Order Settlement</h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Form Steps Left Side */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step Navigation Pills */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className={`flex-1 py-2 rounded-full font-mono text-xs text-center border transition-all ${
                    step === 'shipping'
                      ? 'bg-electro-cyan text-obsidian-950 font-bold border-electro-cyan'
                      : 'glass-panel text-slate-400 border-white/10'
                  }`}
                >
                  1. Delivery Concierge
                </button>
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className={`flex-1 py-2 rounded-full font-mono text-xs text-center border transition-all ${
                    step === 'payment'
                      ? 'bg-electro-cyan text-obsidian-950 font-bold border-electro-cyan'
                      : 'glass-panel text-slate-400 border-white/10'
                  }`}
                >
                  2. Payment Vault
                </button>
              </div>

              {step === 'shipping' ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Recipient Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      required
                      className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Street Address</label>
                    <input
                      type="text"
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      required
                      className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                        className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-400">Country</label>
                      <input
                        type="text"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                        className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-slate-400">Direct Phone (For White-Glove Dispatch)</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="w-full py-3.5 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white shadow-[0_0_20px_#00F0FF] transition-all cursor-pointer mt-4"
                  >
                    <span>Proceed to Payment Vault</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border text-center font-mono text-xs flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-electro-cyan bg-electro-cyan/10 text-white'
                          : 'glass-panel text-slate-400 border-white/10'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-electro-cyan" />
                      <span>Black Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('applepay')}
                      className={`p-3 rounded-2xl border text-center font-mono text-xs flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'applepay'
                          ? 'border-electro-cyan bg-electro-cyan/10 text-white'
                          : 'glass-panel text-slate-400 border-white/10'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-400" />
                      <span>Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-3 rounded-2xl border text-center font-mono text-xs flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'crypto'
                          ? 'border-electro-cyan bg-electro-cyan/10 text-white'
                          : 'glass-panel text-slate-400 border-white/10'
                      }`}
                    >
                      <Cpu className="w-5 h-5 text-purple-400" />
                      <span>Web3 Crypto</span>
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-400">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={e => setCardNumber(e.target.value)}
                          required
                          className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white focus:outline-none focus:border-electro-cyan/60"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-slate-400">Expires</label>
                          <input
                            type="text"
                            value={expiry}
                            onChange={e => setExpiry(e.target.value)}
                            required
                            className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white focus:outline-none focus:border-electro-cyan/60"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-slate-400">CVV Security</label>
                          <input
                            type="password"
                            value={cvv}
                            onChange={e => setCvv(e.target.value)}
                            required
                            className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white focus:outline-none focus:border-electro-cyan/60"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="glass-panel p-4 rounded-2xl text-center space-y-2">
                      <p className="text-xs text-slate-300 font-mono">Biometric Passkey Authentication Active.</p>
                      <p className="text-[11px] text-slate-500">Touch ID / Face ID prompt will trigger on confirmation.</p>
                    </div>
                  )}

                  {paymentMethod === 'crypto' && (
                    <div className="glass-panel p-4 rounded-2xl space-y-2 font-mono text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Solana/USDT Address:</span>
                        <span className="text-electro-cyan">0xAURA...998F</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Instant zero-fee settlement over Solana network.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || cart.length === 0}
                    className="w-full py-4 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white shadow-[0_0_25px_#00F0FF] transition-all cursor-pointer disabled:opacity-50 mt-4"
                  >
                    <span>{isSubmitting ? 'Securing Transaction...' : `Authorize Payment • $${total.toLocaleString()}`}</span>
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary Right Side */}
            <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 border-b border-white/10 pb-2">
                  Order Breakdown
                </h4>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1 no-scrollbar my-3">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full glass-panel flex items-center justify-center font-bold text-[10px] text-electro-cyan">
                          {item.quantity}
                        </span>
                        <span className="text-white font-medium truncate max-w-[120px]">{item.product.name}</span>
                      </div>
                      <span className="font-mono text-slate-300">${(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10 font-mono text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount</span>
                      <span>-${(subtotal * discount).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Insured Shipping</span>
                    <span className="text-emerald-400">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                    <span>Final Amount</span>
                    <span className="text-electro-cyan">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-3 rounded-xl text-[10px] font-mono text-slate-400 space-y-1">
                <p className="flex items-center gap-1 text-slate-300 font-bold">
                  <Truck className="w-3.5 h-3.5 text-electro-cyan" /> 3-DAY GLOBAL EXPRESS DISPATCH
                </p>
                <p>Includes AURA Platinum Certificate & Serialized Armor Case.</p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
