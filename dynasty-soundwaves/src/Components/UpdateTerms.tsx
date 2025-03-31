import { useEffect, useState } from "react";
import image from "../assets/pexels-rdne-7841424.jpg";
import { useNavigate } from "react-router-dom";
import {STATUS_CODES} from    '../constants.ts';
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
        const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/tsandcs/get-tsandcs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
         if(response.status === STATUS_CODES.NOT_FOUND){
              alert('nothing found');
         }else{
          const data = await response.json();
          if (data?.success) {
            setConditions(data.data.conditions);
            setTerms(data.data.terms);
          } else {
            alert(data.message || "Update failed, please try again.");
          }
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
      const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/tsandcs/update-tsandcs`, {
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
<div className="bg-gray-900 py-5 px-4 sm:px-6 md:px-12 min-h-screen flex justify-center items-center">
  <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
    <div className="flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="w-full md:w-1/3 p-4 bg-gray-200 flex justify-center">
        <img
          src={image}
          alt="Image"
          className="w-full h-auto max-h-80 object-contain rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-2/3 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Terms and Conditions
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-900 hover:bg-gray-700 px-4 py-1 rounded-md text-gray-100 text-sm sm:text-base"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Terms Section */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
            Terms
          </h2>
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

        {/* Conditions Section */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
            Conditions
          </h2>
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

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          {isEditing && (
            <button
              onClick={handleSave}
              className="bg-gray-900 hover:bg-gray-700 text-gray-100 px-6 py-2 rounded-md text-sm sm:text-base"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default UpdateTerms;
