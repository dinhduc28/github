import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Search,
  X
} from 'lucide-react';
import { Product, Order, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface AdminPageProps {
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ products, onUpdateProducts }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'users'>('analytics');
  const [searchTerm, setSearchTerm] = useState('');

  // Add Product Form Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Spatial Audio');
  const [price, setPrice] = useState(1200);
  const [stock, setStock] = useState(20);
  const [material, setMaterial] = useState('Titanium Grade 5');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'
  );

  // Mock Admin Analytics data
  const stats = [
    { title: 'Tổng Doanh Thu', val: '$1,284,500', change: '+18.4%', icon: DollarSign, color: 'text-electro-cyan' },
    { title: 'Tổng Đơn Hàng', val: '842 Đơn', change: '+12.1%', icon: Package, color: 'text-amber-400' },
    { title: 'Sản Phẩm Trong Kho', val: `${products.length} Mẫu`, change: 'Sẵn sàng', icon: Sparkles, color: 'text-purple-400' },
    { title: 'Khách Hàng VIP', val: '14,209 Clients', change: '+24.5%', icon: Users, color: 'text-emerald-400' }
  ];

  // Mock Orders List for Admin
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'AUR-984210',
      items: [{ product: products[0] || ({} as any), quantity: 1, selectedColor: 'Obsidian Black' }],
      shippingAddress: {
        fullName: 'Alexander Vance',
        street: '88 Lê Lợi',
        city: 'TP. Hồ Chí Minh',
        country: 'Việt Nam',
        phone: '+84 988 123 456'
      },
      paymentMethod: 'Credit Card Express',
      totalAmount: 5250,
      status: 'Processing',
      paymentStatus: 'Paid',
      trackingNumber: 'TRK-AURA-887711',
      createdAt: '12/08/2026'
    },
    {
      id: 'AUR-442109',
      items: [{ product: products[1] || ({} as any), quantity: 1, selectedColor: 'Carbon Black' }],
      shippingAddress: {
        fullName: 'Elena Rostova',
        street: '12 Nguyễn Huệ',
        city: 'TP. Hồ Chí Minh',
        country: 'Việt Nam',
        phone: '+84 912 345 678'
      },
      paymentMethod: 'MOMO QR VIP',
      totalAmount: 3400,
      status: 'Shipped',
      paymentStatus: 'Paid',
      trackingNumber: 'TRK-AURA-332190',
      createdAt: '11/08/2026'
    }
  ]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-16 px-4 text-center glass-panel p-10 rounded-3xl border border-white/10 space-y-4">
        <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto animate-pulse" />
        <h2 className="font-display font-bold text-2xl text-white">Yêu Cầu Quyền Executive Admin</h2>
        <p className="text-xs text-slate-400 font-mono">
          Trang quản trị chỉ dành cho tài khoản Admin cấp cao. Vui lòng đăng nhập với tài khoản Admin Demo.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest"
        >
          <span>Đăng Nhập Admin Demo</span>
        </Link>
      </div>
    );
  }

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      showToast('Vui lòng điền đủ thông tin tên và mô tả!', 'warning');
      return;
    }

    const newProd: Product = {
      id: `aura-${Date.now()}`,
      name,
      tagline: 'Precision Spatial Innovation',
      price: Number(price),
      comparePrice: Number(price) + 200,
      category,
      rating: 5.0,
      reviewCount: 1,
      stock: Number(stock),
      isFeatured: true,
      material,
      warranty: '3-Year Platinum Warranty',
      colors: ['Obsidian Black', 'Titanium Silver'],
      images: [imageUrl],
      description
    };

    const updated = [newProd, ...products];
    onUpdateProducts(updated);
    setIsAddModalOpen(false);
    showToast(`Đã thêm sản phẩm ${name} vào hệ thống thành công!`, 'success');
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    onUpdateProducts(updated);
    showToast('Đã xóa sản phẩm khỏi kho hàng.', 'info');
  };

  const handleOrderStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
    showToast(`Đã chuyển đơn hàng #${orderId} sang trạng thái: ${newStatus}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Executive Admin Header */}
      <div className="glass-panel-glow rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-electro-cyan to-purple-600 p-[1px]">
            <div className="w-full h-full bg-obsidian-950 rounded-2xl flex items-center justify-center text-electro-cyan">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-2xl text-white">Bảng Quản Trị Executive Admin</h1>
              <span className="px-2.5 py-0.5 rounded bg-electro-cyan/20 text-electro-cyan text-[10px] font-mono font-bold uppercase">
                SYSTEM LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Quản lý toàn bộ doanh thu, đơn hàng, kho sản phẩm & người dùng toàn cầu.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_#00F0FF] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Sản Phẩm Mới</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, idx) => {
          const IconComp = st.icon;
          return (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400">{st.title}</span>
                <IconComp className={`w-5 h-5 ${st.color}`} />
              </div>
              <div className="font-display font-black text-2xl text-white">{st.val}</div>
              <span className="text-[10px] font-mono text-emerald-400">{st.change} so với tháng trước</span>
            </div>
          );
        })}
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'analytics', label: 'Thống Kê Doanh Thu', icon: TrendingUp },
          { id: 'products', label: `Quản Lý Kho (${products.length})`, icon: Package },
          { id: 'orders', label: `Đơn Hàng (${orders.length})`, icon: Clock },
          { id: 'users', label: 'Tài Khoản Khách Hàng', icon: Users }
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
            </button>
          );
        })}
      </div>

      {/* Tab 1: Analytics */}
      {activeTab === 'analytics' && (
        <div className="glass-panel-glow rounded-3xl p-8 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-xl text-white">Biểu Đồ Doanh Thu 6 Tháng Gần Nhất</h2>
            <span className="text-xs font-mono text-slate-400">Đơn vị: USD ($)</span>
          </div>

          {/* SVG Sales Graph */}
          <div className="h-64 w-full glass-panel rounded-2xl p-6 flex items-end justify-between gap-4 border-white/5">
            {[
              { month: 'T1', val: 180000, height: '35%' },
              { month: 'T2', val: 220000, height: '45%' },
              { month: 'T3', val: 310000, height: '60%' },
              { month: 'T4', val: 290000, height: '55%' },
              { month: 'T5', val: 450000, height: '85%' },
              { month: 'T6', val: 520000, height: '100%' }
            ].map(col => (
              <div key={col.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono text-electro-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  ${col.val.toLocaleString()}
                </span>
                <div
                  style={{ height: col.height }}
                  className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-electro-cyan/20 to-electro-cyan group-hover:from-electro-cyan group-hover:to-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                />
                <span className="text-xs font-mono text-slate-400 font-bold">{col.month}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Products Manager Table */}
      {activeTab === 'products' && (
        <div className="glass-panel-glow rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display font-extrabold text-xl text-white">Danh Sách Sản Phẩm Trong Kho</h2>

            <div className="relative w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Tìm tên sản phẩm..."
                className="w-full glass-panel pl-9 pr-4 py-2 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-white/10 text-slate-400 uppercase">
                <tr>
                  <th className="py-3 px-4">Sản Phẩm</th>
                  <th className="py-3 px-4">Danh Mục</th>
                  <th className="py-3 px-4">Giá Bán</th>
                  <th className="py-3 px-4">Tồn Kho</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products
                  .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(p => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="font-bold text-white block">{p.name}</span>
                          <span className="text-[10px] text-slate-500">{p.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-electro-cyan">{p.category}</td>
                      <td className="py-3 px-4 text-white font-bold">${p.price.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                          {p.stock} pcs
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 rounded-xl glass-panel text-rose-400 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Orders Manager */}
      {activeTab === 'orders' && (
        <div className="glass-panel-glow rounded-3xl p-6 border border-white/10 space-y-4">
          <h2 className="font-display font-extrabold text-xl text-white">Quản Lý Trạng Thái Đơn Hàng</h2>

          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="glass-panel p-5 rounded-2xl border-white/10 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-sm text-white">Đơn hàng #{order.id}</span>
                    <p className="text-xs text-slate-400 font-mono">Khách hàng: {order.shippingAddress.fullName} ({order.shippingAddress.phone})</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-electro-cyan font-bold">
                      ${order.totalAmount.toLocaleString()}
                    </span>

                    <select
                      value={order.status}
                      onChange={e => handleOrderStatusChange(order.id, e.target.value as any)}
                      className="glass-panel text-xs text-slate-200 px-3 py-1.5 rounded-xl border-electro-cyan/40 focus:outline-none cursor-pointer"
                    >
                      <option value="Processing" className="bg-obsidian-950">Đang xử lý (Processing)</option>
                      <option value="Shipped" className="bg-obsidian-950">Đã vận chuyển (Shipped)</option>
                      <option value="Delivered" className="bg-obsidian-950">Đã giao thành công (Delivered)</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Users Manager */}
      {activeTab === 'users' && (
        <div className="glass-panel-glow rounded-3xl p-6 border border-white/10 space-y-4">
          <h2 className="font-display font-extrabold text-xl text-white">Danh Sách Người Dùng Hệ Thống</h2>

          <div className="space-y-3">
            {[
              { name: 'Julian Sterling', email: 'julian@aura.luxury', role: 'Customer VIP', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100' },
              { name: 'Executive Admin', email: 'admin@aura.luxury', role: 'Executive Admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100' }
            ].map((usr, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-2xl border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={usr.avatar} alt={usr.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <span className="font-bold text-xs text-white block">{usr.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{usr.email}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-electro-cyan/20 text-electro-cyan text-[10px] font-mono font-bold">
                  {usr.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-xl">
          <div className="relative w-full max-w-lg glass-panel-glow rounded-3xl p-8 border-white/10 shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto scrollbar-none">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-display font-extrabold text-2xl text-white">Thêm Sản Phẩm Mới Vào Kho</h3>

            <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-slate-400 uppercase">Tên sản phẩm</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="AURA Horizon Ultra"
                  className="w-full glass-panel px-4 py-2.5 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 uppercase">Danh mục</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full glass-panel px-3 py-2.5 rounded-xl text-white focus:outline-none"
                  >
                    <option value="Spatial Audio" className="bg-obsidian-950">Spatial Audio</option>
                    <option value="Kinetic Timepieces" className="bg-obsidian-950">Kinetic Timepieces</option>
                    <option value="Vision Tech" className="bg-obsidian-950">Vision Tech</option>
                    <option value="Ambient Light" className="bg-obsidian-950">Ambient Light</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 uppercase">Giá bán ($)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-400 uppercase">Số lượng tồn kho</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={e => setStock(Number(e.target.value))}
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 uppercase">Chất liệu đúc</label>
                  <input
                    type="text"
                    value={material}
                    onChange={e => setMaterial(e.target.value)}
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 uppercase">URL Hình ảnh</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full glass-panel px-4 py-2.5 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 uppercase">Mô tả sản phẩm</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Mô tả công nghệ âm thanh/thiết kế..."
                  className="w-full glass-panel p-3 rounded-xl text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-wider shadow-[0_0_15px_#00F0FF] cursor-pointer"
              >
                Xác Nhận Lưu Vào Hệ Thống
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
