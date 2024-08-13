import { useContext } from "react";
import Head from "next/head";
import { Copy } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { CartContext } from "@/context/CartContext";
import { toast } from "sonner";

const HomePage = ({ products }) => {
  const { cartItems } = useContext(CartContext);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("PROFILEFYI");
    toast.success("Coupon code copied to clipboard.");
  };

  return (
    <>
      <Head>
        <title>EzBuy - A Premium Shopping Experience</title>
      </Head>
      <div className="container mx-auto p-4 mt-20 sm:mt-28">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <h1 className="text-3xl text-zinc-700 font-bold mb-4 lg:mb-0">
            Most Popular
          </h1>

          <div className="bg-amber-100 text-yellow-800 p-4 rounded-xl flex items-center justify-between w-full lg:w-auto">
            <p className="font-semibold mr-4">
              Get 10% off using code{" "}
              <span className="font-bold">PROFILEFYI</span>
            </p>
            <Copy
              className="cursor-pointer w-5 h-5 text-yellow-800 hover:text-yellow-600 ml-auto"
              onClick={copyToClipboard}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const isAdded = cartItems.some((item) => item.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                inCart={isAdded}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const categories = [
    "tv",
    "audio",
    "laptop",
    "mobile",
    "gaming",
    "appliances",
  ];
  const products = [];

  for (const category of categories) {
    const res = await fetch(
      `https://fakestoreapi.in/api/products/category?type=${category}&limit=2`
    );
    const data = await res.json();
    products.push(...data.products);
  }

  return {
    props: {
      products,
    },
  };
}
