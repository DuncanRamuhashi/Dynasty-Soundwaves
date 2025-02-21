import React from 'react';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from 'react-icons/fa'; // Import icons

const Payment = () => {
  return (
    <div className="bg-gray-900  h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">Payment</h2>

        <div className="mb-6">
          <label htmlFor="card" className="block text-gray-900 font-medium mb-2">Card Information</label>
          <input
            type="text"
            id="card"
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 mb-4"
            placeholder="Card Number"
          />

          <div className="flex space-x-4 mb-6">
            <input
              type="text"
              className="w-1/2 border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="MM/YY"
            />
            <input
              type="text"
              className="w-1/2 border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="CVC"
            />
          </div>

          <div className="flex flex-col  gap-5 justify-between mb-6 ">
            <div className="flex space-x-4 justify-center">
              <FaCcVisa className="text-3xl text-blue-500" />
              <FaCcMastercard className="text-3xl text-red-500" />
              <FaCcAmex className="text-3xl text-gray-500" />
              <FaCcDiscover className="text-3xl text-orange-500" />
            </div>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900">
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
