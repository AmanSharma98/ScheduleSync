// import React, { useState, useEffect } from "react";
// import useApi from '../../hooks/useApi';

// const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const TimeTable = ({ schedules }) => {
//   const getLectureForCell = (day, lectureNum) => {
//     const match = schedules.find(
//       (s) => s.day === day && s.lecture === lectureNum + 1
//     );

//     if (!match) return null;

//     return (
//       <div className="space-y-1">
//         <div className="font-semibold">{match.subject}</div>
//         <div className="text-xs text-gray-600">
//           {match.startTime} - {match.endTime}
//         </div>
//         <div className="text-xs text-gray-500">Room {match.venue}</div>
//       </div>
//     );
//   };

//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="min-w-full border border-gray-300 text-sm text-center">
//         <thead>
//           <tr className="bg-gray-100 text-gray-700">
//             <th className="border p-2">Day / Time</th>
//             {Array.from({ length: 8 }, (_, i) => (
//               <th key={i} className="border p-2">
//                 {i + 1}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {weekdays.map((day) => (
//             <tr key={day}>
//               <td className="border bg-gray-100 font-semibold p-2">{day}</td>
//               {Array.from({ length: 8 }, (_, i) => (
//                 <td key={i} className="border p-2 align-top h-28 w-32">
//                   {getLectureForCell(day, i)}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// function Calendar() {
//   const { get, post, loading, error } = useApi();
//   const [timetableData, setTimetableData] = useState([]);
//   const [formData, setFormData] = useState({
//     day: "Mon",
//     lecture: 1,
//     startTime: "",
//     endTime: "",
//     subject: "",
//     location: "",
//     semester: "1", // default semester
//   });

//   const fetchScheules = async () => {
//     try {
//       const data = await get("/schedules");
//       if (data) {
//         console.log("Fetched schedules:", data);
//         setTimetableData(data);
//       }
//     } catch (error) {
//       console.error("Error fetching schedules:", error);
//     }
//   };

