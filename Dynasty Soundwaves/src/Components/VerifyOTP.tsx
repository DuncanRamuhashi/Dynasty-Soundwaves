import React, { useState } from 'react';

export const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setOtp(value);
  };

  const handleSubmit = () => {
    alert(`Entered OTP: ${otp}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={handleChange}
          className="w-48 h-12 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl tracking-widest"
        />
        <button 
          onClick={handleSubmit} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
