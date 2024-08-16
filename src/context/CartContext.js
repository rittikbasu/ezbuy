import { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCouponValid, setIsCouponValid] = useState(false);

  // load cart and coupon state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      const savedCoupon =
        JSON.parse(localStorage.getItem("isCouponValid")) || false;
      setCartItems(savedCart);
      setIsCouponValid(savedCoupon);
      setIsInitialized(true);
    }
  }, []);

  // save cart and coupon state to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("isCouponValid", JSON.stringify(isCouponValid));
    }
  }, [cartItems, isCouponValid, isInitialized]);

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setIsCouponValid(false);
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== id);
      }
      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setIsCouponValid(false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCouponValid,
        setIsCouponValid,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
