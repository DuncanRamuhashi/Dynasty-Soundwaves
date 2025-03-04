import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  social?: {
    facebook?: string;
    instagram?: string;
    x?: string;
  };
  bio?: string;
  role?: "user" | "seller" | "admin";
  verifyOtp?: string;
  verifyOtpExpireAt?: number;
  isAccountVerified?: boolean;
  resetOtp?: string;
  resetOtpExpireAt?: number;
  timestamps?: boolean;
}

const Members = () => {
  const [members, setMembers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const membersPerPage = 10;
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user ) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const getMembers = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.BACKENDURL}/auth/users/${token}` , {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await response.json();
         console.log(data);
        if (data?.success) {
          setMembers(data.users);
        } else {
          alert(data.message || "Failed to fetch members");
        }
      } catch (error) {
        console.error("Error getting members:", error);
        alert("An error occurred while fetching members");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      getMembers();
    }
  }, []);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.max(1, Math.ceil(members.length / membersPerPage));

  return (
<div className="bg-gray-900 min-h-screen flex justify-center p-6">
  <div className="bg-gray-100 shadow-lg rounded-lg w-full max-w-4xl p-8">
    <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
      Members
    </h2>

    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-900 text-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Role</th>
            <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Verification</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center py-4">Loading...</td>
            </tr>
          ) : currentMembers.length > 0 ? (
            currentMembers.map((member) => (
              <tr key={member._id} className="text-center bg-white">
                <td className="border border-gray-200 px-4 py-2 text-sm sm:text-base">{member.email}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm sm:text-base">{member.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-sm sm:text-base">{member.role}</td>
                <td className={`border border-gray-200 px-4 py-2 text-sm sm:text-base ${member.isAccountVerified ? "text-green-500" : "text-red-500"}`}>
                  {member.isAccountVerified ? "Active" : "Pending"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border border-gray-200 px-4 py-2">
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {!isLoading && members.length > 0 && (
      <div className="flex flex-col sm:flex-row justify-center space-x-4 mt-6">
        <button
          className={`px-4 py-2 rounded-lg text-white ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-500"}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm sm:text-base">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded-lg text-white ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-500"}`}
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

export default Members;