import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useApi from '../../hooks/useApi';

const AdminLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLeaves(prevLeaves =>
        prevLeaves?.filter(leave => new Date(leave.toDate) >= now)
      );
    }, 60 * 1000); // check every 1 minute

    return () => clearInterval(interval);
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const res = await get('/leaves');
      const now = new Date();
      const validLeaves = res.filter(leave => new Date(leave.toDate) >= now);
      setLeaves(validLeaves);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leave requests:', err);
    }
  };

  const handleStatusChange = async (id, status, comment = '') => {
    try {
      await axios.patch(`http://localhost:3939/api/leaves/${id}`, {
        status,
        adminComment: comment
      });
      fetchLeaveRequests(); // Refresh the list
    } catch (err) {
      console.error('Error updating leave status:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Leave Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {leaves.length === 0 ? (
            <p>No active leave requests.</p>
          ) : (
            leaves.map(leave => (
              <div key={leave._id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Name: {leave.name}</h3>
                    <p className="text-gray-600">Reason: {leave.reason}</p>
                    <p className="text-gray-600">Subject: {leave.subject}</p>
                    <p className="text-gray-600">Coursecode: {leave.coursecode}</p>
                    <p className="text-sm">
                      Leave from: {new Date(leave.fromDate).toLocaleDateString()} -{' '}
                      {new Date(leave.toDate).toLocaleDateString()}                    
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      leave.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : leave.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>

                {leave.status === 'Pending' && (
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(leave._id, 'Approved')}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        const comment = prompt('Enter rejection reason:');
                        if (comment) handleStatusChange(leave._id, 'Rejected', comment);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {leave.adminComment && (
                  <div className="mt-2 p-2 bg-gray-50 rounded">
                    <p className="text-sm font-medium">Admin Comment:</p>
                    <p className="text-sm">{leave.adminComment}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminLeaveRequests;
