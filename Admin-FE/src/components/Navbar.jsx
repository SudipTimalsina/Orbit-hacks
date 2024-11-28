import React, { useState } from "react"; 
import { FaHome, FaCar, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import Modal from "./BookingModal";


const Sidebar = () => {
  // State to handle modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-64 h-screen bg-cyprus text-white p-4">
        <div className="flex gap-2 ">
        <LuParkingCircle className="text-3xl"/>
      <div className="text-2xl font-semibold mb-8">We Park</div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
          <FaHome className="text-2xl" />
          <span className="text-lg">Home</span>
        </div>

        {/* Booking link with click handler */}
        <div
          onClick={openModal} // Trigger modal on click
          className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaCar className="text-2xl" />
          <span className="text-lg">Booking</span>
        </div>

        <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
          <FaChartLine className="text-2xl" />
          <span className="text-lg">Dashboard</span>
        </div>

        {/* Logout Link */}
        <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
          <FaSignOutAlt className="text-2xl" />
          <span className="text-lg">Logout</span>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Sidebar;
