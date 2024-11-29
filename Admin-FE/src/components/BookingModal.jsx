import React from "react";

const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  // Static booking data (this would represent data coming from the client side)
  const bookings = [
    {
      name: "Ram Bahadur",
      Liscense: "BAB 1434",
      time: "10:00 AM",
      vehicleType: "Car",
      parkingTime: "1 hour",
    },
    {
      name: "Hari Prasad",
      Liscense: "BAB 1789",
      time: "11:30 AM",
      vehicleType: "Bike",
      parkingTime: "2 hours",
    },
    {
      name: "Tim jung",
      Liscense: "BDE 5959",
      time: "2:00 PM",
      vehicleType: "Truck",
      parkingTime: "1 hour",
    },
    {
      name: "Emily Clark",
      Liscense: "BDE 8998",
      time: "3:30 PM",
      vehicleType: "Car",
      parkingTime: "4 hours",
    },
    {
      name: "Sarah Lee",
      Liscense: "BAA 7767",
      time: "5:00 PM",
      vehicleType: "Bike",
      parkingTime: "3 hours",
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-3/4 transform transition-all scale-95 hover:scale-100">
        <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>

        {/* Booking List */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Booked Appointments</h3>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Liscense No.</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Vehicle Type</th>
                <th className="px-4 py-2 text-left">Parking Duration</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{booking.name}</td>
                  <td className="px-4 py-2">{booking.Liscense}</td>
                  <td className="px-4 py-2">{booking.time}</td>
                  <td className="px-4 py-2">{booking.vehicleType}</td>
                  <td className="px-4 py-2">{booking.parkingTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
