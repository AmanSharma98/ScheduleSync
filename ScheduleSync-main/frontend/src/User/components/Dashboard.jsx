


import React, { useState, useEffect } from 'react';
import Navbar from '../../shared/Navbar';
import ScheduleCard from './ScheduleCard';
import useApi from '../../hooks/useApi';

const Dashboard = () => {
    const { get } = useApi();
    const [todaySchedules, setTodaySchedules] = useState([]);
    const [upcomingSchedules, setUpcomingSchedules] = useState([]);
    const [adjustmentProposals, setAdjustmentProposals] = useState([]);
    const [lecturesDone, setLecturesDone] = useState(0);
    const [lecturesLeft, setLecturesLeft] = useState(0);

    // IDs of lectures marked as done
    const [doneLectureIds, setDoneLectureIds] = useState([]);

    // Load from localStorage on first mount
    useEffect(() => {
        const storedDone = JSON.parse(localStorage.getItem('doneLectureIds')) || [];
        setDoneLectureIds(storedDone);
        setLecturesDone(storedDone.length);
    }, []);

    const fetchSchedules = async () => {
        try {
            const schedules = await get('/schedules');
            const weekday = new Date().toLocaleString('en-US', { weekday: 'short' });
            const filteredSchedules = [];

            schedules.forEach(schedule => {
                if (schedule.day === weekday && !doneLectureIds.includes(schedule._id)) {
                    filteredSchedules.push({
                        id: schedule._id,
                        title: schedule.teacher.name,
                        startTime: schedule.startTime,
                        endTime: schedule.endTime,
                        venue: `${schedule.venue} (${schedule.subject})`,
                        semester: schedule.semester
                    });
                }
            });

            setTodaySchedules(filteredSchedules);
            setLecturesLeft(filteredSchedules.length);

            // Save today's total lectures in localStorage
            localStorage.setItem('todayLectureCount', filteredSchedules.length);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, [doneLectureIds]); // refetch if done list changes

    const handleDone = (id) => {
        const updatedDone = [...doneLectureIds, id];
        setDoneLectureIds(updatedDone);
        setLecturesDone(updatedDone.length);
        setLecturesLeft(prev => prev - 1);
        setTodaySchedules(prev => prev.filter(schedule => schedule.id !== id));

        // Store updated values in localStorage
        localStorage.setItem('doneLectureIds', JSON.stringify(updatedDone));
    };

    const getCurrentTime = () => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    };

    const currentTime = getCurrentTime();

    return (
        <div className='relative flex flex-col h-full overflow-x-hidden overflow-y-auto'>
            <Navbar />
            <main className="flex-1 bg-white min-w-[1148px] max-h-[943px]">
                {/* Cards */}
                <div className="flex justify-between gap-2 p-4">
                    <InfoCard icon="/assets/calendar.svg" label="Total Lectures" value={lecturesDone + lecturesLeft} color="#006FD5" bg="bg-blue-300" />
                    <InfoCard icon="/assets/mdi-light--clock.svg" label="Lectures Left" value={lecturesLeft} color="#372980" bg="bg-purple-300" />
                    <InfoCard icon="/assets/copy-success.svg" label="Lectures Done" value={lecturesDone} color="#03781D" bg="bg-green-300" />
                </div>

                {/* Upcoming Adjustments */}
                <Section title="Upcoming Adjustment's">
                    {upcomingSchedules.map(schedule => (
                        <ScheduleCard key={schedule.id} {...schedule} />
                    ))}
                </Section>

                {/* Today's Schedules */}
                <Section title="Today's Schedules">
                    {todaySchedules.map(schedule => (
                        <div key={schedule.id} className="relative">
                            <ScheduleCard {...schedule} />
                            <button
                                onClick={() => handleDone(schedule.id)}
                                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full"
                            >
                                Done
                            </button>
                        </div>
                    ))}
                </Section>

                {/* Adjustment Proposals */}
                <Section title="Adjustment Proposals">
                    {adjustmentProposals.map(schedule => (
                        <ScheduleCard key={schedule.id} {...schedule} />
                    ))}
                </Section>
            </main>
        </div>
    );
};

// Reusable UI component for the top cards
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

// Reusable UI component for sections
const Section = ({ title, children }) => (
    <>
        <div className="flex p-4">
            <h1 id="font" className="text-3xl font-semibold">{title}</h1>
        </div>
        <div className="flex gap-2 pl-4 min-h-44 overflow-x-scroll scrollbar-hide scroll-smooth max-w-[83vw]">
            {children}
        </div>
    </>
);

export default Dashboard;
