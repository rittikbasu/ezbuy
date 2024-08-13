import "@/styles/globals.css";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <div className="max-w-7xl mx-auto">
      <CartProvider>
        <Header />
        <Component {...pageProps} />
        <Toaster position="top-center" richColors={true} closeButton={true} />
      </CartProvider>
    </div>
  );
}

export default MyApp;
