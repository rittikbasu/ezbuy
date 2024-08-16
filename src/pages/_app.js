import "@/styles/globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A premium shopping experience with a beautifully designed interface & buttery smooth animations that make you go wow every time."
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="max-w-7xl mx-auto mb-8">
        <CartProvider>
          <Header />
          <Component {...pageProps} />
          <Toaster
            position="bottom-center"
            richColors={true}
            closeButton={true}
            toastOptions={{
              style: {
                borderRadius: "12px",
              },
            }}
          />
        </CartProvider>
      </div>
      <Analytics />
    </>
  );
}

export default MyApp;
