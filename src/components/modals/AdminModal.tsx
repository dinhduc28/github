import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Package, Users, DollarSign, ShieldAlert, Plus, Check, RefreshCw } from 'lucide-react';
import { Product } from '../../types';
import { INITIAL_PRODUCTS } from '../../data/mockData';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProducts?: (products: Product[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onUpdateProducts }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory' | 'orders'>('analytics');
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS);

  // New product form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(2500);
  const [newProdCategory, setNewProdCategory] = useState('Spatial Audio');
  const [newProdStock, setNewProdStock] = useState(15);
  const [newProdMaterial, setNewProdMaterial] = useState('Aerospace Grade 5 Titanium');

  if (!isOpen) return null;

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    const newProduct: Product = {
      id: `aura-${Date.now().toString().slice(-4)}`,
      name: newProdName,
      tagline: newProdTagline || 'Bespoke Technological Sculpture',
      price: Number(newProdPrice),
      comparePrice: Number(newProdPrice) * 1.15,
      category: newProdCategory,
      rating: 5.0,
      reviewCount: 1,
      stock: Number(newProdStock),
      isFeatured: true,
      material: newProdMaterial,
      warranty: '3-Year Global Platinum Warranty',
      colors: ['Obsidian Black', 'Liquid Silver'],
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'
      ],
      description: 'Engineered specifically by Executive Design Board.'
    };

    const updated = [newProduct, ...productsList];
    setProductsList(updated);
    if (onUpdateProducts) onUpdateProducts(updated);
    setShowAddForm(false);
    setNewProdName('');
  };

  const handleDeleteProduct = (id: string) => {
    const updated = productsList.filter(p => p.id !== id);
    setProductsList(updated);
    if (onUpdateProducts) onUpdateProducts(updated);
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
          className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-2xl"
        />

        {/* Modal Main Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl glass-panel-glow rounded-3xl p-6 lg:p-10 z-10 shadow-2xl border-white/10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-electro-cyan font-mono text-xs uppercase tracking-widest">
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                <span>AURA EXECUTIVE OPERATIONAL SUITE</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl lg:text-3xl text-white">
                Billion Dollar Dashboard
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center gap-4 border-b border-white/10 py-4 shrink-0">
            {(['analytics', 'inventory', 'orders'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? 'bg-electro-cyan text-obsidian-950 font-bold shadow-[0_0_15px_#00F0FF]'
                    : 'glass-panel text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto py-6 space-y-8 pr-1 no-scrollbar">
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-panel p-5 rounded-2xl space-y-2 border border-white/10">
                    <div className="flex justify-between items-center text-slate-400 font-mono text-xs">
                      <span>GROSS REVENUE</span>
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="font-display font-black text-2xl text-white">$1,284,500</div>
                    <div className="text-[10px] font-mono text-emerald-400">+28.4% vs last month</div>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl space-y-2 border border-white/10">
                    <div className="flex justify-between items-center text-slate-400 font-mono text-xs">
                      <span>COMPLETED ORDERS</span>
                      <Package className="w-4 h-4 text-electro-cyan" />
                    </div>
                    <div className="font-display font-black text-2xl text-white">842</div>
                    <div className="text-[10px] font-mono text-electro-cyan">100% Insured Delivery</div>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl space-y-2 border border-white/10">
                    <div className="flex justify-between items-center text-slate-400 font-mono text-xs">
                      <span>ACTIVE VIP USERS</span>
                      <Users className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="font-display font-black text-2xl text-white">14,209</div>
                    <div className="text-[10px] font-mono text-purple-400">High Concierge Retention</div>
                  </div>

                  <div className="glass-panel p-5 rounded-2xl space-y-2 border border-white/10">
                    <div className="flex justify-between items-center text-slate-400 font-mono text-xs">
                      <span>CONVERSION RATE</span>
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="font-display font-black text-2xl text-white">4.82%</div>
                    <div className="text-[10px] font-mono text-amber-400">Industry Top Tier</div>
                  </div>
                </div>

                {/* Sales Chart Mock Visualization */}
                <div className="glass-panel p-6 rounded-3xl space-y-4 border border-white/10">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300">
                    2026 Monthly Revenue Flow ($ USD)
                  </h4>
                  <div className="h-44 flex items-end gap-4 pt-4 border-b border-white/10">
                    {[
                      { month: 'Jan', val: 40 },
                      { month: 'Feb', val: 55 },
                      { month: 'Mar', val: 70 },
                      { month: 'Apr', val: 65 },
                      { month: 'May', val: 85 },
                      { month: 'Jun', val: 100 },
                    ].map(bar => (
                      <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                        <div
                          className="w-full bg-gradient-to-t from-electro-cyan/40 to-electro-cyan rounded-t-xl group-hover:brightness-125 transition-all"
                          style={{ height: `${bar.val}%` }}
                        />
                        <span className="font-mono text-[10px] text-slate-400">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300">
                    Active Catalog Inventory ({productsList.length} Items)
                  </h4>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-4 py-2 rounded-full bg-electro-cyan text-obsidian-950 font-bold font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showAddForm ? 'Cancel Form' : 'Add New Product'}</span>
                  </button>
                </div>

                {/* Add Product Form */}
                {showAddForm && (
                  <form onSubmit={handleAddProduct} className="glass-panel p-6 rounded-2xl space-y-4 border border-electro-cyan/30">
                    <h5 className="font-mono text-xs text-electro-cyan uppercase">Bespoke Product Creation</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Product Name (e.g. AURA Chrono X)"
                        value={newProdName}
                        onChange={e => setNewProdName(e.target.value)}
                        required
                        className="glass-panel px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Tagline"
                        value={newProdTagline}
                        onChange={e => setNewProdTagline(e.target.value)}
                        className="glass-panel px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="number"
                        placeholder="Price ($)"
                        value={newProdPrice}
                        onChange={e => setNewProdPrice(Number(e.target.value))}
                        className="glass-panel px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                      <select
                        value={newProdCategory}
                        onChange={e => setNewProdCategory(e.target.value)}
                        className="glass-panel px-4 py-2.5 rounded-xl text-xs text-white focus:outline-none"
                      >
                        <option value="Spatial Audio">Spatial Audio</option>
                        <option value="Kinetic Timepieces">Kinetic Timepieces</option>
                        <option value="Vision Tech">Vision Tech</option>
                        <option value="Ambient Light">Ambient Light</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Stock Quantity"
                        value={newProdStock}
                        onChange={e => setNewProdStock(Number(e.target.value))}
                        className="glass-panel px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-electro-cyan text-obsidian-950 font-bold font-mono text-xs"
                    >
                      Publish Artifact
                    </button>
                  </form>
                )}

                {/* Inventory Table */}
                <div className="space-y-3">
                  {productsList.map(prod => (
                    <div key={prod.id} className="glass-panel p-4 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h5 className="font-bold text-sm text-white">{prod.name}</h5>
                          <span className="text-[10px] font-mono text-slate-400">{prod.category} • {prod.material}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 font-mono text-xs">
                        <span className="text-white font-bold">${prod.price.toLocaleString()}</span>
                        <span className="text-emerald-400">{prod.stock} in stock</span>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-[11px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300">
                  Live Dispatch Ledger
                </h4>
                <div className="space-y-3 font-mono text-xs">
                  {[
                    { id: 'AUR-992184', client: 'Julian Sterling', total: 5250, status: 'Processing', tracking: 'TRK-AURA-992184' },
                    { id: 'AUR-881204', client: 'Elena Rostova', total: 3400, status: 'Shipped', tracking: 'TRK-AURA-881204' },
                    { id: 'AUR-773190', client: 'Alexander Vance', total: 1850, status: 'Delivered', tracking: 'TRK-AURA-773190' },
                  ].map(ord => (
                    <div key={ord.id} className="glass-panel p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-electro-cyan font-bold">{ord.id}</span>
                          <span className="text-slate-400">• {ord.client}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">Tracking: {ord.tracking}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-white font-bold">${ord.total.toLocaleString()}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : ord.status === 'Shipped'
                              ? 'bg-electro-cyan/10 text-electro-cyan'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
