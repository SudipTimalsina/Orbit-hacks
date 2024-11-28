import React, { useState } from 'react';

const Dashboard = () => {
    const [vehicleCount, setVehicleCount] = useState(10); // Placeholder count
    const [entries, setEntries] = useState([
        // Placeholder data
        { licenseNo: 'ABC123', entryTime: '2024-11-27 10:00', exitTime: '2024-11-27 12:00' },
        { licenseNo: 'XYZ456', entryTime: '2024-11-27 09:30', exitTime: '2024-11-27 11:15' },
    ]);

    return (
        <div className="dashboard" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            {/* Overview Section */}
            <div className="overview" style={{ marginBottom: '20px' }}>
                <h1>Dashboard</h1>
                <div className="stats" style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                    <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '8px' }}>
                        <strong>Total Space:</strong> 50
                    </div>
                    <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '8px' }}>
                        <strong>Total Vehicles:</strong> {vehicleCount}
                    </div>
                    <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '8px' }}>
                        <strong>Available Space:</strong> {50 - vehicleCount}
                    </div>
                </div>
            </div>

            {/* Activity Section */}
            <div className="activity" style={{ marginTop: '20px' }}>
                <h2>Today's Activity</h2>
                {entries.length > 0 ? (
                    entries.map((entry, index) => (
                        <div
                            key={index}
                            className="activity-entry"
                            style={{
                                marginBottom: '10px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                background: '#fff',
                            }}
                        >
                            <p><strong>License No:</strong> {entry.licenseNo}</p>
                            <p><strong>Entry Time:</strong> {entry.entryTime}</p>
                            <p><strong>Exit Time:</strong> {entry.exitTime}</p>
                            <button
                                style={{
                                    padding: '5px 10px',
                                    marginTop: '10px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => alert(`Slip download for ${entry.licenseNo} is under development.`)}
                            >
                                Download Slip
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No activity recorded for today.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
