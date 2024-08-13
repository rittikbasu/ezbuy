import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from "@/components/core/dialog";
import { PlusIcon, Eye, Check } from "lucide-react";

const ProductCard = ({ product, inCart }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(inCart);

  const discountedPrice = product.discount
    ? product.price - product.discount
    : product.price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
  };
  return (
    <Dialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: "12px",
        }}
        className="flex sm:max-w-[300px] flex-col overflow-hidden border border-zinc-950/10 bg-white group"
      >
        <DialogImage
          src={product.image}
          alt={product.title}
          className="h-56 w-full object-contain p-2"
        />
        <div className="flex flex-col p-2 bg-zinc-100">
          <DialogTitle className="text-zinc-950 line-clamp-1">
            {product.title}
          </DialogTitle>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <DialogSubtitle className="text-zinc-500 mr-2">
                ${discountedPrice.toFixed(2)}
              </DialogSubtitle>
              {product.discount && (
                <span className="text-zinc-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <button
              className={`flex items-center outline-nonei ${
                isAdded
                  ? "bg-gray-400"
                  : "bg-lime-500 group-hover:animate-tilt-shaking"
              } text-white px-2 py-0.5 rounded-lg`}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? (
                <>
                  <Check size={16} className="mr-1" />
                  Added to Cart
                </>
              ) : (
                <>
                  <PlusIcon size={16} className="mr-1" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
        <div className="absolute top-2 right-2 border border-zinc-200 bg-zinc-50 rounded-full p-1">
          <Eye size={28} className="text-zinc-400" />
        </div>
        {product.onSale && (
          <span className="absolute top-2 left-2 mr-2 bg-red-500 text-white px-4 py-0.5 rounded-full">
            Sale
          </span>
        )}
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: "24px",
          }}
          className="pointer-events-auto relative flex max-h-[600px] sm:max-h-[800px] sm:w-[500px] w-full flex-col overflow-hidden border border-zinc-950/10 bg-white mx-2"
        >
          <div className="flex-1 overflow-y-auto mb-14 sm:mb-16">
            <DialogImage
              src={product.image}
              alt={product.title}
              className="h-56 sm:h-72 w-full object-contain p-2"
            />
            <div className="p-6 bg-zinc-100">
              <DialogTitle className="text-xl text-zinc-950">
                {product.title}
              </DialogTitle>
              <DialogDescription
                disableLayoutAnimation
                variants={{
                  initial: { opacity: 0, scale: 0.8, y: 100 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.8, y: 100 },
                }}
              >
                <p className="mt-2 text-zinc-500">{product.description}</p>
              </DialogDescription>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between py-3 sm:py-4 px-6 bg-lime-50 border-t border-zinc-200">
            <div className="flex items-center">
              <DialogSubtitle className="text-zinc-700 mr-2">
                ${discountedPrice.toFixed(2)}
              </DialogSubtitle>
              {product.discount && (
                <span className="text-zinc-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <button
              className={`flex items-center outline-none active:scale-50 transition duration-300 ${
                isAdded ? "bg-gray-400" : "bg-lime-500"
              } text-white px-4 py-2 rounded-xl`}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? (
                <>
                  <Check size={18} className="mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <PlusIcon size={18} className="mr-2" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
          <DialogClose className="text-zinc-700" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};

export default ProductCard;
