import React, { createContext, useContext, useEffect, useState } from 'react';

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setcart] = useState(() => {
    try {
      const savedcart = localStorage.getItem('cart');
      return savedcart ? JSON.parse(savedcart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // add an item to cart or increase
  const addtocart = (item, quantity = 1) => {
    setcart((prevcart) => {
      const existingItem = prevcart.find((ci) => ci.id === item.id);
      if (existingItem) {
        return prevcart.map((ci) =>
          ci.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      } else {
        return [...prevcart, { ...item, quantity }];
      }
    });
  };

  // remove item from cart
  const removeFromcart = (ItemId) => {
    setcart((prevcart) => prevcart.filter((ci) => ci.id !== ItemId));
  };

  // update item quantity
  const updatequantity = (ItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setcart((prevcart) =>
      prevcart.map((ci) =>
        ci.id === ItemId ? { ...ci, quantity: newQuantity } : ci
      )
    );
  };

  // clear cart
  const clearcart = () => {
    setcart([]);
  };

  // calculate total cost
  const getcarttotal = () =>
    cart.reduce((total, ci) => total + ci.price * ci.quantity, 0);

  // calculate total number of items in cart
  const cartcount = cart.reduce((count, ci) => count + ci.quantity, 0);

  return (
    <cartContext.Provider
      value={{
        cart,
        cartcount,
        addtocart,
        removeFromcart,
        updatequantity,
        clearcart,
        getcarttotal,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const usecart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error('usecart must be used within a CartProvider');
  }
  return context;
};
