import { useContext } from "react";
import Image from "next/image";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between border-b py-4">
      <Image
        src={item.image}
        alt={item.title}
        width={64}
        height={64}
        className="h-16 w-16 object-contain"
      />
      <h2 className="flex-1 ml-4">{item.title}</h2>
      <div className="flex items-center">
        <button
          className="px-2"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>
        <span className="px-2">{item.quantity}</span>
        <button
          className="px-2"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <p className="w-24 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
      <button
        className="ml-4 text-red-600"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
