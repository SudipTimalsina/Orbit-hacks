import React, { useState } from "react";

const Activity = ({ entries = [] }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  // Helper function to format time
  const formatTime = (time) => {
    const date = new Date(`2024-11-27T${time}`);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // Function to calculate total time between entry and exit
  const calculateTotalTime = (entryTime, exitTime) => {
    const entry = new Date(`2024-11-27T${entryTime.split(" ")[1]}`);
    const exit = new Date(`2024-11-27T${exitTime.split(" ")[1]}`);
    const diffInMs = exit - entry;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInMinutes = (diffInMs % (1000 * 60 * 60)) / (1000 * 60);
    return `${Math.floor(diffInHours)}h ${Math.round(diffInMinutes)}m`;
  };

  // Function to handle sorting by entry time
  const sortEntries = (entries) => {
    return entries.sort((a, b) => {
      const aTime = new Date(`2024-11-27T${a.entryTime.split(" ")[1]}`);
      const bTime = new Date(`2024-11-27T${b.entryTime.split(" ")[1]}`);
      return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
    });
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredEntries = entries.filter((entry) =>
    entry.licenseNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEntries = sortEntries(filteredEntries);

  // Function to highlight late entries
  const isLate = (entryTime, exitTime) => {
    const entry = new Date(`2024-11-27T${entryTime.split(" ")[1]}`);
    const exit = new Date(`2024-11-27T${exitTime.split(" ")[1]}`);
    const diffInMs = exit - entry;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours > 4; // For entries that stay longer than 4 hours
  };

  return (
    <div className="activity" style={{ marginTop: "20px" }}>
      {/* "Today's Activity" heading */}
      <h2 className="text-3xl font-bold mb-4">Today's Activity</h2>

      {/* Search bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded w-1/4"
          placeholder="Search by License No"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {sortedEntries.length > 0 ? (
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <table className="w-full text-left border-collapse sm:text-sm lg:text-base">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th
                  className="py-3 px-4 border-b-2 border-gray-300 cursor-pointer"
                  onClick={handleSort}
                >
                  Entry Time <br />
                  <span className="text-gray-500">(2024-11-27)</span>
                  {sortOrder === "asc" ? "🔼" : "🔽"}
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300">
                  License No
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300">
                  Exit Time
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300">
                  Total Time
                </th>
                <th className="py-3 px-4 border-b-2 border-gray-300">
                  Payment Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, index) => (
                <tr
                  key={index}
                  className={`even:bg-gray-50 ${
                    isLate(entry.entryTime, entry.exitTime)
                      ? "bg-yellow-200"
                      : ""
                  }`}
                >
                  <td className="py-2 px-4 border-b">
                    {formatTime(entry.entryTime.split(" ")[1])}
                  </td>
                  <td className="py-2 px-4 border-b">{entry.licenseNo}</td>
                  <td className="py-2 px-4 border-b">
                    {formatTime(entry.exitTime.split(" ")[1])}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {calculateTotalTime(entry.entryTime, entry.exitTime)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={() =>
                        alert(
                          `Payment details for ${entry.licenseNo} are under development.`
                        )
                      }
                    >
                      View Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No activity recorded for today.</p>
      )}
    </div>
  );
};

export default Activity;
