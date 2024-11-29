import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";



const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Add a fallback route for the root ("/") */}
        <Route path="/" element={<Login />} /> {/* Or whatever default page you want */}
      </Routes>
    </Router>
    </>

  );
};

export default App;

