import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User as UserIcon, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const avatarOptions = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password) {
      setError('Vui lòng nhập đầy đủ các trường thông tin bắt buộc.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu và Xác nhận mật khẩu không trùng khớp.');
      return;
    }

    if (!agreeTerms) {
      setError('Bạn cần đồng ý với Điều khoản thành viên AURA.');
      return;
    }

    setLoading(true);
    try {
      const success = await register(fullName, email, password, selectedAvatar);
      if (success) {
        showToast('Đăng ký tài khoản thành công! Chào mừng đến với AURA Circle.', 'success');
        navigate('/account');
      } else {
        setError('Đăng ký thất bại. Email có thể đã tồn tại.');
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi đăng ký tài khoản.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md glass-panel-glow rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-mono text-electro-cyan uppercase tracking-widest border-electro-cyan/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN AURA PRIVATE CIRCLE</span>
          </div>
          <h1 className="font-display font-black text-3xl text-white">Đăng Ký Thành Viên</h1>
          <p className="text-xs text-slate-400 font-mono">
            Gia nhập cộng đồng sở hữu sản phẩm công nghệ âm thanh & thời gian xa xỉ.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Selector */}
          <div className="space-y-2 text-center">
            <label className="text-[10px] font-mono uppercase text-slate-400 block">Chọn Ảnh Đại Diện Avatar</label>
            <div className="flex items-center justify-center gap-3">
              {avatarOptions.map((av, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedAvatar(av)}
                  className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedAvatar === av ? 'border-electro-cyan scale-110 shadow-[0_0_15px_#00F0FF]' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={av} alt="Avatar option" className="w-full h-full object-cover" />
                  {selectedAvatar === av && (
                    <div className="absolute inset-0 bg-electro-cyan/30 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-obsidian-950" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-slate-400">Họ và Tên Khách Hàng</label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Ví dụ: Julian Sterling"
                className="w-full glass-panel pl-10 pr-4 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-slate-400">Địa chỉ Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="client@aura.luxury"
                className="w-full glass-panel pl-10 pr-4 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-slate-400">Mật khẩu bảo mật</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full glass-panel pl-10 pr-10 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-slate-400">Xác nhận mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full glass-panel pl-10 pr-4 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                className="rounded accent-electro-cyan cursor-pointer"
              />
              <span>Tôi đồng ý với Điều khoản bảo mật & dịch vụ AURA</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white shadow-[0_0_20px_#00F0FF] transition-all cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Đang khởi tạo tài khoản...' : 'Đăng Ký Thành Viên Ngay'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="text-center pt-4 border-t border-white/10">
          <span className="text-xs text-slate-400 font-mono">Đã có tài khoản AURA? </span>
          <Link to="/login" className="text-xs font-mono font-bold text-electro-cyan hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
