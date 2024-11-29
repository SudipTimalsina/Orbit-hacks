import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-white font-bold text-lg">
          We Park
        </a>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-indigo-200 transition">
            Home
          </a>
          <a href="#" className="text-white hover:text-indigo-200 transition">
            Booking
          </a>
          <a href="#" className="text-white hover:text-indigo-200 transition">
            Dashboard
          </a>
          <a href="#" className="text-white hover:text-indigo-200 transition">
            Logout
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-2 ${isOpen ? "block" : "hidden"} space-y-2`}
      >
        <a href="#" className="block text-white py-2 hover:bg-indigo-600 rounded">
          Home
        </a>
        <a href="#" className="block text-white py-2 hover:bg-indigo-600 rounded">
          Booking
        </a>
        <a href="#" className="block text-white py-2 hover:bg-indigo-600 rounded">
          Dashboard
        </a>
        <a href="#" className="block text-white py-2 hover:bg-indigo-600 rounded">
          Logout
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
