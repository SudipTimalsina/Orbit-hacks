import React, { useState } from "react";
import QRCardModal from "./QRCard";

const Activity = ({ data = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLicense, setCurrentLicense] = useState({
    licenseNo: "",
    entryTime: "",
    exitTime: "",
  });

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
                <td className="py-2 px-4 border-b">{entry.licenseNo}</td>
                <td className="py-2 px-4 border-b">{entry.entryTime}</td>
                <td className="py-2 px-4 border-b">{entry.exitTime}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={() =>
                        openModal(
                          entry.licenseNo,
                          entry.entryTime,
                          entry.exitTime
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

export default Activity