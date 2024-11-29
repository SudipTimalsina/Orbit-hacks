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
    </div>
  );
};

export default App;
