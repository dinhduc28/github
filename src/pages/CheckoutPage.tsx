import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Tag,
  Lock,
  QrCode
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Order } from '../types';

interface CheckoutPageProps {
  onOrderComplete: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderComplete }) => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState(user?.fullName || 'Julian Sterling');
  const [street, setStreet] = useState('88 Lê Lợi, Phường Bến Nghé, Quận 1');
  const [city, setCity] = useState('TP. Hồ Chí Minh');
  const [country, setCountry] = useState('Việt Nam');
  const [phone, setPhone] = useState('+84 988 123 456');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card Express');

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 3000 ? 0 : 50;
  const tax = Math.round(subtotal * 0.05);
  const totalAmount = Math.max(0, subtotal + shippingFee + tax - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'AURA10' || couponCode.toUpperCase() === 'VIP2026') {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setIsCouponApplied(true);
      showToast('Áp dụng mã giảm giá AURA VIP (-10%) thành công!', 'success');
    } else {
      showToast('Mã giảm giá không hợp lệ. Thử mã: AURA10', 'warning');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Giỏ hàng của bạn đang trống!', 'warning');
      return;
    }

    setLoading(true);

    const newOrder: Order = {
      id: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      shippingAddress: { fullName, street, city, country, phone },
      paymentMethod,
      totalAmount,
      status: 'Processing',
      paymentStatus: 'Paid',
      trackingNumber: `TRK-AURA-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
    } catch (err) {
      console.warn('API error, saving order in local state.');
    }

    // Trigger Confetti Effect
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    clearCart();
    onOrderComplete(newOrder);
    showToast('Đơn hàng AURA của bạn đã được khởi tạo thành công!', 'success');
    setLoading(false);
    navigate('/account');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 px-4 text-center glass-panel p-10 rounded-3xl border border-white/10 space-y-4">
        <ShoppingBag className="w-12 h-12 text-electro-cyan mx-auto animate-bounce" />
        <h2 className="font-display font-bold text-2xl text-white">Giỏ Hàng Đang Trống</h2>
        <p className="text-xs text-slate-400 font-mono">
          Vui lòng thêm sản phẩm vào giỏ hàng trước khi tiến hành thanh toán.
        </p>
        <Link
          to="/store"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_#00F0FF]"
        >
          <span>Khám Phá Cửa Hàng AURA</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-[11px] font-mono text-electro-cyan uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5" />
          <span>CHECKOUT BẢO MẬT PLATINUM 256-BIT</span>
        </div>
        <h1 className="font-display font-black text-3xl md:text-4xl text-white">Thanh Toán Đơn Hàng AURA</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Shipping details */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-white/10 space-y-4">
            <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-electro-cyan" />
              <span>1. Thông Tin Nhận Hàng Express</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-slate-400">Họ và Tên Người Nhận</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white focus:outline-none focus:border-electro-cyan/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-slate-400">Số Điện Thoại</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white focus:outline-none focus:border-electro-cyan/60"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400">Địa Chỉ Nhận Hàng Chi Tiết</label>
              <input
                type="text"
                value={street}
                onChange={e => setStreet(e.target.value)}
                className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white focus:outline-none focus:border-electro-cyan/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-slate-400">Tỉnh / Thành Phố</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white focus:outline-none focus:border-electro-cyan/60"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-slate-400">Quốc Gia</label>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white focus:outline-none focus:border-electro-cyan/60"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Payment Options */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-white/10 space-y-4">
            <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" />
              <span>2. Phương Thức Thanh Toán Xa Xỉ</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'Credit Card Express', label: 'Thẻ Credit / Visa VIP', desc: 'Thanh toán bảo mật tức thì', icon: CreditCard },
                { id: 'MOMO QR VIP', label: 'Ví MOMO / Banking QR', desc: 'Quét mã QR giao dịch tức thì', icon: QrCode },
                { id: 'Apple Pay Spatial', label: 'Apple Pay / Google Pay', desc: 'Xác thực sinh trắc học Touch/FaceID', icon: Sparkles },
                { id: 'COD Luxury Express', label: 'Thanh Toán Khi Nhận (COD)', desc: 'Kiểm tra hàng trước khi thanh toán', icon: ShieldCheck }
              ].map(pm => {
                const IconComp = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-4 rounded-2xl glass-panel text-left border transition-all cursor-pointer space-y-1.5 ${
                      paymentMethod === pm.id
                        ? 'border-electro-cyan bg-electro-cyan/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <IconComp className="w-5 h-5 text-electro-cyan" />
                      {paymentMethod === pm.id && <CheckCircle2 className="w-4 h-4 text-electro-cyan" />}
                    </div>
                    <h4 className="font-bold text-xs text-white">{pm.label}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{pm.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel-glow rounded-3xl p-6 border border-white/10 space-y-6 sticky top-24">
            <h2 className="font-display font-extrabold text-xl text-white border-b border-white/10 pb-3">
              Tóm Tắt Đơn Hàng ({cart.length})
            </h2>

            {/* Cart Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-none">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 p-3 rounded-2xl glass-panel border-white/5">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-white line-clamp-1">{item.product.name}</h4>
                    <p className="text-[10px] font-mono text-slate-400">
                      Màu: {item.selectedColor || 'Default'} • {item.quantity}x
                    </p>
                  </div>
                  <span className="font-mono text-xs text-electro-cyan font-bold">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="Nhập mã: AURA10"
                  className="w-full glass-panel pl-10 pr-4 py-2.5 rounded-xl text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                />
              </div>
              <button
                type="submit"
                className="py-2.5 px-4 rounded-xl bg-white/10 text-white font-mono font-bold text-xs hover:bg-white/20 transition-colors cursor-pointer"
              >
                Áp Dụng
              </button>
            </form>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4 text-slate-300">
              <div className="flex justify-between">
                <span>Tạm tính giỏ hàng:</span>
                <span className="text-white">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí giao hàng Express:</span>
                <span className="text-white">{shippingFee === 0 ? 'MIỄN PHÍ' : `$${shippingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Thuế bảo hiểm (5%):</span>
                <span className="text-white">${tax.toLocaleString()}</span>
              </div>
              {isCouponApplied && (
                <div className="flex justify-between text-electro-cyan font-bold">
                  <span>Ưu đãi VIP (AURA10):</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold font-display text-white border-t border-white/10 pt-3">
                <span>Tổng Cộng Thanh Toán:</span>
                <span className="text-electro-cyan font-black">${totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white shadow-[0_0_25px_#00F0FF] transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Đang Xử Lý Giao Dịch...' : 'Xác Nhận Đặt Hàng Ngay'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
