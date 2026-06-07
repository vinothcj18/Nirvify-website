import {
  createContext,
  useState,
  useEffect,
} from "react";

export const CartContext =
  createContext();

export function CartProvider({
  children,
}) {

  const [cartItems,
  setCartItems] =
    useState(() => {

      const savedCart =
        localStorage.getItem(
          "cart"
        );

      return savedCart
        ? JSON.parse(
            savedCart
          )
        : [];

    });

  useEffect(() => {

    console.log(
      "CART ITEMS:",
      cartItems
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartItems
      )
    );

  }, [cartItems]);

  const addToCart = (
    product,
    quantity
  ) => {

    console.log(
      "INSIDE ADD TO CART"
    );

    console.log(
      "PRODUCT:",
      product
    );

    console.log(
      "QUANTITY:",
      quantity
    );

    const existingItem =
      cartItems.find(
        (item) =>
          item._id ===
          product._id
      );

    console.log(
      "EXISTING ITEM:",
      existingItem
    );

    if (existingItem) {

      const updatedCart =
        cartItems.map(
          (item) =>
            item._id ===
            product._id
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    quantity,
                }
              : item
        );

      console.log(
        "UPDATED CART:",
        updatedCart
      );

      setCartItems(
        updatedCart
      );

    } else {

      const newCart = [
        ...cartItems,
        {
          ...product,
          quantity,
        },
      ];

      console.log(
        "NEW CART:",
        newCart
      );

      setCartItems(
        newCart
      );

    }

  };

  const removeFromCart =
    (id) => {

      const updatedCart =
        cartItems.filter(
          (item) =>
            item._id !== id
        );

      setCartItems(
        updatedCart
      );

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