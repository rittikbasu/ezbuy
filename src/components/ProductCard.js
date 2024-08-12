import { useContext } from "react";
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
import { PlusIcon, Eye } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const discountedPrice = product.discount
    ? product.price - product.discount
    : product.price;
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
              className="flex items-center bg-blue-500 group-hover:animate-tilt-shaking text-white px-2 py-0.5 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              <PlusIcon size={16} className="mr-1" />
              Add to Cart
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
          className="pointer-events-auto relative flex max-h-[600px] sm:max-h-[800px] sm:w-[500px] w-full flex-col overflow-scroll border border-zinc-950/10 bg-white"
        >
          <DialogImage
            src={product.image}
            alt={product.title}
            className="h-full w-full"
          />
          <div className="p-6 bg-zinc-100">
            <DialogTitle className="text-xl text-zinc-950">
              {product.title}
            </DialogTitle>
            <DialogSubtitle className="text-zinc-700">
              ${product.price.toFixed(2)}
            </DialogSubtitle>
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
            <button
              className="flex items-center mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => addToCart(product)}
            >
              <PlusIcon size={18} className="mr-2" />
              Add to Cart
            </button>
          </div>
          <DialogClose className="text-black" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};

export default ProductCard;
