import React, { useState } from "react";
import { FaHome, FaCar, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import Modal from "./BookingModal";
import Dashboard from "./Dashboard";
import AnalyticsTab from "./AnalyticsTab";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const changeTab = (tabName) => setActiveTab(tabName);

  return (
    <div className="flex">
      <div className="w-64 h-screen bg-cyprus text-white p-4">
        <div className="flex gap-2">
          <LuParkingCircle className="text-3xl" />
          <div className="text-2xl font-semibold mb-8">We Park</div>
        </div>
        <div className="space-y-4">
          <div
            onClick={() => changeTab("home")}
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
          >
            <FaHome className="text-2xl" />
            <span className="text-lg">Home</span>
          </div>

          <div
            onClick={openModal}
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
          >
            <FaCar className="text-2xl" />
            <span className="text-lg">Booking</span>
          </div>

          <div
            onClick={() => changeTab("dashboard")}
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
          >
            <FaChartLine className="text-2xl" />
            <span className="text-lg">Dashboard</span>
          </div>

          <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
            <FaSignOutAlt className="text-2xl" />
            <span className="text-lg">Logout</span>
          </div>
        </div>
        <Modal isOpen={isModalOpen} closeModal={closeModal} />
      </div>

      <div className="flex-1 p-4">
        {activeTab === "home" && <Dashboard />}
        {activeTab === "dashboard" && <AnalyticsTab />}{" "}
      </div>
    </div>
  );
};

export default Sidebar;
