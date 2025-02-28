import React, { useEffect, useState } from "react";
import image from "../assets/pexels-rdne-7841424.jpg";
import { useNavigate } from "react-router-dom";

const UpdateTerms = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [terms, setTerms] = useState("");
  const [conditions, setConditions] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch Terms & Conditions
  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tsandcs/get-tsandcs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        if (data?.success) {
          setConditions(data.data.conditions);
          setTerms(data.data.terms);
        } else {
          alert(data.message || "Update failed, please try again.");
        }
      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
        alert("An error occurred. Please try again.");
      }
    };

    fetchTermsAndConditions();
  }, []);

  const proceedToPayment = () => {
    console.log("Proceeding to payment...");
  };

  // Handle saving updated terms & conditions
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tsandcs/update-tsandcs", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ terms, conditions }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Terms & Conditions updated successfully!");
        setIsEditing(false);
      } else {
        alert(data.message || "Update failed, please try again.");
      }
    } catch (error) {
      console.error("Error updating terms and conditions:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 py-5 px-6 md:px-12 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="w-[600px] p-6 bg-gray-200">
            <img src={image} alt="Image" className="h-full object-contain rounded-lg mb-4" />
          </div>
          <div className="md:w-3/4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Terms and Conditions</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gray-900 hover:bg-gray-500  px-4 py-1 rounded-md text-gray-100"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Terms</h2>
              {isEditing ? (
                <textarea
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="w-full h-32 p-2 border rounded-md text-gray-700"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{terms}</p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Conditions</h2>
              {isEditing ? (
                <textarea
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  className="w-full h-32 p-2 border rounded-md text-gray-700"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{conditions}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-gray-900 hover:bg-gray-500 text-gray-100 px-6 py-2 rounded-md  mr-4"
                >
                  Save
                </button>
              ) : (
                <>
     
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTerms;
