import React, { useState } from "react";
import Overview from "./Overview";
import Activity from "./Activity";

const Dashboard = () => {
  const [vehicleCount, setVehicleCount] = useState(10); // Placeholder count
  const [entries, setEntries] = useState([
    {
      licenseNo: "ABC123",
      entryTime: "2024-11-27 10:00",
      exitTime: "2024-11-27 12:00",
    },
    {
      licenseNo: "XYZ456",
      entryTime: "2024-11-27 09:30",
      exitTime: "2024-11-27 11:15",
    },
  ]);

  return (
    <div>
      <Overview totalSpace={50} vehicleCount={vehicleCount} />
      <Activity entries={entries} />
    </div>
  );
};

export default Dashboard;
