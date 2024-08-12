import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import CartItem from "@/components/CartItem";

const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4 mt-28">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold">
              Subtotal: ${calculateSubtotal().toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
