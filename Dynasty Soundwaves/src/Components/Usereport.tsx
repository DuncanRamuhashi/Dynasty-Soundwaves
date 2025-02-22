import React, { useState } from 'react';

const Usereport = () => {
  const reports = [
    { transactionId: 'TRX12345678', date: '2025-02-21', amount: 'R1,200.00', paymentMethod: 'Visa', status: 'Completed' },
    { transactionId: 'TRX87654321', date: '2025-02-20', amount: 'R500.00', paymentMethod: 'Mastercard', status: 'Failed' },
    { transactionId: 'TRX23456789', date: '2025-02-19', amount: 'R2,000.00', paymentMethod: 'Amex', status: 'Failed' },
    { transactionId: 'TRX98765432', date: '2025-02-18', amount: 'R750.00', paymentMethod: 'PayPal', status: 'Completed' },
    { transactionId: 'TRX54321678', date: '2025-02-17', amount: 'R3,000.00', paymentMethod: 'Visa', status: 'Pending' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 2;

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  const totalPages = Math.ceil(reports.length / reportsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Payment Reports</h2>

        {/* List of Reports */}
        <div className="space-y-6">
          {currentReports.map((report, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Transaction ID:</span>
                <span>{report.transactionId}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Date:</span>
                <span>{report.date}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Amount:</span>
                <span>{report.amount}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Payment Method:</span>
                <span>{report.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Status:</span>
                <span className={report.status === 'Completed' ? 'text-green-500' : report.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}>
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-6">
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

export default Usereport;