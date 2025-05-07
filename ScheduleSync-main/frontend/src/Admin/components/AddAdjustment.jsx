// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// const AddAdjustment = () => {
//   const { state } = useLocation(); // Get passed leave data
//   const navigate = useNavigate();
//   const leave = state ? state.leave : null; // Ensure leave exists

//   const [adjustmentReason, setAdjustmentReason] = useState('');

//   useEffect(() => {
//     if (!leave) {
//       navigate('/dashboard'); // If no leave data is passed, navigate back to the dashboard
//     }
//   }, [leave, navigate]);

//   const handleSaveAdjustment = () => {
//     // Logic for saving adjustment data to the backend
//     console.log('Adjustment saved for:', leave.name);
//     console.log('Adjustment Reason:', adjustmentReason);
    
//     // Optionally, you can send this data to the backend here, e.g., via Axios.

//     // After saving, navigate back to the dashboard or another page
//     navigate('/dashboard');
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Adjust Leave for {leave?.name}</h2>

//       <div className="mb-4">
//         <label htmlFor="adjustmentReason" className="block text-sm font-medium text-gray-700">Adjustment Reason</label>
//         <textarea
//           id="adjustmentReason"
//           rows="4"
//           value={adjustmentReason}
//           onChange={(e) => setAdjustmentReason(e.target.value)}
//           className="mt-2 p-2 border rounded-lg w-full"
//           placeholder="Enter adjustment details"
//         />
//       </div>

//       <button
//         onClick={handleSaveAdjustment}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Save Adjustment
//       </button>
//     </div>
//   );
// };

// export default AddAdjustment;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddAdjustment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const leave = location.state?.leave;

  if (!leave) {
    return (
      <div className="p-4 text-red-500">
        ❌ No leave data provided.
        <button onClick={() => navigate(-1)} className="ml-4 text-blue-600 underline">Go back</button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Adjustment for {leave.name}</h1>
      <p>Reason: {leave.reason}</p>
      <p>Date: {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}</p>
      {/* Add your adjustment form here */}
    </div>
  );
};

export default AddAdjustment;
