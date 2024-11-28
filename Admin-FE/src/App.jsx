import React from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Navbar";

const App = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 p-6 bg-gray-100">
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
