// import React from "react";
import { FaCar, FaCarAlt, FaParking } from "react-icons/fa"; // Reliable icons from FontAwesome

const Dashboard = ({ totalSpace, vehicleCount }) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-6 h-48 bg-greenlight rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-center mb-4 text-white text-4xl">
            <FaParking />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Total Space</h3>
          <p className="text-white text-xl">{totalSpace}</p>
        </div>

        <div className="flex flex-col items-center p-6 h-48 bg-crush rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-center mb-4 text-white text-4xl">
            <FaCar />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Total Vehicles
          </h3>
          <p className="text-white text-xl">{vehicleCount}</p>
        </div>

        <div className="flex flex-col items-center p-6 h-48 bg-seafloor rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-200 shadow-lg">
          <div className="flex items-center justify-center mb-4 text-white text-4xl">
            <FaCarAlt />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Available Space
          </h3>
          <p className="text-white text-xl">{totalSpace - vehicleCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
