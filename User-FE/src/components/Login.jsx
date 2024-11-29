import React, { useState } from "react"; 
import { FaCarAlt } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to get the navigate function

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your login validation
    if (email && password) {
      // On successful login, navigate to Home page
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-900 to-gray-900 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <div className="flex items-center justify-center mb-6">
          <FaCarAlt className="text-blue-600 text-4xl" />
          <h1 className="text-3xl font-bold text-gray-800 ml-2">Parking Sathi</h1>
        </div>
        <p className="text-gray-500 text-sm text-center mb-6">Manage your parking bookings easily!</p>
        <form onSubmit={handleSubmit}> {/* Handle form submission */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
              <span className="ml-2">Remember Me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
