import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Sun, Moon, Heart, Sparkles, Menu, X, ShieldCheck, LogIn } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../context/WishlistContext';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { cart, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4 pointer-events-none transition-all duration-500">
      <div
        className={`max-w-7xl mx-auto rounded-full pointer-events-auto transition-all duration-500 px-6 py-3.5 flex items-center justify-between ${
          isScrolled
            ? 'glass-panel-glow shadow-2xl backdrop-blur-2xl border-white/10'
            : 'bg-obsidian-950/60 border border-white/10 backdrop-blur-md'
        }`}
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-electro-cyan via-purple-500 to-amber-300 p-[1px] transition-transform duration-500 group-hover:scale-110">
            <div className="w-full h-full bg-obsidian-950 rounded-full flex items-center justify-center">
              <span className="font-display font-black text-xs tracking-tighter text-white">A</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display tracking-[0.25em] font-extrabold text-sm text-slate-100 uppercase group-hover:text-electro-cyan transition-colors">
              A U R A
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 -mt-1 uppercase">SPATIAL STUDIO</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-slate-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-electro-cyan transition-colors py-1 relative ${isActive ? 'text-electro-cyan font-bold' : ''}`
            }
          >
            Trang Chủ
          </NavLink>

          <div
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
            className="relative"
          >
            <NavLink
              to="/store"
              className={({ isActive }) =>
                `hover:text-electro-cyan transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
                  isActive ? 'text-electro-cyan font-bold' : ''
                }`
              }
            >
              Cửa Hàng <Sparkles className="w-3 h-3 text-electro-cyan animate-pulse" />
            </NavLink>
          </div>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-electro-cyan transition-colors py-1 ${isActive ? 'text-electro-cyan font-bold' : ''}`
            }
          >
            Về AURA
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-electro-cyan transition-colors py-1 ${isActive ? 'text-electro-cyan font-bold' : ''}`
            }
          >
            Liên Hệ
          </NavLink>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Realtime Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-electro-cyan hover:border-electro-cyan/50 transition-all cursor-pointer"
            title="Tìm kiếm"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-all cursor-pointer"
            title="Đổi Giao Diện Light/Dark"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Wishlist */}
          <Link
            to="/account"
            className="relative w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-rose-400 transition-all cursor-pointer hidden sm:flex"
            title="Sản phẩm yêu thích"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] text-white font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-9 h-9 rounded-full glass-panel flex items-center justify-center text-slate-100 hover:border-electro-cyan/50 transition-all cursor-pointer"
            title="Giỏ hàng"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-electro-cyan text-obsidian-950 text-[10px] font-black flex items-center justify-center shadow-[0_0_10px_#00F0FF]"
              >
                {totalCartCount}
              </motion.span>
            )}
          </button>

          {/* Account / Login Link */}
          {user ? (
            <button
              onClick={() => navigate(user.role === 'admin' ? '/admin' : '/account')}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full glass-panel text-xs text-slate-200 hover:border-white/30 transition-all cursor-pointer"
            >
              <img
                src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt="User Avatar"
                className="w-6 h-6 rounded-full object-cover border border-white/20"
              />
              <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider">
                {user.role === 'admin' ? 'Admin Suite' : user.fullName.split(' ')[0]}
              </span>
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-full bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-all shadow-[0_0_10px_#00F0FF]"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Đăng Nhập</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 rounded-full glass-panel flex md:hidden items-center justify-center text-slate-200 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
            className="max-w-4xl mx-auto mt-2 pointer-events-auto glass-panel-glow rounded-3xl p-6 grid grid-cols-3 gap-6 shadow-2xl border-white/10"
          >
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-electro-cyan font-semibold">Spatial Audio</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><Link to="/store?category=Spatial Audio" className="hover:text-white">AURA Horizon One (Planar Driver)</Link></li>
                <li><Link to="/store?category=Spatial Audio" className="hover:text-white">AURA Acoustic Sphere 360</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-gold font-semibold">Kinetic Timepieces</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><Link to="/store?category=Kinetic Timepieces" className="hover:text-white">Chrono Kinetic V Tourbillon</Link></li>
                <li><Link to="/store?category=Kinetic Timepieces" className="hover:text-white">Carbon Fiber Bespoke Edition</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold">Neural Vision</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><Link to="/store?category=Vision Tech" className="hover:text-white">Vision Glass Pro (Dual 8K)</Link></li>
                <li><Link to="/store?category=Ambient Light" className="hover:text-white">Ambient Light Node Diffuser</Link></li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-7xl mx-auto mt-2 pointer-events-auto glass-panel-glow rounded-3xl p-6 border-white/10 shadow-2xl md:hidden space-y-4 font-mono text-xs uppercase"
          >
            <div className="flex flex-col space-y-3">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-200 hover:text-electro-cyan py-1">
                Trang Chủ
              </Link>
              <Link to="/store" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-200 hover:text-electro-cyan py-1">
                Cửa Hàng Độc Quyền
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-200 hover:text-electro-cyan py-1">
                Về AURA Studio
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-200 hover:text-electro-cyan py-1">
                Liên Hệ Concierge
              </Link>
              {user ? (
                <>
                  <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-electro-cyan font-bold py-1">
                    Tài Khoản Cá Nhân
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-amber-400 font-bold py-1">
                      Quản Trị Admin Suite
                    </Link>
                  )}
                </>
              ) : (
                <div className="pt-2 flex gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2.5 text-center rounded-xl bg-electro-cyan text-obsidian-950 font-black"
                  >
                    Đăng Nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2.5 text-center rounded-xl glass-panel text-white font-bold"
                  >
                    Đăng Ký
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
