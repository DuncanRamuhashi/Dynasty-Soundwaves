import React, { useEffect, useState } from 'react';
import {STATUS_CODES} from    '../constants.ts';
interface PaymentReport {
  _id: string;
  createdAt: string;
  updatedAt: string;
  userID: string;
  payments: Array<{
    fullAmount: number;
    // Add other payment fields if needed
  }>;
}

const Usereport = () => {
  const [payments, setPayments] = useState<PaymentReport[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 2;
  const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!storedUser?._id || !token) {
      console.log("Missing user ID or token");
      return;
    }

    const userID = storedUser._id;

    const getPayment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/payment/get-user-payment/${userID}/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Added token in headers
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Payment data:", data);

        // Assuming the API returns an array of payment reports
        setPayments(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error getting payments:", error);
        alert("An error occurred while fetching payments.");
        setPayments([]);
      }
    };

    getPayment();
  }, [storedUser?._id, token]);

  // Pagination logic
  const totalPages = Math.ceil(payments.length / reportsPerPage);
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = payments.slice(indexOfFirstReport, indexOfLastReport);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 text-center">
          Payment Reports
        </h2>

        {/* List of Reports */}
        <div className="space-y-6">
          {currentReports.length === 0 ? (
            <p className="text-gray-600 text-center">No payment reports available</p>
          ) : (
            currentReports.map((report) => (
              <div key={report._id} className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between text-gray-900 mb-2">
                  <span className="font-medium">Transaction ID:</span>
                  <span>{report._id}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between text-gray-900 mb-2">
                  <span className="font-medium">Date:</span>
                  <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between text-gray-900 mb-2">
                  <span className="font-medium">Amount:</span>
                  <span>
                    R {report.payments[0]?.fullAmount?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {payments.length > 0 && (
          <div className="flex justify-center space-x-4 mt-6">
            <button
              className={`px-4 py-2 rounded-lg text-white ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-600"
              }`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-200 rounded-lg text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 rounded-lg text-white ${
                currentPage === totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-600"
              }`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usereport;