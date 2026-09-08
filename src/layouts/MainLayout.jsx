import React from 'react';
import NavBar from '../components/NavBar';
import SiteFooter from '../components/SiteFooter';
import { QuoteCartModal } from '../components/Builder/QuoteCartModal';
import { useQuoteCart } from '../context/QuoteContext';

export default function MainLayout({ children }) {
  const { isCartOpen, closeCart } = useQuoteCart();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      
      <main style={{ flex: 1 }}>
        {children}
      </main>

      <SiteFooter />

      {/* Modal del Carrito Global controlado por QuoteContext */}
      <QuoteCartModal 
        isOpen={isCartOpen} 
        onClose={closeCart} 
      />
    </div>
  );
}