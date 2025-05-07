import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useApi from "../../hooks/useApi";
const Leave = () => {
  const [formData, setFormData] = useState({
    name: '',
    reason: '',
    fromDate: '',
    toDate: '',
    subject:'',
    coursecode:'',
  });
  const { get, post } = useApi();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch logged-in user and leave data on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData((prev) => ({
        ...prev,
        name: user.name || ''
      }));
    }
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const res = await get('/leaves');
      setLeaveRequests(res);
    } catch (err) {
      console.error('Error fetching leave requests:', err);
      toast.error('Failed to load leave requests');
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (new Date(formData.toDate) < new Date(formData.fromDate)) {
      toast.error('End date cannot be before start date');
      setIsSubmitting(false);
      return;
    }

    try {
      await post('/leaves', formData);
      toast.success('Leave request submitted successfully!');
      setFormData((prev) => ({
        ...prev,
        reason: '',
        fromDate: '',
        toDate: ''
      }));
      fetchLeaveRequests();
    } catch (err) {
      console.error('Error submitting leave request:', err);
      toast.error(err.response?.data?.message || 'Failed to submit leave request');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter by user's own requests
  const userLeaveRequests = leaveRequests?.filter(
    (leave) => leave.name.toLowerCase().trim() === formData.name.toLowerCase().trim()
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 p-6 overflow-y-auto">
      <ToastContainer />
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Apply for Leave</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="reason"
            placeholder="Reason for Leave"
            className="border border-gray-300 p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows="3"
            value={formData.reason}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              name="fromDate"
              className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.fromDate}
              onChange={handleChange}
              required
            />
            
            <input
              type="date"
              name="toDate"
              className="border border-gray-300 p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={formData.toDate}
              onChange={handleChange}
              required
            />

<input
            type="text"
            name="subject"
            placeholder="Subject"
            className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.subject}
            onChange={handleChange}
            required
          />

<input
            type="text"
            name="coursecode"
            placeholder="Couse-code"
            className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.coursecode}
            onChange={handleChange}
            required
          />
                  </div>
            

                <button
            type="submit"
            className={`bg-indigo-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Leave'}
          </button>
        </form>

        <h3 className="text-2xl font-semibold mt-12 mb-4 text-gray-700">Your Leave Requests</h3>
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner max-h-80 overflow-y-auto">
          {userLeaveRequests?.length === 0 ? (
            <p className="text-gray-500">No leave requests submitted yet.</p>
          ) : (
            <ul className="space-y-4">
              {userLeaveRequests?.map((leave, idx) => (
                <li key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <p><strong>Name:</strong> {leave.name}</p>
                  <p><strong>Reason:</strong> {leave.reason}</p>
                  <p><strong>From:</strong> {new Date(leave.fromDate).toLocaleDateString()}</p>
                  <p><strong>To:</strong> {new Date(leave.toDate).toLocaleDateString()}</p>
                  <p><strong> Subject:</strong> {leave.subject}</p>
                  <p><strong>Coursecode:</strong> {leave.coursecode}</p>
                  {leave.status && (
                    <p><strong>Status:</strong> {leave.status}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leave;
