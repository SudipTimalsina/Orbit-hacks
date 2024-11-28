import React from "react";

const Activity = ({ entries = [] }) => {
  return (
    <>
      <div className="activity" style={{ marginTop: "20px" }}>
        <h2>Today's Activity</h2>
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <div
              key={index}
              className="activity-entry"
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <p>
                <strong>License No:</strong> {entry.licenseNo}
              </p>
              <p>
                <strong>Entry Time:</strong> {entry.entryTime}
              </p>
              <p>
                <strong>Exit Time:</strong> {entry.exitTime}
              </p>
              <button
                style={{
                  padding: "5px 10px",
                  marginTop: "10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  alert(
                    `Slip download for ${entry.licenseNo} is under development.`
                  )
                }
              >
                Download Slip
              </button>
            </div>
          ))
        ) : (
          <p>No activity recorded for today.</p>
        )}
      </div>
    </>
  );
};

export default Activity;
