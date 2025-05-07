import React from 'react'
import { Link, NavLink } from 'react-router';

const SidebarAdmin = () => {
  return (
    <aside className="flex flex-col min-h-screen min-w-[290px] max-h-[1094px] shadow-lg p-4 border-r bg-gray-100">
        <h1 className="text-3xl text-purple-700 font-semibold mb-4">Schedule Sync</h1> 
        
        <div className="space-y-2">
            <NavLink to="/admin/dashboard" className="flex items-center text-lg px-4 py-3 hover:bg-gray-200 rounded-lg">
                <img src={"/assets/dashboard1.svg"} alt="#" className="w-6 h-6 mr-2"/>Dashboard
            </NavLink>
            <NavLink to="/admin/calendar" className="flex items-center text-lg px-4 py-3 hover:bg-gray-200 rounded-lg">
                <img src={"/assets/solarcalendar.svg"} alt="#" className="w-6 h-6 mr-2"/> Calendar
            </NavLink>
            <NavLink to="/admin/applyleave" className="flex items-center text-lg px-4 py-3 hover:bg-gray-200 rounded-lg">
            <img src={"/assets/Leave.svg"} alt="#" className="w-6 h-6 mr-2"/> Approve Leave
            </NavLink>
            <Link to="https://mail.google.com/chat/u/0/#chat/space/AAQAX6CtvCg" className="flex items-center text-lg px-4 py-3 hover:bg-gray-200 rounded-lg">
                <img src={"/assets/solarInbox.svg"} alt="#" className="w-6 h-6 mr-2"/>Inbox
            </Link>
        </div>
        <div className="mt-10">
            <span className="text-gray-500 text-lg font-semibold opactiy-50">Current View</span>
            <div className="mt-3 space-qy-2">
                <div className="bg-gray-100 text-gray-700 rounded-lg p-4 flex flex-col items-center hover:bg-gray-200  border hover:border-blue-500">
                    <img src={"/assets/Meeting.svg"} alt="" className="w-10 h-10"/>
                    <a href="https://meet.google.com/landing">
                    <span className="text-lg mt-3">Meetings </span>
                    </a>
                </div>
                <br />
                <div className="bg-gray-100 text-gray-700 rounded-lg p-4 flex flex-col items-center hover:bg-gray-200 border hover:border-blue-500">
                    <img src={"/assets/cloud.svg"} alt="" className="w-10 h-10"/>
                    <span className="text-lg mt-3">Scheduling</span>
                </div>
            </div>
        </div>

        <div className=" rounded-lg shadow-md p-4 w-full mt-4 bg-white">
            <div className="flex items-center space-x-3">
                <div className="w-12 h-10 flex items-center justify-center">
                    <img src={"/assets/calender.png"} alt="" className="w-10"/>
                </div>
                <div>
                    <h2 className="text-sm font-semibold">Upcoming Event</h2>
                    <p className="text-sm text-red-500 font-medium truncate">Meeting at 10 AM</p>
                </div>
            </div>
            <div className="flex justify-between items-center mt-3">
                <div className="text-center">
                    <span className="text-lg font-bold">8:45</span>
                    <div className="text-xs">AM</div>
                </div>
                <div className="text-gray-500">⇄</div>
                <div className="text-center">
                    <span className="text-lg font-bold">10:45</span>
                    <div className="text-xs">AM</div>
                </div>
            </div>

            <Link to="https://meet.google.com/landing" className="flex items-center justify-center bg-blue-500 text-white font-medium py-2 rounded-md mt-4">
                <img src={"/assets/google-meet.svg"} alt="Google Meet" className="w-4 h-4 mr-2"/>
                Go to meet link
            </Link>
        </div>
    </aside>
  )
}

export default SidebarAdmin