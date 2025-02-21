import React from 'react';
import { useNavigate } from 'react-router-dom';
const Terms = () => {
  const navigate = useNavigate();
  const proceedToPayment = () => {
    // Navigate to 'terms' page after checkout
    navigate('/payment');
  };

  return (
    <div className="bg-gray-100 py-12 px-6 md:px-12 lg:px-24"> {/* Increased padding, background color */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"> {/* Added max-width, margin, background, shadow, rounded corners, overflow hidden */}
        <div className="md:flex"> {/* Flexbox for layout on medium screens and up */}
          <div className="md:w-1/4 p-6 bg-gray-200"> {/* Image/Title section styling */}
            <img src="" alt="Image" className="w-full h-48 object-cover rounded-lg mb-4" /> {/* Adjusted image height, added margin */}
            <p className="text-lg font-semibold text-gray-900 mb-2">Title</p> {/* Added margin */}
            <p className="text-sm text-gray-600">Artist Name</p>
          </div>
          <div className="md:w-3/4 p-6"> {/* Terms/Conditions section styling */}
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Terms and Conditions</h1>

            <div className="mb-6"> {/* Added margin between sections */}
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Terms</h2> {/* Changed to h2 for semantic correctness */}
              <p className="text-gray-700 leading-relaxed"> {/* Added leading-relaxed for better readability */}
                fsfsdfsdfsdnfosdnfosdfnskodnfkosdnfsodkfnosdnfkosdnfksdnfkosdnfkosdnkfnsdonfksdonfkosdfnsdkonfsdkfnsdkfnkosdnfksdnfkosdnfkosdnfkosdnfksdnfkonsdkofnsdofnkosdnfosfnskfns
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Conditions</h2> {/* Changed to h2 */}
              <p className="text-gray-700 leading-relaxed"> {/* Added leading-relaxed */}
                sfnsdfosdnfonsdofnsdofnsdonfsdnfkosdfnkosdnfkosdnfksdnfksnfkosdnfkosdnfkosdnfksdnfksdfnsdkfnsdkfnkosdfnosdknfskdfnsd
              </p>
            </div>

            <div className="mt-6 flex justify-end"> {/* Aligned buttons to the right */}
              <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 mr-4"> {/* Added margin between buttons */}
                Decline
              </button>
              <button onClick={proceedToPayment} className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;