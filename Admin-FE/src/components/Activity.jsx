import React, { useState, useEffect, useRef } from "react";
import QRCardModal from "./QRCard";
import { io } from "socket.io-client";

const Activity = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLicense, setCurrentLicense] = useState({
    licenseNo: "",
    entryTime: "",
    exitTime: "",
  });

  const dataRef = useRef(data); // Ref to keep track of the latest data

  // Fetch vehicle data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/vehicles");
        const result = await response.json();
        setData(result.Vehicles || []); // Set state with fetched data
        dataRef.current = result.Vehicles || []; // Update the ref with the data
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchData();

    // Set up socket connection for real-time updates
    const socket = io("http://localhost:3001"); // Replace with your server URL

    socket.on("vehicleUpdate", (updatedVehicle) => {
      // Update the vehicle entry/exit times without triggering a full re-render
      const updatedData = dataRef.current.map((vehicle) => {
        if (vehicle.license_number === updatedVehicle.license_number) {
          return { ...vehicle, ...updatedVehicle };
        }
        return vehicle;
      });
      dataRef.current = updatedData; // Update the ref

      // Trigger re-render only if the relevant data (entry/exit) changes
      setData(updatedData); // Update state to trigger re-render if necessary
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const openModal = (licenseNo, entryTime, exitTime) => {
    setCurrentLicense({ licenseNo, entryTime, exitTime });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <table className="table-auto w-full text-left border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">License No</th>
            <th className="py-2 px-4 border-b">Entry Time</th>
            <th className="py-2 px-4 border-b">Exit Time</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((entry, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{entry.license_number}</td>
                <td className="py-2 px-4 border-b">{entry.entry_time}</td>
                <td className="py-2 px-4 border-b">
                  {entry.exit_time || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={() =>
                        openModal(
                          entry.license_number,
                          entry.entry_time,
                          entry.exit_time
                        )
                      }
                    >
                      Payment
                      <img
                        className="w-7 h-7"
                        src="./Naya_Khalti_Logo_icon_2018.png"
                        alt="QR Code"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <QRCardModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        licenseNo={currentLicense.licenseNo}
        entryTime={currentLicense.entryTime}
        exitTime={currentLicense.exitTime}
      />
    </div>
  );
};

export default Activity;
