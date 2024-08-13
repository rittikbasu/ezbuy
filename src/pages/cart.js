import { useContext, useState } from "react";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import CartItem from "@/components/CartItem";

const CartPage = () => {
  const { cartItems } = useContext(CartContext);
  const [coupon, setCoupon] = useState("");
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [couponError, setCouponError] = useState("");

  const handleCouponCheck = (coupon) => {
    if (coupon === "profilefyi") {
      setCoupon("");
      setIsCouponValid(true);
      setCouponError("");
    } else {
      setIsCouponValid(false);
      setCouponError("Invalid coupon code.");
    }
  };

  const calculateSubtotal = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      const discount = item.discount || 0;
      const discountedPrice = item.price - discount;
      return sum + discountedPrice * item.quantity;
    }, 0);

    if (coupon.toLowerCase() === "profilefyi") {
      return subtotal * 0.9;
    }

    return subtotal;
  };

  const calculateOriginalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const calculateDiscount = () =>
    cartItems.reduce(
      (sum, item) => sum + (item.discount || 0) * item.quantity,
      0
    );

  return (
    <div className="mx-auto p-4 mt-20 sm:mt-28">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        &larr; Back to Products
      </Link>
      <h1 className="text-3xl text-zinc-700 font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <video
            src="/empty_cart.webm"
            autoPlay
            loop
            className="w-full max-w-md"
          />
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="bg-white mt-6">
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="coupon"
            >
              Apply Coupon
            </label>
            <div className="flex mb-4 sm:max-w-72 w-full border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                className="flex-grow p-2 focus:outline-none"
                placeholder="Enter coupon code"
              />
              <button
                className={`p-2 bg-lime-400 text-white ${
                  isCouponValid
                    ? "hover:bg-lime-500"
                    : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isCouponValid}
                onClick={handleCouponCheck}
              >
                Apply
              </button>
              {couponError && (
                <p className="text-red-500 mt-2">{couponError}</p>
              )}
            </div>
            <h2 className="text-lg font-semibold mb-4">
              Price Details ({cartItems.length} Items)
            </h2>
            <div className="flex justify-between mb-2">
              <span className="">Total MRP</span>
              <span className="">${calculateOriginalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="">Discount on MRP</span>
              <span className=" text-green-600">
                - ${calculateDiscount().toFixed(2)}
              </span>
            </div>
            {isCouponValid && (
              <div className="flex justify-between mb-2">
                <span className="">Coupon Discount</span>
                <span className="text-green-600">
                  {coupon.toLowerCase() === "profilefyi" ? "- 10%" : "- $0.00"}
                </span>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span className="">Platform Fee</span>
              <span className="">$2.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="">Shipping Fee</span>
              <span className=" text-green-600">FREE</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between mt-2">
              <span className="text-xl font-bold">Total Amount</span>
              <span className="text-xl font-bold">
                ${(calculateSubtotal() + 20).toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
