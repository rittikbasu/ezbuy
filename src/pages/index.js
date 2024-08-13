import { useContext } from "react";
import ProductCard from "@/components/ProductCard";
import { CartContext } from "@/context/CartContext";

const HomePage = ({ products }) => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="container mx-auto p-4 mt-20 sm:mt-28">
      <h1 className="text-3xl text-zinc-700 font-bold mb-6">Most Popular</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const isAdded = cartItems.some((item) => item.id === product.id);
          return (
            <ProductCard key={product.id} product={product} inCart={isAdded} />
          );
        })}
      </div>
    </div>
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
