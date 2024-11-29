import  { useState } from "react";

const QRCardModal = ({ isOpen, closeModal, licenseNo, entryTime, exitTime }) => {
  if (!isOpen) return null;

  // Calculate the total cost based on entry and exit times
  const calculateCost = (entryTime, exitTime) => {
    const entry = new Date(`2024-11-27T${entryTime.split(" ")[1]}`);
    const exit = new Date(`2024-11-27T${exitTime.split(" ")[1]}`);
    const diffInMs = exit - entry;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const hourlyRate = 50; // Example rate of 50 per hour
    const cost = Math.ceil(diffInHours) * hourlyRate; // Round up and calculate cost
    return { diffInHours: Math.ceil(diffInHours), cost };
  };

  const { diffInHours, cost } = calculateCost(entryTime, exitTime);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold text-center mb-4">Payment Details</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Vehicle License No: <b>{licenseNo}</b>
        </p>
        <div className="text-sm text-gray-600 text-center mb-4">
          <p>Entry Time: <b>{entryTime}</b></p>
          <p>Exit Time: <b>{exitTime}</b></p>
        </div>
        <p className="text-lg font-semibold text-center mb-4">
          Total Cost: <span className="text-blue-600">Rs. {cost}</span>
        </p>
        <div className="text-sm text-gray-600 text-center mb-4">
          <p>Calculation:</p>
          <p><b>Time Spent: {diffInHours} hour(s)</b></p>
          <p><b>Rate: Rs. 50/hour</b></p>
          <p><b>Cost: Rs. {cost}</b></p>
        </div>
        {/* <p className="text-sm text-gray-600 text-center mb-4">
          Choose your payment method:
        </p> */}
        <div className=" flex flex-col gap-1 justify-around mb-4">
          {/* <button
            className="underline bg-white-500 text-black px-4 py-2"
            onClick={closeModal}
          >
            Pay via Cash
          </button> */}
          {/* <h1 className="flex justify-center">OR</h1> */}
          <button
            className="underline bg-white-500 text-black px-4 py-2"
          >
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
