import React from "react";

const Booking = () => {
  // Sample Booking Data
  const bookings = [
    {
      id: 1,
      client: "John Doe",
      licensePlate: "XYZ456",
      time: "9:30 AM - 11:15 AM",
      place: "Parking Slot #12",
    },
    {
      id: 2,
      client: "Jane Smith",
      licensePlate: "ABC123",
      time: "10:00 AM - 12:00 PM",
      place: "Parking Slot #15",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-purple-600 mb-6">Booking Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-indigo-500">
              {booking.client}
            </h2>
            <p className="text-gray-700">
              <strong>License Plate:</strong> {booking.licensePlate}
            </p>
            <p className="text-gray-700">
              <strong>Time:</strong> {booking.time}
            </p>
            <p className="text-gray-700">
              <strong>Place:</strong> {booking.place}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
