import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SiteFooter from '../components/SiteFooter';
import { QuoteCartModal } from '../components/Builder/QuoteCartModal';

export default function MainLayout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    // Redirige al contacto o abre el formulario final de cotización
    window.location.href = '/contact';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar onOpenCart={() => setIsCartOpen(true)} />
      
      <main style={{ flex: 1 }}>
        {children}
      </main>

      <SiteFooter />

      {/* Modal del Carrito Global */}
      <QuoteCartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onProceedToCheckout={handleProceedToCheckout}
      />
    </div>
  );
}