import React from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default App;
