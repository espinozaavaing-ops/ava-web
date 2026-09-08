import React, { createContext, useState, useContext } from 'react';

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product, config = null) => {
    const productId = product.id || `item-${(product.name || product.title || 'product').toLowerCase().replace(/\s+/g, '-')}`;
    const productName = product.name || product.title || 'Producto';
    const productImage = product.image || product.img || product.imagen;
    const productCategory = product.category || product.categoria || 'General';
    
    const cartItemId = config ? `${productId}-${config.generatedCode}` : (product.cartItemId || productId);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += (product.quantity || 1);
        return updated;
      }

      return [
        ...prevCart,
        {
          cartItemId,
          id: productId,
          name: productName,
          category: productCategory,
          reference: config?.generatedCode || productName,
          quantity: product.quantity || 1,
          image: productImage,
          description: product.description || product.desc
        }
      ];
    });

    // Despliega automáticamente el modal del carrito al agregar un ítem
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) return removeFromCart(cartItemId);
    setCart((prevCart) =>
      prevCart.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  return (
    <QuoteContext.Provider 
      value={{ 
        cart, 
        cartItems: cart, // alias por compatibilidad
        isCartOpen, 
        openCart, 
        closeCart, 
        toggleCart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteCart = () => useContext(QuoteContext);