import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Globe, Volume2, VolumeX } from 'lucide-react';
import { MagneticButton } from '../UI/MagneticButton';
import confetti from 'canvas-confetti';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.9 },
      colors: ['#00F0FF', '#D4AF37']
    });
  };

  return (
    <footer className="relative bg-obsidian-950 border-t border-white/10 pt-20 pb-12 overflow-hidden text-slate-400">
      {/* Background Aurora Lighting Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-electro-cyan/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Brand Luxury Guarantees Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-16 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-electro-cyan shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-slate-100 font-semibold text-xs tracking-wider uppercase">Global Express</h5>
              <p className="text-[11px] text-slate-400">Vận chuyển 24h toàn cầu</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-slate-100 font-semibold text-xs tracking-wider uppercase">Bảo Hành Platinum</h5>
              <p className="text-[11px] text-slate-400">3 năm 1 đổi 1 toàn cầu</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-purple-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-slate-100 font-semibold text-xs tracking-wider uppercase">30 Ngày Đổi Trả</h5>
              <p className="text-[11px] text-slate-400">Hoàn tiền 100% không phiền hà</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-slate-100 font-semibold text-xs tracking-wider uppercase">Chất Lượng Swiss</h5>
              <p className="text-[11px] text-slate-400">Tiêu chuẩn chế tác Thụy Sĩ</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
          {/* Brand Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-electro-cyan to-amber-300 p-[1px]">
                <div className="w-full h-full bg-obsidian-950 rounded-full flex items-center justify-center">
                  <span className="font-display font-black text-xs text-white">A</span>
                </div>
              </div>
              <span className="font-display tracking-[0.25em] font-extrabold text-lg text-slate-100">A U R A</span>
            </div>
            <p className="text-xs leading-relaxed max-w-md text-slate-400">
              AURA là thương hiệu thiết bị âm thanh không gian 3D & đồng hồ sinh trắc học cao cấp. Mọi sản phẩm được đúc từ Titanium Grade 5, pha lê sapphire và sợi carbon nguyên khối.
            </p>

            {/* Newsletter Registration */}
            <form onSubmit={handleSubscribe} className="space-y-3 max-w-md">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 block">
                Đăng ký nhận bản tin AURA VIP Collector
              </span>
              {subscribed ? (
                <div className="glass-panel p-3.5 rounded-2xl text-xs text-emerald-400 font-mono">
                  ✓ Bạn đã đăng ký thành công bản tin AURA VIP.
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Nhập địa chỉ email VIP..."
                    className="w-full glass-panel px-4 py-3 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                  />
                  <MagneticButton variant="primary" type="submit" className="shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              )}
            </form>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-8 font-mono">
            <div className="space-y-4">
              <h6 className="text-xs uppercase tracking-widest text-slate-200 font-bold">Cửa Hàng</h6>
              <ul className="space-y-2.5 text-xs">
                <li><Link to="/store?category=Spatial Audio" className="hover:text-electro-cyan transition-colors">Spatial Audio</Link></li>
                <li><Link to="/store?category=Kinetic Timepieces" className="hover:text-electro-cyan transition-colors">Kinetic Watches</Link></li>
                <li><Link to="/store?category=Vision Tech" className="hover:text-electro-cyan transition-colors">Vision Glass Pro</Link></li>
                <li><Link to="/store?category=Ambient Light" className="hover:text-electro-cyan transition-colors">Ambient Nodes</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h6 className="text-xs uppercase tracking-widest text-slate-200 font-bold">Thương Hiệu</h6>
              <ul className="space-y-2.5 text-xs">
                <li><Link to="/about" className="hover:text-electro-cyan transition-colors">Triết Lý Thiết Kế</Link></li>
                <li><Link to="/about" className="hover:text-electro-cyan transition-colors">Phòng Lab Thụy Sĩ</Link></li>
                <li><Link to="/contact" className="hover:text-electro-cyan transition-colors">Showroom Toàn Cầu</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h6 className="text-xs uppercase tracking-widest text-slate-200 font-bold">Tài Khoản & Hỗ Trợ</h6>
              <ul className="space-y-2.5 text-xs">
                <li><Link to="/login" className="hover:text-electro-cyan transition-colors">Đăng Nhập</Link></li>
                <li><Link to="/register" className="hover:text-electro-cyan transition-colors">Đăng Ký Thành Viên</Link></li>
                <li><Link to="/account" className="hover:text-electro-cyan transition-colors">Đơn Hàng Của Tôi</Link></li>
                <li><Link to="/contact" className="hover:text-electro-cyan transition-colors">Liên Hệ Support</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Controls */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <span>© 2026 AURA SPATIAL STUDIO INC. ALL RIGHTS RESERVED.</span>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSoundOn(!soundOn)}
              className="flex items-center gap-2 hover:text-electro-cyan transition-colors cursor-pointer"
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 text-electro-cyan" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              <span>SOUNDSCAPE: {soundOn ? 'ACTIVE' : 'MUTED'}</span>
            </button>

            <div className="flex items-center gap-1 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-electro-cyan" />
              <span>GLOBAL • USD ($)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
