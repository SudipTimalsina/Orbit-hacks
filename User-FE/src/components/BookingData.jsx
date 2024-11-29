import React, { useState } from "react";

const BookingData = ({ isOpen, closeDetail }) => {
  // Simulated booking data
  const bookings = [
    {
      userName: "John Doe",
      licenseNo: "ABC123",
      vehicleType: "Car",
      entryTime: "2024-11-27 10:00",
      exitTime: "2024-11-27 12:00",
    },
  ];

  // Helper function to calculate parking duration
  const calculateDuration = (entry, exit) => {
    const entryTime = new Date(entry);
    const exitTime = new Date(exit);
    const diffMs = exitTime - entryTime; // Difference in milliseconds
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours} hr ${diffMinutes} min`;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={closeDetail}
        >
          ✖
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

        {/* Booking List */}
        <ul className="space-y-4">
          {bookings.map((booking, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-sm"
            >
              <p>
                <strong>User Name:</strong> {booking.userName}
              </p>
              <p>
                <strong>License No:</strong> {booking.licenseNo}
              </p>
              <p>
                <strong>Vehicle Type:</strong> {booking.vehicleType}
              </p>
              <p>
                <strong>Parking Duration:</strong>{" "}
                {calculateDuration(booking.entryTime, booking.exitTime)}
              </p>
              <p>
                <strong>Time:</strong> {booking.entryTime} - {booking.exitTime}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingData;
