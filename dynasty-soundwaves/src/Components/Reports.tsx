import React, { useEffect } from "react";
import {STATUS_CODES} from    '../constants.ts';
const Reports = () => {
  useEffect(() => {
    const getReports = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/payment/get-all-payments/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Payments Data:", data);
      } catch (error) {
        console.error("Error getting cart:", error);
      }
    };

    getReports();
  }, []);

  return <div>Reports</div>;
};

export default Reports;
