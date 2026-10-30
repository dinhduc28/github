import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  LogOut,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  Edit2,
  Save,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Product, Order } from '../types';

interface AccountPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ products, onSelectProduct }) => {
  const { user, logout } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses'>('orders');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.fullName || 'Julian Sterling');
  const [profilePhone, setProfilePhone] = useState('+84 988 123 456');

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 px-4 text-center glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
        <Sparkles className="w-10 h-10 text-electro-cyan mx-auto animate-pulse" />
        <h2 className="font-display font-bold text-2xl text-white">Bạn chưa đăng nhập</h2>
        <p className="text-xs text-slate-400 font-mono">Vui lòng đăng nhập để xem thông tin tài khoản và đơn hàng.</p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_#00F0FF]"
        >
          <span>Đăng Nhập Ngay</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Mock Order History
  const mockOrders: Order[] = [
    {
      id: 'AUR-984210',
      items: [
        { product: products[0] || ({} as any), quantity: 1, selectedColor: 'Obsidian Black' },
        { product: products[1] || ({} as any), quantity: 1, selectedColor: 'Carbon Black' }
      ],
      shippingAddress: {
        fullName: user.fullName,
        street: '88 Lê Lợi, Phường Bến Nghé, Quận 1',
        city: 'TP. Hồ Chí Minh',
        country: 'Việt Nam',
        phone: '+84 988 123 456'
      },
      paymentMethod: 'Thẻ Credit Card Express',
      totalAmount: 5250,
      status: 'Shipped',
      paymentStatus: 'Paid',
      trackingNumber: 'TRK-AURA-887711',
      createdAt: '12 Tháng 8, 2026'
    },
    {
      id: 'AUR-442109',
      items: [{ product: products[2] || ({} as any), quantity: 1, selectedColor: 'Liquid Platinum' }],
      shippingAddress: {
        fullName: user.fullName,
        street: '88 Lê Lợi, Phường Bến Nghé, Quận 1',
        city: 'TP. Hồ Chí Minh',
        country: 'Việt Nam',
        phone: '+84 988 123 456'
      },
      paymentMethod: 'MOMO QR VIP',
      totalAmount: 2900,
      status: 'Delivered',
      paymentStatus: 'Paid',
      trackingNumber: 'TRK-AURA-332190',
      createdAt: '01 Tháng 8, 2026'
    }
  ];

  const wishlistProducts = wishlist;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    showToast('Đã cập nhật thông tin cá nhân thành công!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Account Hero Header */}
      <div className="glass-panel-glow rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-electro-cyan/60 shadow-[0_0_20px_#00F0FF]"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-obsidian-950 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-obsidian-950" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl text-white">{user.fullName}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-electro-cyan/20 text-electro-cyan text-[10px] font-mono font-bold uppercase tracking-wider border border-electro-cyan/40">
                {user.role === 'admin' ? 'Executive Admin' : 'AURA Private Circle VIP'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            <p className="text-[11px] text-slate-500 font-mono">Thành viên từ: Tháng 1, 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2.5 rounded-2xl glass-panel text-electro-cyan border-electro-cyan/40 text-xs font-mono font-bold hover:bg-electro-cyan hover:text-obsidian-950 transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Trang Quản Trị Admin</span>
            </Link>
          )}

