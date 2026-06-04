import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  const addToCart = (product, quantity) => {
    
    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {

      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );

      setCartItems(updatedCart);

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity,
        },
      ]);

    }

  };
  
  const removeFromCart = (id) => {

  const updatedCart = cartItems.filter(
    (item) => item.id !== id
  );

  setCartItems(updatedCart);

};
const clearCart = () => {

  setCartItems([]);

};

  return (
    <CartContext.Provider
      value={{
  cartItems,
  addToCart,
  removeFromCart,
  clearCart,
}}
    >
      {children}
    </CartContext.Provider>
  );
}