import { useContext } from "react";
import Image from "next/image";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);
  const discountedPrice = item.price - item.discount;

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex flex-col items-center">
        <Image
          src={item.image}
          alt={item.title}
          width={100}
          height={100}
          className="h-24 w-24 object-contain"
        />
        <div className="flex items-center space-x-2 border rounded-lg mt-2">
          <button
            className="w-8 px-2"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span className="px-2 border-l border-r w-8 text-center">
            {item.quantity}
          </span>
          <button
            className="w-8 px-2"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col ml-4 flex-1">
        <h2 className="text-left line-clamp-3 sm:line-clamp-2">{item.title}</h2>
        <p className="text-left text-sm capitalize text-gray-500">
          {item.brand}
        </p>
        <div className="flex items-center space-x-4 mt-3">
          <div className="flex items-center space-x-2">
            <p className="text-right">
              ${(discountedPrice * item.quantity).toFixed(2)}
            </p>
            {item.discount > 0 && (
              <span className="line-through text-gray-500">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            )}
          </div>
          <button
            className="text-red-600"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
