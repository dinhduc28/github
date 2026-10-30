import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe, Layers, Headphones, Watch, Eye, Sun } from 'lucide-react';
import { HeroSection } from '../components/hero/HeroSection';
import { ProductCatalog } from '../components/catalog/ProductCatalog';
import { Product } from '../types';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ products, onSelectProduct }) => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* 3D Interactive Hero Section */}
      <HeroSection />

      {/* Luxury Category Showcases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-[11px] font-mono text-electro-cyan uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DANH MỤC THIẾT KẾ ĐỘC QUYỀN</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
            Bộ Sưu Tập Cực Phẩm Đỉnh Cao
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto font-mono">
            Kết hợp tinh hoa chế tác kim khí hàng không, công nghệ âm thanh không gian 3D & sinh trắc học học máy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Spatial Audio',
              vnTitle: 'Âm Thanh Không Gian 3D',
              icon: Headphones,
              count: '12 Sản Phẩm',
              desc: 'Màng loa Phẳng Titanium & Khử Nổ Thủy Ngân.',
              color: 'from-cyan-500/20 to-blue-600/20',
              borderColor: 'border-cyan-500/30',
              category: 'Spatial Audio'
            },
            {
              title: 'Kinetic Timepieces',
              vnTitle: 'Đồng Hồ Cơ Sinh Trắc',
              icon: Watch,
              count: '8 Sản Phẩm',
              desc: 'Tourbillon cơ học chế tác sợi Carbon nguyên khối.',
              color: 'from-amber-500/20 to-orange-600/20',
              borderColor: 'border-amber-500/30',
              category: 'Kinetic Timepieces'
            },
            {
              title: 'Neural Vision',
              vnTitle: 'Kính Thực Tế Không Gian',
              icon: Eye,
              count: '6 Sản Phẩm',
              desc: 'Màn hình Dual 8K Micro-OLED định vị ánh nhìn.',
              color: 'from-purple-500/20 to-pink-600/20',
              borderColor: 'border-purple-500/30',
              category: 'Vision Tech'
            },
            {
              title: 'Ambient Light',
              vnTitle: 'Điêu Khắc Ánh Sáng Dynamic',
              icon: Sun,
              count: '9 Sản Phẩm',
              desc: 'Pha lê đồng thau biến đổi theo nhịp sinh học.',
              color: 'from-emerald-500/20 to-teal-600/20',
              borderColor: 'border-emerald-500/30',
              category: 'Ambient Light'
            }
          ].map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative rounded-3xl p-6 bg-gradient-to-b ${cat.color} glass-panel border ${cat.borderColor} hover:scale-[1.02] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between`}
              >
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-white group-hover:text-electro-cyan group-hover:scale-110 transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-electro-cyan uppercase tracking-widest">{cat.count}</span>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-electro-cyan transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 mt-0.5">{cat.vnTitle}</p>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cat.desc}</p>
                  </div>
                </div>

                <div className="pt-6 relative z-10">
                  <Link
                    to={`/store?category=${encodeURIComponent(cat.category)}`}
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-200 group-hover:text-electro-cyan transition-colors"
                  >
                    <span>Khám phá ngay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Main Product Catalog Preview */}
      <section id="catalog">
        <ProductCatalog products={products} onQuickView={onSelectProduct} />
      </section>

      {/* Engineering & Craftsmanship Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden glass-panel-glow border border-white/10 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>TIÊU CHUẨN CHẾ TÁC PLATINUM</span>
              </div>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">
                Triết Lý Thiết Kế Thấu Thị & Vĩnh Cửu
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Mỗi sản phẩm AURA được đúc từ Titanium Grade 5 tiêu chuẩn hàng không vũ trụ, lắp ráp thủ công tại phòng lab Thụy Sĩ và phủ lớp sapphire chống trầy tuyệt đối.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="glass-panel p-4 rounded-2xl border-white/5 space-y-1">
                  <span className="font-display font-black text-2xl text-electro-cyan">0.001%</span>
                  <p className="text-xs text-slate-400">Độ biến dạng âm thanh</p>
                </div>
                <div className="glass-panel p-4 rounded-2xl border-white/5 space-y-1">
                  <span className="font-display font-black text-2xl text-amber-400">5 Năm</span>
                  <p className="text-xs text-slate-400">Bảo hành toàn cầu 1:1</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-obsidian-950 font-black text-xs uppercase tracking-widest hover:bg-electro-cyan transition-all shadow-lg cursor-pointer"
                >
                  <span>Tìm Hiểu Quy Trình Chế Tác</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"
                alt="AURA Craftsmanship"
                className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-xl backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">AURA Acoustic Lab</span>
                  <p className="text-xs font-bold text-white">Chế tác Titanium & Sapphire</p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-electro-cyan/20 border border-electro-cyan/40 text-[10px] font-mono text-electro-cyan font-bold">
                  SWISS MADE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
