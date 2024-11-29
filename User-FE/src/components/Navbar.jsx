import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import BookingData from "./BookingData";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBookingDetail = () => {
    setIsBookingOpen(true);
  };

  const closeBookingDetail = () => {
    setIsBookingOpen(false);
  };

  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem("authToken");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <nav className="bg-cyprus text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="text-white font-bold text-lg">
          Parking Sathi
        </a>

        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-indigo-200 transition">
            Home
          </a>
          <a
            href="#"
            className="text-white hover:text-indigo-200 transition"
            onClick={openBookingDetail}
          >
            Booking
          </a>
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="block md:hidden text-white focus:outline-none">
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

      {/* Booking Details Popup */}
      <BookingData isOpen={isBookingOpen} closeDetail={closeBookingDetail} />
    </nav>
  );
};

export default Navbar;
