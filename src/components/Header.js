import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  const { cartItems } = useContext(CartContext);

  const playSound = () => {
    const audio = new Audio("/sound_effects/click.mp3");
    audio.play();
  };

  return (
    <header className="fixed top-0 w-full z-30 mt-4 px-2 xl:px-0">
      <div className="flex justify-between items-center xl:max-w-7xl lg:max-w-5xl md:max-w-3xl py-2 px-8 sm:py-4 sm:px-16 bg-zinc-100/80 border webkit-backdrop-blur rounded-full mx-auto xl:mx-0">
        <h1
          className="sm:text-3xl text-zinc-700 text-2xl font-bold font-mono active:scale-50 transition duration-300"
          onMouseDown={playSound}
        >
          <Link href="/">EzBuy</Link>
        </h1>
        <div
          className="relative active:scale-50 transition duration-300"
          onMouseDown={playSound}
        >
          <Link href="/cart">
            <ShoppingCart className="text-zinc-700 h-7 w-7 sm:h-8 sm:w-8" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 sm:-right-4 -right-3 bg-red-600 rounded-full text-xs text-white w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
