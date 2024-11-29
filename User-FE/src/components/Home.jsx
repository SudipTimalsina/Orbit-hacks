import React from "react";
// import Login from "./components/Login";
import Map from "./map";
import Navbar from "./Navbar";


const Home = () => {
  return (
    <div className="h-screen flex">
      {/* Map Section */}
      <div className="flex-1 bg-gray-200">
        <Navbar></Navbar>
        <Map />
      </div>
    </div>
  );
};

export default Home;
