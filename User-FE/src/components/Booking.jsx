import { useState } from "react";

const BookingForm = () => {
  const [bookingDetails, setBookingDetails] = useState({
    vehicleType: "",
    time: "",
    licensePlate: "",
  });

  const handleBookingFormSubmit = (e) => {
    e.preventDefault();
    // Display the booking details for now (or process them further)
    console.log("Booking Details:", bookingDetails);
    // Reset form after submission
    setBookingDetails({ vehicleType: "", time: "", licensePlate: "" });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Book a Vehicle
      </h2>
      <form onSubmit={handleBookingFormSubmit}>
        {/* Vehicle Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Type
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bookingDetails.vehicleType}
            onChange={(e) =>
              setBookingDetails({
                ...bookingDetails,
                vehicleType: e.target.value,
              })
            }
            placeholder="e.g., Car, Bike, Truck"
            required
          />
        </div>

        {/* Booking Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Booking Time
          </label>
          <input
            type="datetime-local"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bookingDetails.time}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, time: e.target.value })
            }
            required
          />
        </div>

        {/* License Plate */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            License Plate
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={bookingDetails.licensePlate}
            onChange={(e) =>
              setBookingDetails({
                ...bookingDetails,
                licensePlate: e.target.value,
              })
            }
            placeholder="e.g., ABC-1234"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