//   useEffect(() => {
//     fetchScheules();
//   }, []);

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const {
//       day = "Mon",
//       lecture = 1,
//       startTime,
//       endTime,
//       subject,
//       location,
//       semester = "1",
//     } = formData;

//     const body = {
//       day,
//       lecture,
//       startTime,
//       endTime,
//       subject,
//       venue: location,
//       semester: parseInt(semester), // save semester as number
//     };

//     const data = await post("/schedules/add", body);

//     if (data && data.schedule) {
//       console.log("Schedule added successfully:", data.schedule);
//     }

//     setFormData({
//       day: "Mon",
//       lecture: 1,
//       startTime: "",
//       endTime: "",
//       subject: "",
//       location: "",
//       semester, // retain selected semester
//     });

//     fetchScheules();
//   };

//   return (
//     <div className="flex-1 flex flex-col p-6 overflow-auto">
//       <h1 className="text-2xl font-semibold text-center mb-6">Time Table</h1>

//       <form className="flex flex-wrap gap-4 justify-center items-center mb-6">
//         <select
//           id="day"
//           required
//           className="border p-2 rounded"
//           value={formData.day}
//           onChange={handleInputChange}
//         >
//           <option value="Mon">Monday</option>
//           <option value="Tue">Tuesday</option>
//           <option value="Wed">Wednesday</option>
//           <option value="Thu">Thursday</option>
//           <option value="Fri">Friday</option>
//           <option value="Sat">Saturday</option>
//         </select>

//         <select
//           id="lecture"
//           required
//           className="border p-2 rounded"
//           value={formData.lecture}
//           onChange={handleInputChange}
//         >
//           {Array.from({ length: 8 }, (_, i) => (
//             <option key={i + 1} value={i + 1}>
//               {i + 1}
//             </option>
//           ))}
//         </select>

//         <select
//           id="semester"
//           required
//           className="border p-2 rounded"
//           value={formData.semester}
//           onChange={handleInputChange}
//         >
//           {Array.from({ length: 8 }, (_, i) => (
//             <option key={i + 1} value={i + 1}>
//               Semester {i + 1}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           id="startTime"
//           placeholder="Start Time (e.g. 9:30 AM)"
//           required
//           className="border p-2 rounded"
//           value={formData.startTime}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           id="endTime"
//           placeholder="End Time (e.g. 12:30 PM)"
//           required
//           className="border p-2 rounded"
//           value={formData.endTime}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           id="subject"
//           placeholder="Subject"
//           required
//           className="border p-2 rounded"
//           value={formData.subject}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           id="location"
//           placeholder="Location"
//           required
//           className="border p-2 rounded"
//           value={formData.location}
//           onChange={handleInputChange}
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           onClick={handleSubmit}
//         >
//           Add Entry
//         </button>
//       </form>

//       <TimeTable schedules={timetableData} />
//     </div>
//   );
// }

// export default Calendar;


import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TimeTable = ({ schedules }) => {
  const getLectureForCell = (day, lectureNum) => {
    const match = schedules.find(
      (s) => s.day === day && s.lecture === lectureNum + 1
    );

    if (!match) return null;

    return (
      <div className="space-y-1">
        <div className="font-semibold">{match.subject}</div>
        <div className="text-xs text-gray-600">
          {match.startTime} - {match.endTime}
        </div>
        <div className="text-xs text-gray-500">Room {match.venue}</div>
        <div className="text-xs text-gray-500">Semester {match.semester}</div> {/* ✅ Added */}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 text-sm text-center">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border p-2">Day / Time</th>
            {Array.from({ length: 8 }, (_, i) => (
              <th key={i} className="border p-2">
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekdays.map((day) => (
            <tr key={day}>
              <td className="border bg-gray-100 font-semibold p-2">{day}</td>
              {Array.from({ length: 8 }, (_, i) => (
                <td key={i} className="border p-2 align-top h-28 w-32">
                  {getLectureForCell(day, i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function Calendar() {
  const { get, post } = useApi();
  const [timetableData, setTimetableData] = useState([]);
  const [formData, setFormData] = useState({
    day: "Mon",
    lecture: 1,
    startTime: "",
    endTime: "",
    subject: "",
    location: "",
    semester: "1", // default semester
  });

  const fetchSchedules = async () => {
    try {
      const semester = formData.semester || "1";
      const data = await get(`/schedules`);
      if (data) {
        console.log("Fetched schedules:", data);
        setTimetableData(data);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [formData.semester]); // re-fetch when semester changes

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      day,
      lecture,
      startTime,
      endTime,
      subject,
      location,
      semester,
    } = formData;

    const body = {
      day,
      lecture: parseInt(lecture),
      startTime,
      endTime,
      subject,
      venue: location,
      semester: parseInt(semester),
    };

    const data = await post("/schedules/add", body);

    if (data && data.schedule) {
      console.log("Schedule added successfully:", data.schedule);
    }

    setFormData((prev) => ({
      ...prev,
      startTime: "",
      endTime: "",
      subject: "",
      location: "",
    }));

    fetchSchedules();
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">Time Table</h1>

      <form className="flex flex-wrap gap-4 justify-center items-center mb-6">
        <select
          id="day"
          required
          className="border p-2 rounded"
          value={formData.day}
          onChange={handleInputChange}
        >
          <option value="Mon">Monday</option>
          <option value="Tue">Tuesday</option>
          <option value="Wed">Wednesday</option>
          <option value="Thu">Thursday</option>
          <option value="Fri">Friday</option>
          <option value="Sat">Saturday</option>
        </select>

        <select
          id="lecture"
          required
          className="border p-2 rounded"
          value={formData.lecture}
          onChange={handleInputChange}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          id="semester"
          required
          className="border p-2 rounded"
          value={formData.semester}
          onChange={handleInputChange}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Semester {i + 1}
            </option>
          ))}
        </select>

        <input
          type="text"
          id="startTime"
          placeholder="Start Time (e.g. 9:30 AM)"
          required
          className="border p-2 rounded"
          value={formData.startTime}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="endTime"
          placeholder="End Time (e.g. 12:30 PM)"
          required
          className="border p-2 rounded"
          value={formData.endTime}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="subject"
          placeholder="Subject"
          required
          className="border p-2 rounded"
          value={formData.subject}
          onChange={handleInputChange}
        />
        <input
          type="text"
          id="location"
          placeholder="Location"
          required
          className="border p-2 rounded"
          value={formData.location}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Add Entry
        </button>
      </form>

      <p className="text-center text-gray-700 mb-2">
        Showing timetable for <strong>Semester {formData.semester}</strong>
      </p>

      <TimeTable schedules={timetableData} />
    </div>
  );
}

export default Calendar;

