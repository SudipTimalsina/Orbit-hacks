import React, { useState, useEffect } from "react";
import io from "socket.io-client"; // Import Socket.IO client
import Overview from "./Overview";
import Activity from "./Activity";

const SOCKET_SERVER_URL = "http://10.10.11.219:3000"; // Backend Socket.IO server URL

const Dashboard = () => {
  const [vehicleCount, setVehicleCount] = useState(0); // Initialize with 0
  const [entries, setEntries] = useState([]); // Start with an empty array
  const [connectionStatus, setConnectionStatus] = useState("Connecting..."); // Connection status

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io(SOCKET_SERVER_URL);

    // Listen for the 'connect' event
    socket.on("connect", () => {
      console.log("Connected to the Socket.IO server");
      setConnectionStatus("Connected to the server!"); // Update connection status
    });

    // Handle connection error
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setConnectionStatus("Connection failed. Retrying...");
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
      setConnectionStatus("Disconnected from the server.");
    });

    // Listen for the initial vehicle count and entries on connection
    socket.on("initialData", ({ count, vehicles }) => {
      setVehicleCount(count); // Set the vehicle count
      setEntries(vehicles); // Set the initial entries
    });

    // Listen for real-time vehicle count updates
    socket.on("vehicleCountUpdate", (newVehicleCount) => {
      setVehicleCount(newVehicleCount);
    });

    // Listen for new entries (if implemented on the backend)
    socket.on("entryUpdate", (newEntry) => {
      setEntries((prevEntries) => [...prevEntries, newEntry]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Display connection status */}
      <div className="connection-status">
        <p className="text-sm text-blue-600">{connectionStatus}</p>
      </div>

      <Overview totalSpace={50} vehicleCount={vehicleCount} />
      <Activity data={entries} />
    </div>
  );
};

export default Dashboard;
