import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // Example cart items, you can fetch these from your state or props
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Beat Name", price: 29.99, license: "Standard", imageUrl: "https://via.placeholder.com/80" },
    { id: 2, name: "Another Beat", price: 49.99, license: "Exclusive", imageUrl: "https://via.placeholder.com/80" },
  ]);

  const navigate = useNavigate();

  const removeItem = (id:any) => {
    // Remove item from cart based on its id
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const proceedToCheckout = () => {
    // Navigate to 'terms' page after checkout
    navigate('/termsandconditions');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>

        {/* If Cart is Empty */}
        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.imageUrl}
                    alt="Product"
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">License Type: {item.license}</p>
                  </div>
                </div>

                {/* Price & Remove Button */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-bold text-gray-800">R{item.price}</p>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Checkout Section */}
        {cartItems.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-gray-800 text-lg font-semibold">
              <p>Total:</p>
              <p>R{cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
            </div>
            <button
              className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
              onClick={proceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
