import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Box,
  MessageSquare
} from 'lucide-react';
import { Product, Review } from '../types';
import { MOCK_REVIEWS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { HeroCanvas } from '../components/3d/HeroCanvas';

interface ProductDetailPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, onSelectProduct }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = products.find(p => p.id === id) || products[0];

  const [activeImage, setActiveImage] = useState(0);
  const [show3D, setShow3D] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  // Customer Reviews state
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  const isWish = isInWishlist(product.id);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !reviewerName) {
      showToast('Vui lòng điền tên và nội dung đánh giá!', 'warning');
      return;
    }

    const reviewObj: Review = {
      id: `rev_${Date.now()}`,
      userName: reviewerName,
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      rating: newRating,
      date: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }),
      title: newTitle || 'Trải nghiệm tuyệt vời',
      comment: newComment,
      verified: true
    };

    setReviews([reviewObj, ...reviews]);
    setNewTitle('');
    setNewComment('');
    setReviewerName('');
    showToast('Cảm ơn bạn đã đóng góp đánh giá sản phẩm!', 'success');
  };

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Back to store link */}
      <div>
        <Link
          to="/store"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-electro-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Cửa Hàng AURA</span>
        </Link>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Visual Gallery / 3D Canvas */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden glass-panel-glow border border-white/10 flex items-center justify-center">
            {show3D ? (
              <HeroCanvas />
            ) : (
              <img
                src={product.images[activeImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}

            {/* 3D Mode Toggle Button */}
            <button
              onClick={() => setShow3D(!show3D)}
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-panel text-xs font-mono text-electro-cyan border-electro-cyan/40 flex items-center gap-2 cursor-pointer z-10"
            >
              <Box className="w-4 h-4" />
              <span>{show3D ? 'Chuyển Chế Độ Ảnh 2D' : 'Xem Mô Hình 3D Xoay 360°'}</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full glass-panel flex items-center justify-center transition-all z-10 ${
                isWish ? 'text-rose-400 border-rose-500/50 bg-rose-500/20' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWish ? 'fill-rose-400' : ''}`} />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImage(idx);
                  setShow3D(false);
                }}
                className={`aspect-square rounded-2xl overflow-hidden glass-panel border transition-all cursor-pointer ${
                  activeImage === idx && !show3D ? 'border-electro-cyan scale-95 shadow-[0_0_10px_#00F0FF]' : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Meta & Purchase Control */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full glass-panel text-[10px] font-mono text-electro-cyan uppercase tracking-widest border-electro-cyan/30">
                {product.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                <Star className="w-4 h-4 fill-amber-400" />
                {product.rating} ({product.reviewCount} đánh giá từ khách hàng)
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              {product.name}
            </h1>
            <p className="text-sm font-mono text-slate-400">{product.tagline}</p>
          </div>

          {/* Pricing & Stock */}
          <div className="flex items-baseline gap-4 p-4 rounded-2xl glass-panel border-white/10">
            <span className="font-display font-black text-3xl text-electro-cyan">
              ${product.price.toLocaleString()}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-slate-500 line-through font-mono">
                ${product.comparePrice.toLocaleString()}
              </span>
            )}
            <span className="ml-auto text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Còn lại {product.stock} sản phẩm sẵn có
            </span>
          </div>

          {/* Description Snippet */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-400">Chọn Phiên Bản Màu Sắc:</label>
            <div className="flex items-center gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    selectedColor === color
                      ? 'bg-electro-cyan text-obsidian-950 font-black shadow-[0_0_10px_#00F0FF]'
                      : 'glass-panel text-slate-300 hover:text-white'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-400">Số Lượng:</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center glass-panel rounded-xl p-1 border-white/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10"
                >
                  -
                </button>
                <span className="w-12 text-center text-xs font-mono text-white font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => {
                addToCart(product, quantity, selectedColor);
                showToast(`Đã thêm ${quantity}x ${product.name} vào giỏ hàng!`, 'success');
              }}
              className="flex-1 py-4 px-6 rounded-2xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_20px_#00F0FF] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Thêm Vào Giỏ Hàng</span>
            </button>

            <button
              onClick={() => {
                addToCart(product, 1, selectedColor);
                navigate('/checkout');
              }}
              className="flex-1 py-4 px-6 rounded-2xl glass-panel text-white border-white/20 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-electro-cyan/60 hover:text-electro-cyan transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mua Tốc Hành</span>
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center text-[10px] font-mono text-slate-400">
            <div className="flex flex-col items-center gap-1 glass-panel p-3 rounded-xl">
              <Truck className="w-4 h-4 text-electro-cyan" />
              <span>Vận chuyển Express 24h</span>
            </div>
            <div className="flex flex-col items-center gap-1 glass-panel p-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Bảo hành {product.warranty}</span>
            </div>
            <div className="flex flex-col items-center gap-1 glass-panel p-3 rounded-xl">
              <RotateCcw className="w-4 h-4 text-purple-400" />
              <span>Đổi mới trong 30 ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Customer Reviews */}
      <div className="glass-panel-glow rounded-3xl p-8 border border-white/10 space-y-8">
        <div className="flex items-center gap-4 border-b border-white/10 pb-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Tổng Quan & Đặc Tính' },
            { id: 'specs', label: 'Thông Số Kỹ Thuật' },
            { id: 'reviews', label: `Đánh Giá Khách Hàng (${reviews.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-electro-cyan text-obsidian-950 font-black shadow-[0_0_15px_#00F0FF]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <h3 className="font-display font-bold text-lg text-white">Công Nghệ Đúc Titanium & Không Gian</h3>
            <p>
              {product.description} Sản phẩm được gia công chính xác tới từng micromet tại hệ thống CNC Thụy Sĩ, tích hợp cảm biến thông minh thích ứng môi trường.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="glass-panel p-4 rounded-2xl border-white/5 space-y-1">
                <span className="text-xs font-mono text-electro-cyan font-bold uppercase">Chất liệu cao cấp</span>
                <p className="text-xs text-white">{product.material}</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border-white/5 space-y-1">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">Chính sách bảo hành</span>
                <p className="text-xs text-white">{product.warranty}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {[
              { label: 'Thương hiệu', val: 'AURA SPATIAL STUDIO' },
              { label: 'Danh mục', val: product.category },
              { label: 'Chất liệu khung', val: product.material },
              { label: 'Bảo hành chính hãng', val: product.warranty },
              { label: 'Chứng nhận', val: 'Swiss Precision & CE Certified' },
              { label: 'Kết nối / Nguồn', val: 'Neural Bluetooth 5.4 & Wireless MagCharge' }
            ].map(spec => (
              <div key={spec.label} className="glass-panel p-4 rounded-2xl border-white/5 flex justify-between">
                <span className="text-slate-400">{spec.label}:</span>
                <span className="text-white font-bold">{spec.val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map(rev => (
                <div key={rev.id} className="glass-panel p-6 rounded-2xl border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={rev.userAvatar} alt={rev.userName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{rev.userName}</span>
                          {rev.verified && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-mono">
                              Đã mua hàng
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-bold text-xs text-slate-200">{rev.title}</h4>
                  <p className="text-xs text-slate-400">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
              <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-electro-cyan" />
                <span>Viết Đánh Giá Của Bạn</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Họ và Tên</label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={e => setReviewerName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-slate-400">Số sao đánh giá</label>
                  <select
                    value={newRating}
                    onChange={e => setNewRating(Number(e.target.value))}
                    className="w-full glass-panel px-4 py-2.5 rounded-xl text-xs text-amber-400 focus:outline-none focus:border-electro-cyan/60"
                  >
                    <option value={5} className="bg-obsidian-950">★★★★★ (5/5 - Rất Tuyệt Mới)</option>
                    <option value={4} className="bg-obsidian-950">★★★★☆ (4/5 - Tốt)</option>
                    <option value={3} className="bg-obsidian-950">★★★☆☆ (3/5 - Bình thường)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-slate-400">Tiêu đề đánh giá</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Tiêu đề cảm nhận sản phẩm"
                  className="w-full glass-panel px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-slate-400">Nội dung nhận xét</label>
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm sử dụng thực tế của bạn..."
                  className="w-full glass-panel p-4 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-electro-cyan/60"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-electro-cyan text-obsidian-950 font-black text-xs uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-[0_0_15px_#00F0FF]"
              >
                Gửi Đánh Giá Ngay
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <h3 className="font-display font-extrabold text-2xl text-white">Sản Phẩm Cùng Bộ Sưu Tập</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  navigate(`/product/${p.id}`);
                }}
                className="glass-panel p-5 rounded-3xl border border-white/10 hover:border-electro-cyan/40 transition-all cursor-pointer space-y-3"
              >
                <img src={p.images[0]} alt={p.name} className="w-full h-44 rounded-2xl object-cover" />
                <span className="text-[10px] font-mono text-electro-cyan uppercase tracking-widest">{p.category}</span>
                <h4 className="font-display font-bold text-base text-white">{p.name}</h4>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-electro-cyan font-bold">${p.price.toLocaleString()}</span>
                  <span className="text-slate-400">★ {p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
