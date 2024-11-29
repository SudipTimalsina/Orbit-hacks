import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import BookingData from "./components/BookingData";
import PaymentPage from "./components/PaymentPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bookings" element={<BookingData />} />{" "}
        {/* New Route for Booking Data */}
        <Route path="/payment" element={<PaymentPage />} />{" "}
        {/* New Route for Payment */}
        <Route path="/" element={<Home />} /> {/* Default Route */}
      </Routes>
    </Router>
  );
};

export default App;
