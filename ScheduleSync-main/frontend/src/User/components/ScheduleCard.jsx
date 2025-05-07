function ScheduleCard({ title, startTime, endTime, venue ,semester}) {
    console.log("ScheduleCard props:", { title, startTime, endTime, venue,semester });
    return (
        <div className="bg-white border rounded-lg p-4 min-w-[367px] max-h-[150px]">
                <div className="flex items-center">
                    <span className="text-green-600 text-xl">●</span>
                    <h2 className="text-lg ml-2">{title}</h2>
                </div>
                <p className="text-gray-600 my-2 flex items-center">
                    <img src="/assets/clock.svg" alt="Clock" className="mr-2" />
                    {startTime} → {endTime}
                </p>
                <p className="text-gray-600 flex items-center">
                    <img src="/assets/location.svg" alt="Location" className="mr-2" />
                    {venue}
                </p>
                <p className="text-gray-600 flex items-center">
                    <img src="/assets/location.svg" alt="Location" className="mr-2" />
                    {semester}
                </p>
            </div>
)}


export default ScheduleCard;


