import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Vui lòng điền đủ Họ tên, Email và Nội dung cần hỗ trợ!', 'warning');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      showToast('Cảm ơn bạn! Chuyên viên Concierge AURA sẽ phản hồi trong 2 giờ.', 'success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-glow border border-white/10 p-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-[11px] font-mono text-electro-cyan uppercase tracking-widest border-electro-cyan/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AURA PRIVATE CONCIERGE SERVICE</span>
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-white">Liên Hệ & Hỗ Trợ Độc Quyền</h1>
        <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto font-mono">
          Đội ngũ tư vấn viên AURA sẵn sàng phục vụ 24/7 đối với mọi thắc mắc về đơn hàng, đặt hàng chế tác riêng hoặc bảo hành.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 glass-panel-glow rounded-3xl p-8 border border-white/10 space-y-6">
          <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-electro-cyan" />
            <span>Gửi Yêu Cầu Tư Vấn Tức Thời</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-slate-400">Họ và Tên Khách Hàng</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Julian Sterling"
                  className="w-full glass-panel px-4 py-3 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-slate-400">Địa chỉ Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="client@aura.luxury"
                  className="w-full glass-panel px-4 py-3 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-slate-400">Chủ Đề Yêu Cầu</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Ví dụ: Đặt làm quà tặng bespoke / Thắc mắc bảo hành"
                className="w-full glass-panel px-4 py-3 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase text-slate-400">Nội Dung Chi Tiết</label>
              <textarea
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Nhập nội dung cần chuyên viên AURA hỗ trợ..."
                className="w-full glass-panel p-4 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white shadow-[0_0_20px_#00F0FF] transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Đang Gửi Yêu Cầu...' : 'Gửi Yêu Cầu Tư Vấn Ngay'}</span>
            </button>
          </form>
        </div>

        {/* Store Locations & Concierge Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel-glow rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Hotline & Hỗ Trợ Trực Tuyến</h3>
            <div className="space-y-3 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-3 glass-panel p-3 rounded-xl">
                <Phone className="w-4 h-4 text-electro-cyan" />
                <span>Hotline VIP: <strong className="text-white">+84 1900 8899 (24/7)</strong></span>
              </div>
              <div className="flex items-center gap-3 glass-panel p-3 rounded-xl">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Email: <strong className="text-white">concierge@aura.luxury</strong></span>
              </div>
              <div className="flex items-center gap-3 glass-panel p-3 rounded-xl">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Phản hồi nhanh trong vòng <strong className="text-white">2 giờ làm việc</strong></span>
              </div>
            </div>
          </div>

          <div className="glass-panel-glow rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Showroom Flagship Toàn Cầu</h3>
            <div className="space-y-3 text-xs font-mono">
              {[
                { city: 'TP. Hồ Chí Minh', addr: '88 Lê Lợi, Phường Bến Nghé, Quận 1', phone: '+84 988 123 456' },
                { city: 'Zürich, Switzerland', addr: 'Bahnhofstrasse 42, 8001 Zürich', phone: '+41 44 211 9000' },
                { city: 'Tokyo, Japan', addr: 'Ginza 6-10-1, Chuo-ku, Tokyo', phone: '+81 3 5537 9900' }
              ].map(st => (
                <div key={st.city} className="glass-panel p-4 rounded-2xl border-white/5 space-y-1">
                  <div className="flex items-center gap-2 text-electro-cyan font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{st.city}</span>
                  </div>
                  <p className="text-slate-300">{st.addr}</p>
                  <span className="text-[10px] text-slate-500">{st.phone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
