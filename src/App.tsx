import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/UI/CustomCursor';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductModal } from './components/product/ProductModal';
import { SearchModal } from './components/modals/SearchModal';
import { OrderSuccessModal } from './components/modals/OrderSuccessModal';

import { HomePage } from './pages/HomePage';
import { StorePage } from './pages/StorePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AccountPage } from './pages/AccountPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { INITIAL_PRODUCTS } from './data/mockData';
import { Product, Order } from './types';
import { useAuth } from './context/AuthContext';

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Modal Open States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 font-sans selection:bg-electro-cyan/30 selection:text-electro-cyan relative overflow-x-hidden pt-24">
      {/* Custom Precision Kinetic Cursor */}
      <CustomCursor />

      {/* Global Navbar Header */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Multi-Page Routes */}
      <main className="min-h-[75vh]">
        <Routes>
          <Route path="/" element={<HomePage products={products} onSelectProduct={handleSelectProduct} />} />
          <Route path="/store" element={<StorePage products={products} onSelectProduct={handleSelectProduct} />} />
          <Route path="/product/:id" element={<ProductDetailPage products={products} onSelectProduct={handleSelectProduct} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage products={products} onSelectProduct={handleSelectProduct} />} />
          <Route path="/checkout" element={<CheckoutPage onOrderComplete={order => setCompletedOrder(order)} />} />
          <Route path="/admin" element={<AdminPage products={products} onUpdateProducts={newProds => setProducts(newProds)} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Side Drawers & Overlays */}
      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />

      {/* Interactive Quick View Modals */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />
      <OrderSuccessModal order={completedOrder} onClose={() => setCompletedOrder(null)} />
    </div>
  );
};

export default App;
