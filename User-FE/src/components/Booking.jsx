import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BookingForm = ({ selectedLocation }) => {
  const [bookingDetails, setBookingDetails] = useState({
    vehicleType: "",
    time: "",
    hours: "",
    minutes: "",
    licensePlate: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [price, setPrice] = useState(0);

  const availableSpaces = 30;
  const ratePerHour = 50; // 50 Nepali Rupees per hour

  const navigate = useNavigate(); // Initialize navigate

  const handleBookingFormSubmit = (e) => {
    e.preventDefault();

    // Get booking details for calculation
    const totalHours = parseInt(bookingDetails.hours) || 0;
    const totalMinutes = parseInt(bookingDetails.minutes) || 0;

    // Convert total minutes to hours and add to hours
    const totalTimeInHours = totalHours + totalMinutes / 60;

    // Calculate the price based on hours
    const calculatedPrice = totalTimeInHours * ratePerHour;
    setPrice(calculatedPrice);

    // Navigate to payment page with price and booking details
    navigate("/payment", {
      state: { price: calculatedPrice, bookingDetails }, // Pass state with price and details
    });
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-md border border-blue-200">
      <div className="mb-4 p-3 bg-blue-50 border border-blue-300 rounded shadow-sm">
        <h3 className="text-md font-medium text-blue-700">
          Available Parking Spaces at {selectedLocation.name}
        </h3>
        <p className="mt-1 text-sm text-blue-600">
          Total spaces available:{" "}
          <span className="font-semibold text-indigo-700">
            {availableSpaces}
          </span>
        </p>
      </div>
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
        Book Your Parking Spot
      </h2>

      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 text-center rounded shadow">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleBookingFormSubmit} className="space-y-4">
        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-medium text-indigo-700">
            Vehicle Type
          </label>
          <select
            className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <label className="block text-sm font-medium text-indigo-700">
            Booking Start Time
          </label>
          <input
            type="datetime-local"
            className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={bookingDetails.time}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, time: e.target.value })
            }
            required
          />
        </div>

        {/* Parking Duration */}
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">
            Parking Duration
          </label>
          <div className="flex space-x-4">
            <div>
              <input
                type="number"
                className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Hours"
                min="0"
                value={bookingDetails.hours}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    hours: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <input
                type="number"
                className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Minutes"
                min="0"
                value={bookingDetails.minutes}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    minutes: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
        </div>

        {/* License Plate */}
        <div>
          <label className="block text-sm font-medium text-indigo-700">
            License Plate Number
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={bookingDetails.licensePlate}
            onChange={(e) =>
              setBookingDetails({
                ...bookingDetails,
                licensePlate: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Price Display */}
        {price > 0 && (
          <div className="mt-4 text-lg font-semibold text-indigo-700">
            Total Price: NPR {price} (For {bookingDetails.hours} hours and{" "}
            {bookingDetails.minutes} minutes)
          </div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          <span>Pay via Khalti</span>
          <img
            className="w-9 h-9"
            src="./Naya_Khalti_Logo_icon_2018.png"
            alt="Khalti Logo"
          />
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
