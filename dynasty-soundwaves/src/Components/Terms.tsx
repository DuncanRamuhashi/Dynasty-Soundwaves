import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/pexels-rdne-7841424.jpg';
import {STATUS_CODES} from    '../constants.ts';
const Terms = () => {
  const navigate = useNavigate();

  const [terms, setTerms] = useState('');
  const [conditions, setConditions] = useState('');

  // Fetch Terms & Conditions
  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/tsandcs/get-tsandcs`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
         if(response.status === STATUS_CODES.NOT_FOUND){
           alert('Nothing found');
         }else{
          const data = await response.json();
          if (data?.success) {
            setConditions(data.data?.conditions || 'Default conditions text.');
            setTerms(data.data?.terms || 'Default terms text.');
          } else {
            alert(data.message || "Failed to load terms and conditions.");
          }
         }

      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
        alert("An error occurred. Please try again.");
      }
    };

    fetchTermsAndConditions();
  }, []);

  const proceedToPayment = () => navigate('/payment');
  const dontProceedToPayment = () => navigate('/home');
  return (
    <div className="bg-gray-100 py-5 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="w-[600px] p-6 bg-gray-200">
            <img src={image} alt="Image" className="h-full w-full object-cover rounded-lg" />
          </div>
          <div className="md:w-3/4 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Terms</h2>
              <p className="text-gray-700 leading-relaxed">{terms}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Conditions</h2>
              <p className="text-gray-700 leading-relaxed">{conditions}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={dontProceedToPayment} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 mr-4">
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