          <button
            onClick={() => {
              logout();
              showToast('Đã đăng xuất tài khoản.', 'info');
              navigate('/');
            }}
            className="px-4 py-2.5 rounded-2xl glass-panel text-rose-400 border-rose-500/40 text-xs font-mono font-bold hover:bg-rose-500 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'orders', label: 'Đơn Hàng Của Tôi', icon: Package, count: mockOrders.length },
          { id: 'wishlist', label: 'Sản Phẩm Yêu Thích', icon: Heart, count: wishlistProducts.length },
          { id: 'profile', label: 'Hồ Sơ Cá Nhân', icon: UserIcon },
          { id: 'addresses', label: 'Địa Chỉ Giao Hàng', icon: MapPin }
        ].map(tab => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2.5 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-electro-cyan text-obsidian-950 font-black shadow-[0_0_15px_#00F0FF]'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-white/30'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? 'bg-obsidian-950 text-electro-cyan' : 'bg-white/10 text-slate-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {/* 1. ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="font-display font-extrabold text-xl text-white">Lịch Sử Đơn Hàng Qua Hệ Thống</h2>

          <div className="space-y-6">
            {mockOrders.map(order => (
              <div
                key={order.id}
                className="glass-panel-glow rounded-3xl p-6 border border-white/10 space-y-4 shadow-xl"
              >
                {/* Order Top Meta */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-lg text-white">Mã Đơn: #{order.id}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : order.status === 'Shipped'
                            ? 'bg-electro-cyan/20 text-electro-cyan border-electro-cyan/40'
                            : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        }`}
                      >
                        {order.status === 'Delivered' ? 'Đã giao thành công' : order.status === 'Shipped' ? 'Đang vận chuyển Express' : 'Đang xử lý'}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-400">Ngày đặt: {order.createdAt} • Phương thức: {order.paymentMethod}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Tổng tiền thanh toán</span>
                    <span className="font-display font-black text-2xl text-electro-cyan">
                      ${order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 p-3 rounded-2xl glass-panel border-white/5">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product?.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200'}
                          alt="Item"
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-white">{item.product?.name || 'AURA Product'}</h4>
                          <p className="text-[10px] font-mono text-slate-400">
                            Màu: {item.selectedColor} • Số lượng: {item.quantity}x
                          </p>
                        </div>
                      </div>

                      <span className="font-mono text-xs text-slate-200 font-bold">
                        ${((item.product?.price || 1850) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tracking & Receiver */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-electro-cyan" />
                    <span>Mã vận chuyển: <strong className="text-white">{order.trackingNumber}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Giao tới: <strong className="text-slate-200">{order.shippingAddress.street}, {order.shippingAddress.city}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. WISHLIST TAB */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <h2 className="font-display font-extrabold text-xl text-white">Danh Sách Yêu Thích Của Bạn</h2>

          {wishlistProducts.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
              <Heart className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-xs text-slate-400 font-mono">Bạn chưa lưu sản phẩm nào vào danh sách yêu thích.</p>
              <Link
                to="/store"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-wider"
              >
                <span>Khám phá Cửa Hàng ngay</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map(product => (
                <div
                  key={product.id}
                  className="glass-panel-glow rounded-3xl p-5 border border-white/10 space-y-3 hover:border-electro-cyan/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <img src={product.images[0]} alt={product.name} className="w-full h-48 rounded-2xl object-cover" />
                    <span className="text-[10px] font-mono text-electro-cyan uppercase tracking-widest">{product.category}</span>
                    <h3 className="font-display font-bold text-lg text-white">{product.name}</h3>
                    <p className="text-xs text-slate-400 font-mono line-clamp-1">{product.tagline}</p>
                    <span className="font-display font-extrabold text-xl text-white block">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        addToCart(product);
                        showToast(`Đã chuyển ${product.name} vào giỏ hàng!`, 'success');
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_10px_#00F0FF]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Thêm Giỏ Hàng</span>
                    </button>

                    <button
                      onClick={() => {
                        removeFromWishlist(product.id);
                        showToast(`Đã bỏ ${product.name} khỏi yêu thích.`, 'info');
                      }}
                      className="p-2.5 rounded-xl glass-panel text-rose-400 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                      title="Bỏ lưu"
                    >
                      <Heart className="w-4 h-4 fill-rose-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. PROFILE TAB */}
      {activeTab === 'profile' && (
        <div className="glass-panel-glow rounded-3xl p-8 border border-white/10 space-y-6 max-w-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-display font-extrabold text-xl text-white">Cập Nhật Hồ Sơ Thành Viên</h2>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-3.5 py-1.5 rounded-xl glass-panel text-xs font-mono text-electro-cyan hover:border-electro-cyan/50 flex items-center gap-2 cursor-pointer"
            >
              {isEditingProfile ? <Save className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
              <span>{isEditingProfile ? 'Hủy Sửa' : 'Chỉnh Sửa'}</span>
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400">Họ và Tên</label>
              <input
                type="text"
                disabled={!isEditingProfile}
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white disabled:opacity-60 focus:outline-none focus:border-electro-cyan/60"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400">Địa chỉ Email (Cố định)</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-slate-400 opacity-60 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400">Số Điện Thoại Liên Hệ</label>
              <input
                type="text"
                disabled={!isEditingProfile}
                value={profilePhone}
                onChange={e => setProfilePhone(e.target.value)}
                className="w-full glass-panel px-4 py-3 rounded-2xl text-xs text-white disabled:opacity-60 focus:outline-none focus:border-electro-cyan/60"
              />
            </div>

            {isEditingProfile && (
              <button
                type="submit"
                className="py-3 px-6 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-wider shadow-[0_0_15px_#00F0FF] cursor-pointer"
              >
                Lưu Thay Đổi Hồ Sơ
              </button>
            )}
          </form>
        </div>
      )}

      {/* 4. ADDRESSES TAB */}
      {activeTab === 'addresses' && (
        <div className="glass-panel-glow rounded-3xl p-8 border border-white/10 space-y-6 max-w-2xl">
          <h2 className="font-display font-extrabold text-xl text-white">Sổ Địa Chỉ Giao Hàng</h2>
          <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-electro-cyan/20 text-electro-cyan text-[10px] font-mono font-bold uppercase">
                Địa Chỉ Mặc Định
              </span>
              <span className="text-xs text-slate-400 font-mono">Việt Nam</span>
            </div>
            <h4 className="font-bold text-sm text-white">{user.fullName}</h4>
            <p className="text-xs text-slate-300 font-mono">88 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
            <p className="text-xs text-slate-400 font-mono">Điện thoại: +84 988 123 456</p>
          </div>
        </div>
      )}
    </div>
  );
};
