import React, { useEffect, useState } from 'react';

interface PaymentReport {
  _id: string;
  createdAt: string;
  fullAmount: number;
}

const Usereport = () => {
  const [payments, setPayments] = useState<PaymentReport[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 2;
  const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!storedUser?._id || !token) return;
    let userID = storedUser._id;

    const getPAYMENT = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/payment/get-user-payment/${userID}/${token}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const data = await response.json();
        setPayments(data.data.payments || []);
      } catch (error) {
        console.error("Error getting payments:", error);
        alert("An error occurred while fetching payments.");
      }
    };

    getPAYMENT();
  }, []);

  const totalPages = Math.ceil(payments.length / reportsPerPage);
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = payments.slice(indexOfFirstReport, indexOfLastReport);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Payment Reports
        </h2>

        {/* List of Reports */}
        <div className="space-y-6">
          {currentReports.map((report) => (
            <div key={report._id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Transaction ID:</span>
                <span>{report._id}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Date:</span>
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-gray-900 mb-2">
                <span className="font-medium">Amount:</span>
                <span>R {report.fullAmount}.00</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-600"
            }`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-600"
            }`}
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
