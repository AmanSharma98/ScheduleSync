// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminNav from "./AdminNav"; // ✅ Corrected import
// import { useNavigate } from "react-router-dom";
// import useApi from "../../hooks/useApi";
// const Admindashboard = () => {
//   const [onLeaveFaculty, setOnLeaveFaculty] = useState([]);
//   const { get } = useApi();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchOnLeaveFaculty();
//   }, []);

//   const fetchOnLeaveFaculty = async () => {
//     try {
//       const res = await get("/leaves");
//       console.log(res);
//       const today = new Date();

//       const filtered = res.filter((leave) => {
//         const fromDate = new Date(leave.fromDate);
//         const toDate = new Date(leave.toDate);
//         return toDate >= today && leave.status === "Approved";
//       });

//       console.log(filtered);
//       setOnLeaveFaculty(filtered);
//     } catch (err) {
//       console.error("Error fetching leaves:", err);
//     }
//   };

//   const handleAddAdjustment = (leave) => {
//     navigate("/addadjustment", { state: { leave } });
//   };

//   return (
//     <div className="relative flex flex-col h-full overflow-x-hidden overflow-y-auto">
//       <AdminNav />
//       <main className="flex-1 bg-white min-w-[1148px] max-h-[943px]">
//         <div className="flex justify-between gap-2 p-4">
//           {/* Optionally add cards here */}
//         </div>
//         <div className="p-4">
//           <h1 id="font" className="text-3xl font-semibold mb-4">
//             On Leave Faculty
//           </h1>
//           {onLeaveFaculty.length === 0 ? (
//             <p className="text-gray-600">No faculty on leave today.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {onLeaveFaculty.map((leave) => (
//                 <div
//                   className="bg-white border rounded-lg p-4 min-w-[367px] max-h-[170px]"
//                   key={leave._id}
//                 >
//                   <div className="flex items-center">
//                     <span className="text-green-600 text-xl">●</span>
//                     <h2 className="text-lg ml-2">{leave.name}</h2>
//                   </div>
//                   <p className="text-gray-600 mt-1 flex items-center">
//                     Leave from: {new Date(leave.fromDate).toLocaleDateString()}{" "}
//                     - {new Date(leave.toDate).toLocaleDateString()}
//                   </p>
//                   <p className="text-gray-600 flex items-center">
//                     Reason: {leave.reason}
//                   </p>
//                   <p className="text-gray-600 flex items-center">
//                     Subject: {leave.subject}({leave.coursecode})
//                   </p>
//                   <hr class="w-auto mt-2 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
//                   <div
//                     className="ml-13 mt-2"
//                     onClick={() => navigate("/admin/add-adjustment")}
//                   >
//                     <button className="bg-purple-600 text-white w-60 border-1 border:text-gray-100 rounded-md">
//                       + Add Adjustment
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div>
//           <h1 id="font" className="text-3xl font-semibold mb-4 ml-4 mt-8">Batch TimeTable</h1>



//         </div>
//       </main>
//     </div>
//   );
// };

// export default Admindashboard;


import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";

// Reusable card component
const InfoCard = ({ icon, label, value, color, bg }) => (
  <div className="flex flex-1 items-center border rounded-lg p-4 bg-white min-w-[352px] max-h-[108px]">
    <img src={icon} alt="" className={`${bg} text-white p-3 rounded-full`} />
    <div className="ml-4">
      <span className="text-2xl font-bold" style={{ color }}>{value}</span>
      <br />
      <span className="text-sm" style={{ color }}>{label}</span>
    </div>
  </div>
);

