<<<<<<< HEAD
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
=======
import React, { useState } from "react";

const BookingForm = ({ onCancel }) => {
  const [bookingDetails, setBookingDetails] = useState({
    vehicleType: "",
    time: "",
    hours: "",
    minutes: "",
    licensePlate: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const availableSpaces = 30;

  const handleBookingFormSubmit = (e) => {
    e.preventDefault();

    console.log("Booking Details:", bookingDetails);

    setSuccessMessage("Booking submitted successfully!");

    setBookingDetails({
      vehicleType: "",
      time: "",
      hours: "",
      minutes: "",
      licensePlate: "",
    });

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-lg border border-blue-200">
      <div className="mb-6 p-4 bg-blue-50 border border-blue-300 rounded shadow-sm">
        <h3 className="text-lg font-medium text-blue-700">
          Available Parking Spaces
        </h3>
        <p className="mt-2 text-sm text-blue-600">
          Total spaces available:{" "}
          <span className="font-semibold text-indigo-700">
            {availableSpaces}
          </span>
        </p>
      </div>
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
        Book Your Parking Spot
      </h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 text-center rounded shadow">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleBookingFormSubmit} className="space-y-5">
        {/* Vehicle Type */}
        <div>
          <label className="block text-md font-medium text-indigo-700">
            Vehicle Type
          </label>
          <select
            className="w-full mt-1 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={bookingDetails.vehicleType}
            onChange={(e) =>
              setBookingDetails({
                ...bookingDetails,
                vehicleType: e.target.value,
              })
            }
            required
          >
            <option value="" disabled>
              Select vehicle type
            </option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Bus">Bus</option>
            <option value="Truck">Truck</option>
          </select>
        </div>

        {/* Booking Time */}
        <div>
          <label className="block text-md font-medium text-indigo-700">
            Booking Start Time
          </label>
          <input
            type="datetime-local"
            className="w-full mt-1 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={bookingDetails.time}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, time: e.target.value })
            }
            required
          />
        </div>

        {/* Parking Duration */}
        <div>
          <label className="block text-md font-medium text-indigo-700 mb-2">
            Parking Duration
          </label>
          <div className="flex space-x-4">
            {/* Hours Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-indigo-600">
                Hours
              </label>
              <input
                type="number"
                min="0"
                className="w-full mt-1 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={bookingDetails.hours || ""}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    hours: e.target.value,
                  })
                }
                placeholder="2"
                required
              />
            </div>

            {/* Minutes Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-indigo-600">
                Minutes
              </label>
              <input
                type="number"
                min="0"
                max="59"
                className="w-full mt-1 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={bookingDetails.minutes || ""}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    minutes: e.target.value,
                  })
                }
                placeholder="30"
                required
              />
            </div>
          </div>
        </div>

        {/* License Plate */}
        <div>
          <label className="block text-md font-medium text-indigo-700">
            License Plate
          </label>
          <input
            type="text"
            className="w-full mt-1 p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={bookingDetails.licensePlate}
            onChange={(e) =>
              setBookingDetails({
                ...bookingDetails,
                licensePlate: e.target.value,
              })
            }
            placeholder="e.g., BA-1234"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit Booking
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
>>>>>>> 6e0f9671bd2a920c66297b59aaf346f7a1aec6a0
    </div>
  );
};

<<<<<<< HEAD
export default Booking;
=======
export default BookingForm;
>>>>>>> 6e0f9671bd2a920c66297b59aaf346f7a1aec6a0
