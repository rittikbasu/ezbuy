import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <header className="fixed top-0 w-full text-white z-50 mt-4 px-2">
      <div className="flex justify-between items-center max-w-7xl py-2 px-8 sm:py-4 sm:px-16 bg-lime-500/80 backdrop-blur rounded-full">
        <h1 className="sm:text-3xl text-2xl font-bold font-mono">
          <Link href="/">EzBuy</Link>
        </h1>
        <Link href="/cart">
          <div className="relative">
            <ShoppingCart className="text-white h-7 w-7 sm:h-8 sm:w-8" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-600 rounded-full text-xs text-white w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
