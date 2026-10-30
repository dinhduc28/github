import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all required fields.');
      }
      const success = await login(email, password);
      if (success) {
        onClose();
      } else {
        setError('Authentication failed. Please check credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    login('admin@aura.luxury', 'admin123');
    onClose();
  };

  const handleDemoCustomer = () => {
    login('julian@aura.luxury', 'customer123');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-2xl"
        />

        {/* Auth Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass-panel-glow rounded-3xl p-8 z-10 shadow-2xl border-white/10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-mono text-electro-cyan uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>{isRegister ? 'JOIN PRIVATE CIRCLE' : 'CLIENT AUTHENTICATION'}</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              {isRegister ? 'Create AURA Account' : 'Welcome Back'}
            </h3>
            <p className="text-xs text-slate-400">
              {isRegister ? 'Access bespoke spatial headwear & priority drops.' : 'Enter your credentials to manage orders & collection.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-slate-400">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Julian Sterling"
                    className="w-full glass-panel pl-10 pr-4 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-400">Email Address</label>
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
              <label className="text-[10px] font-mono uppercase text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full glass-panel pl-10 pr-4 py-3 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white shadow-[0_0_20px_#00F0FF] transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Authenticating...' : isRegister ? 'Register Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block text-center">
              Quick Demo Access
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="py-2.5 px-3 rounded-xl glass-panel text-[11px] font-mono text-slate-300 hover:text-white hover:border-white/30 text-center"
              >
                👤 Client Demo
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="py-2.5 px-3 rounded-xl glass-panel text-[11px] font-mono text-electro-cyan hover:border-electro-cyan/50 text-center"
              >
                ⚡ Executive Admin
              </button>
            </div>
          </div>

          {/* Switch Mode Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="text-xs text-slate-400 hover:text-electro-cyan transition-colors font-mono"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Join Circle"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