const Admindashboard = () => {
  const [onLeaveFaculty, setOnLeaveFaculty] = useState([]);
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [lecturesDone, setLecturesDone] = useState(0);
  const [lecturesLeft, setLecturesLeft] = useState(0);
  const [doneLectureIds, setDoneLectureIds] = useState([]);
  const [approvedLeaveCount, setApprovedLeaveCount] = useState(0);

  const { get } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOnLeaveFaculty();
    const storedDone = JSON.parse(localStorage.getItem("adminDoneLectureIds")) || [];
    setDoneLectureIds(storedDone);
    setLecturesDone(storedDone.length);
  }, []);

  useEffect(() => {
    fetchTodaySchedules();
  }, [doneLectureIds]);

  const fetchOnLeaveFaculty = async () => {
    try {
      const res = await get("/leaves");
      const today = new Date();
      const filtered = res.filter((leave) => {
        const fromDate = new Date(leave.fromDate);
        const toDate = new Date(leave.toDate);
        return toDate >= today && leave.status === "Approved";
      });
      setOnLeaveFaculty(filtered);
      setApprovedLeaveCount(filtered.length);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  const fetchTodaySchedules = async () => {
    try {
      const res = await get("/schedules");
      const weekday = new Date().toLocaleString("en-US", { weekday: "short" });
      const filtered = res.filter(schedule =>
        schedule.day === weekday && !doneLectureIds.includes(schedule._id)
      );
      setTodaySchedules(filtered);
      setLecturesLeft(filtered.length);
      localStorage.setItem("adminTodayLectureCount", filtered.length);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const handleDone = (id) => {
    const updatedDone = [...doneLectureIds, id];
    setDoneLectureIds(updatedDone);
    setLecturesDone(updatedDone.length);
    setLecturesLeft(prev => prev - 1);
    setTodaySchedules(prev => prev.filter(s => s._id !== id));
    localStorage.setItem("adminDoneLectureIds", JSON.stringify(updatedDone));
  };

  return (
    <div className="relative flex flex-col h-full overflow-x-hidden overflow-y-auto">
      <AdminNav />
      <main className="flex-1 bg-white min-w-[1148px] max-h-[943px]">

        {/* Top Cards */}
        <div className="flex justify-between gap-2 p-4 w-full">
          <InfoCard icon="/assets/calendar.svg" label="Total Lectures" value={lecturesDone + lecturesLeft} color="#006FD5" bg="bg-blue-300" />
          <InfoCard icon="/assets/mdi-light--clock.svg" label="Lectures Left" value={lecturesLeft} color="#372980" bg="bg-purple-300" />
          <InfoCard icon="/assets/copy-success.svg" label="Lectures Done" value={lecturesDone} color="#03781D" bg="bg-green-300" />
          {/* <InfoCard icon="/assets/leave-icon.svg" label="Approved Leaves" value={approvedLeaveCount} color="#D97706" bg="bg-yellow-200" /> */}
        </div>

        {/* On Leave Faculty */}
        <div className="p-4">
          <h1 id="font" className="text-3xl font-semibold mb-4">
            On Leave Faculty
          </h1>
          {onLeaveFaculty.length === 0 ? (
            <p className="text-gray-600">No faculty on leave today.</p>
          ) : (
            <div className="flex align-center gap-4 w-full overflow-x-auto scrollbar-hide">
              {onLeaveFaculty.map((leave) => (
                <div
                  className="bg-white border rounded-lg p-4 min-w-[367px] max-h-fit"
                  key={leave._id}
                >
                  <div className="flex items-center">
                    <span className="text-green-600 text-xl">●</span>
                    <h2 className="text-lg ml-2">{leave.name}</h2>
                  </div>
                  <p className="text-gray-600 mt-1 flex items-center">
                    Leave from: {new Date(leave.fromDate).toLocaleDateString()}{" "}
                    - {new Date(leave.toDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    Reason: {leave.reason}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    Subject: {leave.subject} ({leave.coursecode})
                  </p>
                  <hr className="w-auto mt-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
                  <div
                    className="ml-13 mt-2"
                    onClick={() => navigate("/admin/add-adjustment")}
                  >
                    <button className="bg-purple-600 text-white py-2 w-60 border-1 border:text-gray-100 rounded-md">
                      + Add Adjustment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        
      </main>
    </div>
  );
};

export default Admindashboard;
