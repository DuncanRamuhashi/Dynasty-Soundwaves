import React, { useState } from 'react';

const Members = () => {
  const members = [
    { email: 'admin1@example.com', name: 'Alice Johnson', role: 'Super Admin', status: 'Active' },
    { email: 'admin2@example.com', name: 'Bob Smith', role: 'Moderator', status: 'Inactive' },
    { email: 'admin3@example.com', name: 'Charlie Brown', role: 'Editor', status: 'Active' },
    { email: 'admin4@example.com', name: 'Diana White', role: 'Admin', status: 'Pending' },
    { email: 'admin5@example.com', name: 'Edward Green', role: 'Moderator', status: 'Active' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 2;

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  const totalPages = Math.ceil(members.length / membersPerPage);

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center p-6">
      <div className="bg-gray-100 shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center"> Members</h2>

        {/* Table Format */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-900 text-gray-100">
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Verification</th>
              </tr>
            </thead>
            <tbody>
              {currentMembers.map((member, index) => (
                <tr key={index} className="text-center bg-white">
                  <td className="border border-gray-200 px-4 py-2">{member.email}</td>
                  <td className="border border-gray-200 px-4 py-2">{member.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{member.role}</td>
                  <td className={`border border-gray-200 px-4 py-2 ${member.status === 'Active' ? 'text-green-500' : member.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>{member.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <span className="px-4 py-2 bg-gray-100 rounded-lg">Page {currentPage} of {totalPages}</span>
          <button
            className={`px-4 py-2 rounded-lg text-white ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-500'}`}
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

export default Members;
