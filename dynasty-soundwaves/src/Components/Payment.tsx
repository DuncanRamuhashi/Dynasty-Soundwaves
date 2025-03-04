import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";

// Define types
interface User {
  _id: string;
}

interface CartItem {
  _id: string;
  price: number;
  sellerID: string;
}

const Payment: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [securityCode, setSecurityCode] = useState<string>("");

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  // Safely retrieve session storage data
  const getSessionData = <T,>(key: string): T | null => {
    try {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error parsing session data for ${key}:`, error);
      return null;
    }
  };

  const storedUser: User | null = getSessionData<User>("user");
  const cart: CartItem[] | null = getSessionData<CartItem[]>("buyItems");

  const handlePayment = async () => {
    if (!storedUser || !cart || cart.length === 0) {
      alert("User or cart data is missing.");
      return;
    }
    
    const musicIDs = cart.map((item) => item._id);
    const fullAmount = cart.reduce((total, item) => total + item.price, 0);
    const sellerID = cart[0]?.sellerID;
  const  cartID  =  sessionStorage.getItem('cartID');
  console.log(cartID);
    try {
      const response = await fetch(`${import.meta.env.BACKENDURL}/payment/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: storedUser._id, sellerID, fullAmount, musicIDs,token,cartID }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Payment successful! Your music is now downloadable.");
        navigate("/usereport");
      } else {
        alert(data.message || "Payment failed.");
      }
    } catch (error) {
      console.error("Error in payment:", error);
      alert("An error occurred while processing payment.");
    }
  };

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">Payment</h2>

        <div className="mb-6">
          <label htmlFor="card" className="block text-gray-900 font-medium mb-2">
            Card Information
          </label>
          <input
            type="text"
            id="card"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 mb-4"
            placeholder="Card Number"
          />

          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-1/2 border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="MM/YY"
            />
            <input
              type="text"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
              className="w-1/2 border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="CVC"
            />
          </div>

          <div className="flex flex-col gap-5 justify-between mb-6">
            <div className="flex space-x-4 justify-center">
              <FaCcVisa className="text-3xl text-blue-500" />
              <FaCcMastercard className="text-3xl text-red-500" />
              <FaCcAmex className="text-3xl text-gray-500" />
              <FaCcDiscover className="text-3xl text-orange-500" />
            </div>
            <button
              onClick={handlePayment}
              className="bg-gray-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
