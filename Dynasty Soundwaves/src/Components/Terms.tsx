import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/pexels-rdne-7841424.jpg'
const Terms = () => {
  const navigate = useNavigate();
  const proceedToPayment = () => {
    // Navigate to 'terms' page after checkout
    navigate('/payment');
  };
  const [terms, setTerms] = useState(
    'By using our services, you agree to be bound by these Terms and Conditions. Services are provided "as is" without warranties of any kind. You must be at least 18 years of age to use our services. We reserve the right to modify or terminate the service at any time without prior notice. Payment is due upon acceptance of these terms, and all sales are final.'
  );
  const [conditions, setConditions] = useState(
    'Users are prohibited from reproducing, duplicating, or exploiting any portion of the service without express written permission. We are not liable for any damages arising from the use of our services. You agree to indemnify and hold us harmless from any claims arising from your use of the service. These terms are governed by the laws of the state of California.'
  );
  return (
    <div className="bg-gray-100 py-5 px-6 md:px-12 ">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="w-[600px]  p-6 bg-gray-200">
            <img 
              src={image} 
              alt="Image" 
              className=" h-full object-contain rounded-lg mb-4" 
            />
      
          </div>
          <div className="md:w-3/4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Terms and Conditions</h1>
   
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Terms</h2>
         
                <p className="text-gray-700 leading-relaxed">{terms}</p>
            
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Conditions</h2>
             
           
          
                <p className="text-gray-700 leading-relaxed">{conditions}</p>
            
            </div>

            <div className="mt-6 flex justify-end">
  
                <>
                  <button 
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 mr-4"
                  >
                    Decline
                  </button>
                  <button 
                    onClick={proceedToPayment} 
                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                  >
                    Accept
                  </button>
                </>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;