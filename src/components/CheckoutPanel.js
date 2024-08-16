import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useMeasure from "react-use-measure";
import { CartContext } from "@/context/CartContext";
import { TransitionPanel } from "@/components/framer/transition-panel";

function Button({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className="relative flex h-8 w-24 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

export default function CheckoutPanel({ visible, onClose, price }) {
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ref, bounds] = useMeasure();
  const { clearCart } = useContext(CartContext);
  const router = useRouter();

  const handleCardSelect = (index) => {
    setSelectedCard(index);
  };

  const handleAddressSelect = (index) => {
    setSelectedAddress(index);
  };

  const isNextBtnEnabled = () => {
    if (activePanelIndex === 0) return selectedAddress !== null;
    if (activePanelIndex === 1) return selectedCard !== null;
    if (activePanelIndex === 2) return cvv.length === 3;
    return true;
  };

  const handleNextClick = () => {
    if (activePanelIndex === 2) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        handleSetActiveIndex(activePanelIndex + 1);
      }, 2000);
    } else {
      handleSetActiveIndex(activePanelIndex + 1);
    }
  };

  const handleClose = () => {
    if (activePanelIndex === STEPS.length - 1) {
      clearCart();
      router.push("/");
    } else {
      onClose();
    }
    setActivePanelIndex(0);
    setSelectedCard(null);
    setSelectedAddress(null);
    setCvv("");
  };

  const STEPS = [
    {
      title: "Shipping Address",
      content: (
        <div>
          <div className="space-y-4">
            {[
              {
                label: "Home",
                address: "157 Palm Avenue, Miami, FL 33101",
              },
              {
                label: "Office",
                address: "456 Ocean Breeze Lane, Orlando, FL 32801",
              },
              {
                label: "Rittik’s House",
                address: "372 Sunny Palm Boulevard, Miami, FL 33101",
              },
            ].map((address, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-2xl bg-zinc-100 border ${
                  selectedAddress === index && "border-blue-500"
                }`}
                onClick={() => handleAddressSelect(index)}
              >
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{address.label}</p>
                  <p className="text-xs">{address.address}</p>
                </div>
                <input
                  type="radio"
                  name="address"
                  className="form-radio"
                  checked={selectedAddress === index}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Card Selection",
      content: (
        <div>
          <div className="space-y-4">
            {[
              {
                src: "https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Citi-128.png",
                alt: "Debit Card",
                label: "Debit Card",
                number: "5234 •••• •••• 4761",
              },
              {
                src: "https://cdn4.iconfinder.com/data/icons/logos-3/565/Mastercard-icon-512.png",
                alt: "Credit Card",
                label: "Credit Card",
                number: "2345 •••• •••• 4932",
              },
              {
                src: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/250_Paypal_logo-1024.png",
                alt: "PayPal",
                label: "Debit Card",
                number: "4958 •••• •••• 3513",
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-2xl border ${
                  selectedCard === index ? "bg-lime-300" : "bg-zinc-100"
                }`}
                onClick={() => handleCardSelect(index)}
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                  <div>
                    <p className="text-sm font-medium">{card.label}</p>
                    <p className="text-xs">{card.number}</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="card"
                  className="form-radio"
                  checked={selectedCard === index}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "CVV",
      content: (
        <div>
          <p className="mb-2 text-sm text-zinc-600">
            You will be charged <span className="font-semibold">${price}</span>{" "}
            upon successfully entering the CVV.
          </p>
          <input
            type="tel"
            placeholder="Enter CVV"
            className="mb-2 w-full outline-none rounded-xl border p-2"
            maxLength={3}
            value={cvv}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && value.length <= 3) {
                setCvv(value);
              }
            }}
          />
        </div>
      ),
    },
    {
      title: "Payment Successful",
      content: (
        <div>
          <p className="">
            Thank you for shopping with us! Your order has been successfully
            placed and will be shipped soon. You will receive a confirmation
            email shortly.
          </p>
        </div>
      ),
    },
  ];

  const handleSetActiveIndex = (newIndex) => {
    setDirection(newIndex > activePanelIndex ? 1 : -1);
    setActivePanelIndex(newIndex);
  };

  useEffect(() => {
    if (activePanelIndex < 0) setActivePanelIndex(0);
    if (activePanelIndex >= STEPS.length) setActivePanelIndex(STEPS.length - 1);
  }, [activePanelIndex]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-40 webkit-backdrop-blur">
      <div className="sm:w-[550px] w-full mx-2 overflow-hidden rounded-xl border border-zinc-950/10 bg-white">
        <TransitionPanel
          activeIndex={activePanelIndex}
          variants={{
            enter: (direction) => ({
              x: direction > 0 ? 364 : -364,
              opacity: 0,
              height: bounds.height > 0 ? bounds.height : "auto",
            }),
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
              height: bounds.height > 0 ? bounds.height : "auto",
            },
            exit: (direction) => ({
              zIndex: 0,
              x: direction < 0 ? 364 : -364,
              opacity: 0,
              position: "absolute",
              top: 0,
              width: "100%",
            }),
          }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          custom={direction}
        >
          {STEPS.map((step, index) => (
            <div key={index} className="px-4 pt-4" ref={ref}>
              <h3 className="mb-4 font-medium text-zinc-800">{step.title}</h3>
              <div className="text-zinc-600">{step.content}</div>
            </div>
          ))}
        </TransitionPanel>
        <div className="flex justify-between p-4">
          {activePanelIndex > 0 && activePanelIndex < STEPS.length - 1 ? (
            <Button onClick={() => handleSetActiveIndex(activePanelIndex - 1)}>
              Previous
            </Button>
          ) : (
            activePanelIndex === 0 && (
              <Button onClick={handleClose}>Close</Button>
            )
          )}
          {activePanelIndex === STEPS.length - 1 ? (
            <Button onClick={handleClose}>Close</Button>
          ) : (
            <Button
              onClick={handleNextClick}
              disabled={isLoading || !isNextBtnEnabled()}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                  <span className="ml-2">Verifying</span>
                </div>
              ) : (
                "Next"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
