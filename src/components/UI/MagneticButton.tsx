import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'gold';
  className?: string;
  glow?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  glow = true,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.25;
    const y = (e.clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary: 'bg-slate-100 text-obsidian-950 hover:bg-white border border-white/40 shadow-xl',
    secondary: 'bg-obsidian-800 text-slate-100 hover:bg-obsidian-700 border border-white/10',
    glass: 'glass-panel text-slate-100 hover:border-electro-cyan/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]',
    gold: 'bg-gold text-obsidian-950 hover:bg-gold-light border border-yellow-200/50 shadow-gold',
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.1 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300 select-none overflow-hidden group cursor-pointer ${variantStyles[variant]} ${className}`}
      {...(props as any)}
    >
      {/* Dynamic Hover Ambient Light Beam */}
      {glow && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-electro-cyan/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
