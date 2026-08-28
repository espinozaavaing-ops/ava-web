import React, { createContext, useState, useContext } from 'react';

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, config = null) => {
    setCart((prevCart) => {
      const cartItemId = config ? `${product.id}-${config.generatedCode}` : product.id;
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prevCart,
        {
          cartItemId,
          id: product.id,
          name: product.name,
          category: product.category,
          reference: config?.generatedCode || product.name,
          quantity: 1,
          image: product.image
        }
      ];
    });
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
    <QuoteContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteCart = () => useContext(QuoteContext);