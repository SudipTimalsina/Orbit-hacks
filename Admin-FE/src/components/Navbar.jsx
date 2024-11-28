import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router for navigation
import vehicleImage from "./images/vehicle.png"; // Update with the correct path to the image
import { UilEstate, UilSignout, UilMoon } from '@iconscout/react-unicons'; // Importing icons (you can use FontAwesome or other icons)

const Navbar = () => {
  // State to toggle dark mode
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Add logic to apply dark mode class here
    // E.g., document.body.classList.toggle("dark");
  };

  return (
    <nav className={`bg-white ${darkMode ? "dark" : ""} shadow-md min-h-screen w-64`}>
      {/* Logo Section */}
      <div className="flex items-center p-6">
        <div className="w-10 h-10">
          <img src={vehicleImage} alt="We Park Logo" />
        </div>
        <span className="ml-3 text-lg font-bold">We Park</span>
      </div>

      {/* Menu Items */}
      <div className="menu-items mt-10">
        <ul className="nav-links space-y-6">
          {/* Dashboard Link */}
          <li>
            <Link to="#" className="flex items-center space-x-3 p-4 hover:bg-gray-100">
              <UilEstate className="w-6 h-6" />
              <span className="link-name">Dashboard</span>
            </Link>
          </li>

          {/* Logout Section */}
          <ul className="logout-mode space-y-6">
            <li>
              <Link to="/logout" className="flex items-center space-x-3 p-4 hover:bg-gray-100">
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
              className={`mode-toggle ${darkMode ? "bg-indigo-600" : "bg-gray-200"} relative rounded-full w-10 h-5 cursor-pointer`}
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
  );
};

export default Navbar;
