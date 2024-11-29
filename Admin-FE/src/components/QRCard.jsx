import React from "react";

const QRCardModal = ({
  isOpen,
  closeModal,
  licenseNo,
  entryTime,
  exitTime,
}) => {
  if (!isOpen) return null;

  // Helper function to parse and calculate the total cost based on entry and exit times
  const calculateCost = (entryTime, exitTime) => {
    if (!entryTime || !exitTime) {
      console.warn("Missing entryTime or exitTime");
      return { diffInHours: 0, cost: 0 };
    }

    try {
      // Assuming today's date (you can dynamically set this if needed)
      const todayDate = new Date().toISOString().split("T")[0]; // Format: "YYYY-MM-DD"

      // Parse the entry and exit times, adding today's date
      const entry = new Date(`${todayDate}T${entryTime}`);
      const exit = new Date(`${todayDate}T${exitTime}`);

      if (isNaN(entry) || isNaN(exit)) {
        console.error("Invalid date format for entryTime or exitTime");
        return { diffInHours: 0, cost: 0 };
      }

      const diffInMs = exit - entry; // Time difference in milliseconds

      // Handle cases where the exit time is earlier than the entry time
      if (diffInMs < 0) {
        console.error("Exit time cannot be earlier than entry time.");
        return { diffInHours: 0, cost: 0 };
      }

      const diffInHours = diffInMs / (1000 * 60 * 60); // Convert to hours
      const hourlyRate = 50; // Example hourly rate
      const cost = Math.ceil(diffInHours) * hourlyRate; // Round up to the nearest hour

      return { diffInHours: Math.ceil(diffInHours), cost };
    } catch (error) {
      console.error("Error in calculateCost:", error.message);
      return { diffInHours: 0, cost: 0 };
    }
  };

  // Calculate the cost and duration
  const { diffInHours, cost } = calculateCost(entryTime, exitTime);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold text-center mb-4">Payment Details</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Vehicle License No: <b>{licenseNo || "N/A"}</b>
        </p>
        <div className="text-sm text-gray-600 text-center mb-4">
          <p>
            Entry Time: <b>{entryTime || "N/A"}</b>
          </p>
          <p>
            Exit Time: <b>{exitTime || "N/A"}</b>
          </p>
        </div>
        <p className="text-lg font-semibold text-center mb-4">
          Total Cost: <span className="text-blue-600">Rs. {cost}</span>
        </p>
        <div className="text-sm text-gray-600 text-center mb-4">
          <p>Calculation:</p>
          <p>
            <b>Time Spent: {diffInHours} hour(s)</b>
          </p>
          <p>
            <b>Rate: Rs. 50/hour</b>
          </p>
          <p>
            <b>Cost: Rs. {cost}</b>
          </p>
        </div>
        <div className="flex flex-col gap-1 justify-around mb-4">
          <button className="underline bg-white-500 text-black px-4 py-2">
            Pay via Khalti
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <img src="./QR.png" alt="QR Code" className="w-40 h-40" />
        </div>
        <button
          onClick={closeModal}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QRCardModal;
