import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // Evitar duplicar
    if (!cart.find((rutina) => rutina.id === item.id)) {
      setCart((prevCart) => [...prevCart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((rutina) => rutina.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
