import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "sonner";
import { MoveRight } from "lucide-react";
import { CartContext } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import CheckoutPanel from "@/components/CheckoutPanel";

const CartPage = () => {
  const { cartItems, isCouponValid, setIsCouponValid } =
    useContext(CartContext);
  const [coupon, setCoupon] = useState("");
  const [showCheckoutFlow, setShowCheckoutFlow] = useState(false);

  const handleCouponCheck = useCallback(() => {
    if (coupon === "PROFILEFYI") {
      setCoupon("");
      setIsCouponValid(true);
      toast.success("Coupon code applied successfully.", { duration: 2000 });
    } else {
      setIsCouponValid(false);
      toast.error("Invalid coupon code.", { duration: 2000 });
    }
  }, [coupon, setIsCouponValid]);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + (item.price - (item.discount || 0)) * item.quantity,
        0
      ),
    [cartItems]
  );

  const originalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const discount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.discount || 0) * item.quantity,
        0
      ),
    [cartItems]
  );

  const finalPrice = useMemo(() => {
    const platformFee = 2;
    return isCouponValid
      ? subtotal * 0.9 + platformFee
      : subtotal + platformFee;
  }, [subtotal, isCouponValid]);

  useEffect(() => {
    if (showCheckoutFlow) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showCheckoutFlow]);

  return (
    <>
      <Head>
        <title>EzBuy | Your Cart</title>
      </Head>
      <div className="mx-auto p-4 mt-20 sm:mt-28">
        <Link href="/" className="text-blue-500 hover:underline mb-6 block">
          &larr; Back to Products
        </Link>
        <h1 className="text-3xl text-zinc-700 font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <video
              src="/empty_cart.webm"
              autoPlay
              loop
              playsInline
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
                  maxLength={15}
                />
                <button
                  className={`p-2 w-20 bg-lime-400 text-white ${
                    !isCouponValid && coupon !== ""
                      ? "hover:bg-lime-500"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={isCouponValid || coupon === ""}
                  onClick={handleCouponCheck}
                >
                  Apply
                </button>
              </div>
              <h2 className="text-lg font-semibold mb-4">
                Price Details ({cartItems.length} Items)
              </h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${originalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span className="text-green-600">- ${discount.toFixed(2)}</span>
              </div>
              {isCouponValid && (
                <div className="flex justify-between mb-2">
                  <span>Coupon Discount</span>
                  <span className="text-green-600">
                    - ${((finalPrice / 0.9) * 0.1).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between mb-2">
                <span>Platform Fee</span>
                <span>$2.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping Fee</span>
                <span className="text-green-600">FREE</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mt-2">
                <span className="text-xl font-bold">Total Amount</span>
                <span className="text-xl font-bold">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="h-9 px-3 border border-zinc-50/10 bg-zinc-700 outline-none text-white rounded-lg hover:bg-zinc-500 flex items-center justify-center"
                  onClick={() => setShowCheckoutFlow(true)}
                >
                  Proceed to Checkout
                  <MoveRight className="ml-2" />
                </button>
                <CheckoutPanel
                  visible={showCheckoutFlow}
                  onClose={() => setShowCheckoutFlow(false)}
                  price={finalPrice.toFixed(2)}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
