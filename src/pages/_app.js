import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <div className="max-w-7xl mx-auto">
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </div>
  );
}

export default MyApp;
