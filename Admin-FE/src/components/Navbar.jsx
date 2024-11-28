import React from 'react';

const Navbar = () => {
    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
            }}
        >
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Parking Dashboard</div>
            <div>
                <a
                    href="#"
                    style={{
                        margin: '0 10px',
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    Home
                </a>
                <a
                    href="#"
                    style={{
                        margin: '0 10px',
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    Reports
                </a>
                <a
                    href="#"
                    style={{
                        margin: '0 10px',
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    Settings
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
