<<<<<<< HEAD
import React, { useState } from "react"; 
import { FaHome, FaCar, FaChartLine, FaSignOutAlt } from "react-icons/fa"; // Reliable icons from FontAwesome
import Modal from "./BookingModal";
=======
import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router for navigation
import vehicleImage from "./images/vehicle.png"; // Update with the correct path to the image
import { UilEstate, UilSignout, UilMoon } from "@iconscout/react-unicons"; // Importing icons (you can use FontAwesome or other icons)
>>>>>>> 8aca39c49c46a986ac9730cad102049c4299fd25


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
<<<<<<< HEAD
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <div className="text-2xl font-semibold mb-8">We Park</div>
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
=======
    <nav
      className={`bg-white ${
        darkMode ? "dark" : ""
      } shadow-md min-h-screen w-64`}
    >
      {/* Logo Section */}
      <div className="flex items-center p-6">
        <div className="w-10 h-10">
          <img src={vehicleImage} alt="We Park Logo" />
>>>>>>> 8aca39c49c46a986ac9730cad102049c4299fd25
        </div>
      </div>

<<<<<<< HEAD
      {/* Modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
=======
      {/* Menu Items */}
      <div className="menu-items mt-10">
        <ul className="nav-links space-y-6">
          {/* Dashboard Link */}
          <li>
            <Link
              to="#"
              className="flex items-center space-x-3 p-4 hover:bg-gray-100"
            >
              <UilEstate className="w-6 h-6" />
              <span className="link-name">Dashboard</span>
            </Link>
          </li>

          {/* Logout Section */}
          <ul className="logout-mode space-y-6">
            <li>
              <Link
                to="/logout"
                className="flex items-center space-x-3 p-4 hover:bg-gray-100"
              >
                <UilSignout className="w-6 h-6" />
                <span className="link-name">Logout</span>
              </Link>
            </li>
          </ul>

          {/* Dark Mode Toggle */}
          <li className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-3">
              <UilMoon className="w-6 h-6" />
              <span className="link-name">Dark Mode</span>
            </div>
            <div
              className={`mode-toggle ${
                darkMode ? "bg-indigo-600" : "bg-gray-200"
              } relative rounded-full w-10 h-5 cursor-pointer`}
              onClick={handleDarkModeToggle}
            >
              <span
                className={`switch block w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform duration-300 ease-in-out ${
                  darkMode ? "translate-x-5" : "translate-x-1"
                }`}
              ></span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
>>>>>>> 8aca39c49c46a986ac9730cad102049c4299fd25
  );
};

export default Sidebar;
