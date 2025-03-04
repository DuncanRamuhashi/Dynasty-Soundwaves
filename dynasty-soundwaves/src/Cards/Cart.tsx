import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  license: string;
  image: string;
  sellerID: string

}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const storedUser = JSON.parse(sessionStorage.getItem('user') || 'null');

  useEffect(() => {
    const loadCartItems = () => {
      try {
        setIsLoading(true);
        const storedMusic = sessionStorage.getItem("music");
        const musicData = storedMusic ? JSON.parse(storedMusic) : [];
        const storedCartMusic = sessionStorage.getItem("musicIDDS");
        const musicIDList = storedCartMusic ? JSON.parse(storedCartMusic) : [];
  
        if (Array.isArray(musicData) && Array.isArray(musicIDList)) {
          // Filter musicData based on the musicIDList
          const filteredMusic = musicData.filter((musicItem) =>
            musicIDList.includes(musicItem._id)
          );
          
          setCartItems(filteredMusic);
           navigate('/cart');
           
           
        } else {
          throw new Error("Invalid cart data format");
        }
      } catch (err) {
        console.error("Error loading cart items:", err);
        setError("Failed to load cart items");
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadCartItems();
  }, []);
  

  const removeItem = async (id: string) => {
    try {
      const updatedCart = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedCart);
      sessionStorage.setItem("music", JSON.stringify(updatedCart));

      if (storedUser?._id) {
        const response = await fetch(
          `http://localhost:5000/api/cart/remove-from-cart/${storedUser._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ musicID: id }),
          }
        );

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || "Failed to remove item from server");
        }
      }
    } catch (err) {
      console.error("Error removing item:", err);

      const storedMusic = sessionStorage.getItem("music");
      if (storedMusic) setCartItems(JSON.parse(storedMusic));
      setError("Failed to remove item");
    }
  };

  const calculateTotal = () => {
    navigate('/cart');
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const proceedToCheckout = () => {
    sessionStorage.setItem('buyItems',JSON.stringify(cartItems));
    navigate("/termsandconditions");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 rounded-md object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/fallback-image.jpg";
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <p className="text-lg font-bold text-gray-800">
                      R{item.price.toFixed(2)}
                    </p>
                    <button
                      className="text-red-600 hover:text-red-800 transition-colors"
                      onClick={() => removeItem(item._id)}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-gray-800 text-lg font-semibold">
                <p>Total:</p>
                <p>R{calculateTotal()}</p>
              </div>
              <button
                className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors disabled:bg-gray-400"
                onClick={proceedToCheckout}
                disabled={!storedUser}
              >
                Proceed to Checkout
              </button>
              {!storedUser && (
                <p className="text-sm text-red-600 mt-2 text-center">
                  Please log in to proceed to checkout
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
