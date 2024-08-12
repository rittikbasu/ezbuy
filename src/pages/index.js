import ProductCard from "@/components/ProductCard";

const HomePage = ({ products }) => {
  return (
    <div className="container mx-auto p-4 mt-28">
      <h1 className="text-3xl font-bold mb-6">Most Popular</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
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
