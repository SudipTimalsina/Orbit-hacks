// Modal Component
import React from "react";

const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/3 transform transition-all scale-95 hover:scale-100">
        <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
        <p className="text-gray-700 mb-6">Here you can place the content for booking details or a form.</p>

        {/* Example form or booking content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Enter Vehicle Number</label>
          <input
            type="text"
            placeholder="ABC 1234"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-between">
          <button
            onClick={closeModal}
            className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={closeModal}
            className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
