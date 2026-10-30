import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Cpu, Globe, Award, ArrowRight, Layers } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-glow border border-white/10 p-8 md:p-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-[11px] font-mono text-electro-cyan uppercase tracking-widest border-electro-cyan/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AURA SPATIAL MANIFESTO</span>
        </div>
        <h1 className="font-display font-black text-4xl md:text-6xl text-white tracking-tight leading-tight">
          Nơi Nghệ Thuật Chế Tác <br />Gặp Gỡ Công Nghệ Không Gian
        </h1>
        <p className="text-xs md:text-base text-slate-300 max-w-3xl mx-auto font-sans leading-relaxed">
          Được thành lập tại Zürich & Tokyo bởi các kỹ sư hàng không và nghệ nhân chế tác đồng hồ Thuỵ Sĩ, AURA ra đời với sứ mệnh định hình tương lai của thiết bị âm thanh không gian 3D và phụ kiện sinh trắc xa xỉ.
        </p>
      </div>

      {/* Pillars Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Hợp Kim Hàng Không Titanium',
            desc: 'Sử dụng Titanium Grade 5 tiêu chuẩn tàu vũ trụ, mang lại trọng lượng siêu nhẹ cùng khả năng chống ăn mòn tuyệt đối.',
            icon: ShieldCheck,
            color: 'text-electro-cyan'
          },
          {
            title: 'Màng Loa Phẳng Acoustic 3D',
            desc: 'Phát triển bộ truyền tín hiệu từ tính Planar kép với độ méo tiếng tiệm cận 0.001%, tái hiện chính xác từng dải tần số âm thanh.',
            icon: Cpu,
            color: 'text-amber-400'
          },
          {
            title: 'Mặt Kính Sapphire Nguyên Khối',
            desc: 'Cắt gọt và mài bóng thủ công từ tinh thể sapphire đạt độ cứng 9/10 Mohs, bảo vệ bề mặt vĩnh cửu trước thời gian.',
            icon: Award,
            color: 'text-purple-400'
          }
        ].map((pillar, idx) => {
          const IconComp = pillar.icon;
          return (
            <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 hover:border-electro-cyan/40 transition-all">
              <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center">
                <IconComp className={`w-6 h-6 ${pillar.color}`} />
              </div>
              <h3 className="font-display font-bold text-xl text-white">{pillar.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Lab Craftsmanship Showcase */}
      <div className="glass-panel-glow rounded-3xl p-8 md:p-12 border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">Phòng Lab Chế Tác Thụy Sĩ</span>
          <h2 className="font-display font-black text-3xl text-white">Chính Xác Tới Từng Micromet</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Mọi linh kiện AURA được thử nghiệm qua 200 giờ khắt khe trong môi trường áp suất chân không và thử nghiệm sóng âm thanh trường tự do. Mỗi sản phẩm khi xuất xưởng đều đính kèm chứng nhận thử nghiệm độc bản.
          </p>
          <div className="pt-2">
            <Link
              to="/store"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest shadow-[0_0_15px_#00F0FF]"
            >
              <span>Khám Phá Sản Phẩm Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="aspect-video rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop"
            alt="AURA Lab Studio"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
