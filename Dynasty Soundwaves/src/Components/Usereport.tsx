import React from 'react';

const Usereport = () => {
  // Sample reports data
  const reports = [
    {
      transactionId: 'TRX12345678',
      date: '2025-02-21',
      amount: 'R1,200.00',
      paymentMethod: 'Visa',
      status: 'Completed',
    },
    {
      transactionId: 'TRX87654321',
      date: '2025-02-20',
      amount: 'R500.00',
      paymentMethod: 'Mastercard',
      status: 'Failed',
    },
    {
      transactionId: 'TRX23456789',
      date: '2025-02-19',
      amount: 'R2,000.00',
      paymentMethod: 'Amex',
      status: 'Failed',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Payment Reports</h2>
        
        {/* List of Reports */}
        <div className="space-y-6">
          {reports.map((report, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between text-gray-900 mb-4">
                <span className="font-medium">Transaction ID:</span>
                <span>{report.transactionId}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-4">
                <span className="font-medium">Date:</span>
                <span>{report.date}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-4">
                <span className="font-medium">Amount:</span>
                <span>{report.amount}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-4">
                <span className="font-medium">Payment Method:</span>
                <span>{report.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-4">
                <span className="font-medium">Status:</span>
                <span className={report.status === 'Completed' ?  'text-yellow-500' : 'text-red-500'}>
                  {report.status}
                </span>
              </div>

             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Usereport;
