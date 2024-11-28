import React from "react";

const Overview = ({ totalSpace, vehicleCount }) => {
  return (
    <div className="overview" style={{ marginBottom: "20px" }}>
      <h1>Dashboard</h1>
      <div
        className="stats"
        style={{ display: "flex", gap: "20px", marginTop: "10px" }}
      >
        <div
          style={{
            padding: "10px",
            background: "#f0f0f0",
            borderRadius: "8px",
          }}
        >
          <strong>Total Space:</strong> {totalSpace}
        </div>
        <div
          style={{
            padding: "10px",
            background: "#f0f0f0",
            borderRadius: "8px",
          }}
        >
          <strong>Total Vehicles:</strong> {vehicleCount}
        </div>
        <div
          style={{
            padding: "10px",
            background: "#f0f0f0",
            borderRadius: "8px",
          }}
        >
          <strong>Available Space:</strong> {totalSpace - vehicleCount}
        </div>
      </div>
    </div>
  );
};

export default Overview;
