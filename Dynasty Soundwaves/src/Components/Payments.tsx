import React, { useState } from 'react';

const Payments = () => {
  const payments = [
    { id: 'PAY123', date: '2025-02-21', amount: 'R1,500.00', method: 'Visa', status: 'Completed' },
    { id: 'PAY124', date: '2025-02-20', amount: 'R800.00', method: 'Mastercard', status: 'Failed' },
    { id: 'PAY125', date: '2025-02-19', amount: 'R2,200.00', method: 'Amex', status: 'Pending' },
    { id: 'PAY126', date: '2025-02-18', amount: 'R950.00', method: 'PayPal', status: 'Completed' },
    { id: 'PAY127', date: '2025-02-17', amount: 'R3,500.00', method: 'Visa', status: 'Completed' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 2;

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

  const totalPages = Math.ceil(payments.length / paymentsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Payment Transactions</h2>

        {/* List of Payments */}
        <div className="space-y-6">
          {currentPayments.map((payment, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Transaction ID:</span>
                <span>{payment.id}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Date:</span>
                <span>{payment.date}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Amount:</span>
                <span>{payment.amount}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Payment Method:</span>
                <span>{payment.method}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Status:</span>
                <span className={payment.status === 'Completed' ? 'text-green-500' : payment.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}>
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className={`px-4 py-2 rounded-lg text-white ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded-lg">Page {currentPage} of {totalPages}</span>
          <button
            className={`px-4 py-2 rounded-lg text-white ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
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