<<<<<<< HEAD
import React from 'react'
// import Login from './components/Login'
import Map from './components/map'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      {/* <Login/> */}
      <Navbar />
      <Map/>
=======
import React from "react";
import Login from "./components/Login";
import Map from "./components/map";
import Booking from "./components/Booking";

const App = () => {
  return (
    <div className="h-screen flex">
      {/* Map Section */}
      <div className="flex-1 bg-gray-200">
        <Map />
      </div>
>>>>>>> 6e0f9671bd2a920c66297b59aaf346f7a1aec6a0
    </div>
  );
};

export default App;
