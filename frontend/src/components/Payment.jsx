import React from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Payments = ({ amount }) => {
  const { cartItems, clearCart } = useCart();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
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
      toast.info("Razorpay SDK failed to load.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const userId = user?._id;

    if (!userId || !token) {
      toast.error("You need to be logged in to make a payment.");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Replace with your Razorpay Test Key
      amount: amount * 100, // in paise
      currency: "INR",
      name: "VedPath",
      description: "Cart Payment",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXf0pu3oq1WictEC1Jg0xellFM1t3HyzX1rQ&s",
      handler: async function (response) {
        toast.success("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);

        // Save order to backend
        try {
          const res = await axios.post(
            `${API_URL}/order/add-order`,
            {
              userId,
              name: user.name,
              totalAmount: amount,
              paymentId: response.razorpay_payment_id, // store payment id
              paymentStatus: "paid", // mark as paid
              items: cartItems.map((item) => ({
                productId: item._id,
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
        } catch (error) {
          console.error("❌ Failed to save order:", error.message);
          toast.error("Failed to save your order. Contact support.");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9000000000",
      },
      theme: { color: "#462e28ff" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      className="btn mt-3"
      onClick={handlePayment}
      style={{ backgroundColor: "#CEAC5E" }}
      disabled={amount === 0}
    >
      Pay Now ₹{amount}
    </button>
  );
};

export default Payments;
