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

function AdminCalendar() {
  const { get } = useApi();
  const [teachers, setTeachers] = useState([]);
  const [timetableData, setTimetableData] = useState([]);

  const [selectedTeacher, setSelectedTeacher] = useState("");

  const fetchTeachers = async () => {
    const res = await get("/users/get-users");
    setTeachers(res)
  }

  const fetchSchedules = async () => {
    try {

      const data = await get(`/schedules?teacherId=${selectedTeacher}`);
      console.log(selectedTeacher, data)
      if (data) {
        console.log("Fetched schedules:", data);
        setTimetableData(data);
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []); // re-fetch when semester changes

  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">Time Table</h1>

      <form className="flex flex-wrap gap-4 justify-center items-center mb-6">

        <select
          id="userId"
          required
          className="border p-2 rounded"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          {
            teachers.map(teacher => <option value={teacher._id}>{teacher.name} - {teacher.email}</option>)
          }
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={(e) => {
            e.preventDefault();
            fetchSchedules();
          }}
        >
          Search
        </button>
      </form>

      <TimeTable schedules={timetableData} />
    </div>
  );
}

export default AdminCalendar;

