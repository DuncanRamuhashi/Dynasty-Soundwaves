import React, { useEffect, useState } from 'react';

interface Payment {
  userEmail: string;
  userName: string;
  songNames: string;
  amount: number;
}

const Payments: React.FC = () => {
  const payments = [
    { email: 'user1@example.com', name: 'John Doe', song: 'Melody Vibes', amount: 1500, date: '2025-02-21', method: 'Visa', status: 'Completed' },
    { email: 'user2@example.com', name: 'Jane Smith', song: 'Beats & Bass', amount: 800, date: '2025-02-20', method: 'Mastercard', status: 'Failed' },
    { email: 'user3@example.com', name: 'Mike Johnson', song: 'Chill Waves', amount: 2200, date: '2025-02-19', method: 'Amex', status: 'Pending' },
    { email: 'user4@example.com', name: 'Emily Davis', song: 'Urban Flow', amount: 950, date: '2025-02-18', method: 'PayPal', status: 'Completed' },
    { email: 'user5@example.com', name: 'Chris Brown', song: 'Groove Nation', amount: 3500, date: '2025-02-17', method: 'Visa', status: 'Completed' },
  ];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const paymentsPerPage = 2;

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

  const totalPages = Math.ceil(payments.length / paymentsPerPage);
  const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
  const token = sessionStorage.getItem("token");
  const [trans, setTrans] = useState<Payment[]>([]);

  useEffect(() => {
    if (!storedUser?._id || !token) return;
    let sellerID = storedUser._id;

    const getPAYMENT = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/payment/get-seller-payment/${sellerID}/${token}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log(data);
        setTrans(data.data || []);
      } catch (error) {
        console.error("Error getting payments:", error);
        alert("An error occurred while fetching payments.");
      }
    };

    getPAYMENT();
  }, [storedUser?._id, token]);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center  p-4 sm:p-6 md:p-8">
    <div className="bg-white shadow-lg rounded-lg w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center">Payment Transactions</h2>
  
      {/* List of Payments */}
      <div className="space-y-4 sm:space-y-6">
        {trans.map((payment, index) => (
          <div key={index} className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex justify-between text-gray-900 mb-2">
              <span className="font-medium">User Email:</span>
              <span>{payment.userEmail}</span>
            </div>
            <div className="flex justify-between text-gray-900 mb-2">
              <span className="font-medium">User Name:</span>
              <span>{payment.userName}</span>
            </div>
            <div className="flex justify-between text-gray-900 mb-2">
              <span className="font-medium">Song Names:</span>
              <span>{payment.songNames}</span>
            </div>
            <div className="flex justify-between text-gray-900 mb-2">
              <span className="font-medium">Amount:</span>
              <span>R {payment.amount}.00</span>
            </div>
          </div>
        ))}
      </div>
  
      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-4 sm:mt-6">
        <button
          className={`px-4 py-2 rounded-lg text-white ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-600'}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded-lg">Page {currentPage} of {totalPages}</span>
        <button
          className={`px-4 py-2 rounded-lg text-white ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-600'}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  </div>
  
  
  );
};

export default Payments;
