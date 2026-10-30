import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        showToast('Đăng nhập thành công! Chào mừng quay trở lại.', 'success');
        if (email.includes('admin')) {
          navigate('/admin');
        } else {
          navigate('/account');
        }
      } else {
        setError('Đăng nhập thất bại. Kiểm tra lại thông tin.');
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi xác thực hệ thống.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClient = async () => {
    setLoading(true);
    await login('julian@aura.luxury', 'customer123');
    showToast('Đã đăng nhập bằng tài khoản Demo Client!', 'info');
    navigate('/account');
    setLoading(false);
  };

  const handleDemoAdmin = async () => {
    setLoading(true);
    await login('admin@aura.luxury', 'admin123');
    showToast('Đã đăng nhập bằng tài khoản Executive Admin!', 'info');
    navigate('/admin');
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md glass-panel-glow rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-mono text-electro-cyan uppercase tracking-widest border-electro-cyan/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLIENT AUTHENTICATION</span>
          </div>
          <h1 className="font-display font-black text-3xl text-white">Đăng Nhập AURA</h1>
          <p className="text-xs text-slate-400 font-mono">
            Đăng nhập để quản lý đơn hàng, bộ sưu tập cá nhân và đặc quyền VIP.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-slate-400">Địa chỉ Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="client@aura.luxury"
                className="w-full glass-panel pl-10 pr-4 py-3.5 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase text-slate-400">Mật khẩu</label>
              <a href="#" className="text-[10px] font-mono text-electro-cyan hover:underline">Quên mật khẩu?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full glass-panel pl-10 pr-10 py-3.5 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
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

          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded accent-electro-cyan cursor-pointer"
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white shadow-[0_0_20px_#00F0FF] transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập Hệ Thống'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Access */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block text-center">
            Truy Cập Nhanh Demo 1-Click
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDemoClient}
              className="py-3 px-3 rounded-xl glass-panel text-[11px] font-mono text-slate-200 hover:text-white hover:border-white/40 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Khách Hàng Demo</span>
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="py-3 px-3 rounded-xl glass-panel text-[11px] font-mono text-electro-cyan hover:border-electro-cyan/60 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-electro-cyan" />
              <span>Admin Điều Hành</span>
            </button>
          </div>
        </div>

        {/* Footer Toggle */}
        <div className="text-center pt-2">
          <span className="text-xs text-slate-400 font-mono">Chưa có tài khoản AURA? </span>
          <Link to="/register" className="text-xs font-mono font-bold text-electro-cyan hover:underline">
            Tạo tài khoản mới
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
