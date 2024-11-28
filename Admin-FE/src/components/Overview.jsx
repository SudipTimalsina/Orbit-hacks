import React from "react";
import { FaCar, FaCarAlt, FaParking } from "react-icons/fa"; // Reliable icons from FontAwesome

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Space */}
        <div className="flex flex-col items-center p-6 h-48 bg-blue-500 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-center mb-4 text-white text-4xl">
            <FaParking /> {/* Parking Icon for Total Space */}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Total Space</h3>
          <p className="text-white text-xl">50</p>
        </div>

        {/* Card 2: Total Vehicles */}
        <div className="flex flex-col items-center p-6 h-48 bg-green-500 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-center mb-4 text-white text-4xl">
            <FaCar /> {/* Car Icon for Total Vehicles */}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Total Vehicles</h3>
          <p className="text-white text-xl">30</p>
        </div>

        {/* Card 3: Available Space */}
        <div className="flex flex-col items-center p-6 h-48 bg-red-500 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-center mb-4 text-white text-4xl">
            <FaCarAlt /> {/* Alternative Car Icon for Available Space */}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Available Space</h3>
          <p className="text-white text-xl">20</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
