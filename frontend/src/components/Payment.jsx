import React from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Payments = ({ amount }) => {
  const { cartItems, clearCart } = useCart();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(true));
        existing.addEventListener('error', () => resolve(false));
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      user = null;
    }
    const token = localStorage.getItem("token");
    const userId = user?._id || user?.id;

    if (!userId || !token) {
      toast.error("You need to be logged in to make a payment.");
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag";

    const saveOrderToDB = async (paymentId, isDemo = false) => {
      try {
        const res = await axios.post(
          `${API_URL}/order/add-order`,
          {
            userId,
            name: user.name || "Customer",
            totalAmount: amount,
            paymentId: paymentId,
            paymentStatus: "paid",
            items: cartItems.map((item) => ({
              productId: item.productId || item._id,
              title: item.title,
              quantity: item.quantity,
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json" 
            },
          }
        );

        console.log("✅ Order saved to DB:", res.data);
        clearCart();
        toast.success(isDemo ? "✅ Demo Order Placed Successfully!" : "✅ Payment Successful! Order Placed.");
      } catch (error) {
        console.error("❌ Failed to save order:", error.message);
        toast.error("Failed to save your order. Contact support.");
      }
    };

    const options = {
      key: razorpayKey,
      amount: Math.round(amount * 100), // in paise
      currency: "INR",
      name: "VedPath",
      description: "Cart Payment",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXf0pu3oq1WictEC1Jg0xellFM1t3HyzX1rQ&s",
      handler: async function (response) {
        await saveOrderToDB(response.razorpay_payment_id);
      },
      prefill: {
        name: user.name || "",
        email: user.email || "",
        contact: "9000000000",
      },
      theme: { color: "#d4af37" },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        toast.error(response.error?.description || "Payment failed or cancelled");
      });
      rzp.open();
    } catch (err) {
      console.error("Razorpay initialization error:", err);
      toast.error("Could not open Razorpay checkout: " + err.message);
    }
  };

  const handleDemoPayment = async () => {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      user = null;
    }
    const token = localStorage.getItem("token");
    const userId = user?._id || user?.id;

    if (!userId || !token) {
      toast.error("You need to be logged in to make a payment.");
      return;
    }

    const demoPaymentId = "pay_demo_" + Date.now();
    try {
      await axios.post(
        `${API_URL}/order/add-order`,
        {
          userId,
          name: user.name || "Customer",
          totalAmount: amount,
          paymentId: demoPaymentId,
          paymentStatus: "paid",
          items: cartItems.map((item) => ({
            productId: item.productId || item._id,
            title: item.title,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" 
          },
        }
      );
      clearCart();
      toast.success("🎉 Demo Order placed! Check My Orders in My Account.");
    } catch (error) {
      console.error(" Failed to save demo order:", error.message);
      toast.error("Failed to save order to database.");
    }
  };

  return (
    <div className="d-flex flex-wrap gap-2 justify-content-end align-items-center mt-3">
      <button
        className="btn-gold-outline py-2 px-3 fw-semibold"
        onClick={handleDemoPayment}
        style={{ borderRadius: '10px', fontSize: '0.9rem' }}
        disabled={amount === 0}
        title="Test placing an order instantly without Razorpay account"
      >
       Test / Demo Pay ₹{amount}
      </button>

      <button
        className="btn-gold py-2 px-4 fw-bold font-cinzel"
        onClick={handlePayment}
        style={{ borderRadius: '10px', fontSize: '1rem', letterSpacing: '0.5px' }}
        disabled={amount === 0}
      >
        Pay with Razorpay ₹{amount}
      </button>
    </div>
  );
};

export default Payments;
