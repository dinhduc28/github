import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, ChevronDown, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { HeroCanvas } from '../3d/HeroCanvas';
import { MagneticButton } from '../UI/MagneticButton';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-aurora-dark bg-noise">
      {/* Background Aurora Mesh Gradients */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-electro-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        {/* Left Column: Headlines & Copy */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Floating Pill Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-electro-cyan/30 text-xs font-mono text-electro-cyan uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>2026 SPATIAL ARCHITECTURE RELEASE</span>
          </motion.div>

          {/* Main Headline with Split Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
          >
            SPATIAL SOUND. <br />
            <span className="text-gradient-cyan">KINETIC ELEGANCE.</span>
          </motion.h1>

          {/* Body Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed"
          >
            AURA crafts high-precision spatial audio headwear and kinetic timepieces for collectors who demand absolute technological perfection.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton variant="primary" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Explore Collection</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton variant="glass">
              <Play className="w-3.5 h-3.5 fill-current text-electro-cyan" />
              <span>Watch Design Film</span>
            </MagneticButton>
          </motion.div>

          {/* Live Metrics Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg"
          >
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-white">0.001%</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">THD Distortion</div>
            </div>
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-electro-cyan">Grade 5</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Titanium Alloy</div>
            </div>
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-amber-400">8K OLED</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Dual Displays</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Three.js Interactive WebGL 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          <HeroCanvas />
        </motion.div>
      </div>

      {/* Scroll Down Arrow Indicator */}
      <div className="flex justify-center pt-8 pointer-events-auto">
        <a
          href="#catalog"
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-400 hover:text-electro-cyan hover:border-electro-cyan/50 transition-all duration-300 animate-bounce"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
