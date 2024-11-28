import { motion } from "framer-motion";
import { useState } from "react";
import { Car, Calendar, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
  // Mock data for frontend-only demonstration
  const [analyticsData] = useState({
    totalVehicles: 120, // Current number of vehicles in the parking lot
    totalBookings: 150, // Total parking bookings made
    totalRevenue: 5000, // Total revenue generated from bookings
  });

  const [dailyBookingData] = useState([
    { name: "Mon", bookings: 20, revenue: 200 },
    { name: "Tue", bookings: 18, revenue: 180 },
    { name: "Wed", bookings: 22, revenue: 250 },
    { name: "Thu", bookings: 17, revenue: 170 },
    { name: "Fri", bookings: 25, revenue: 300 },
    { name: "Sat", bookings: 30, revenue: 400 },
    { name: "Sun", bookings: 15, revenue: 150 },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard
          title="Total Vehicles"
          value={analyticsData.totalVehicles.toLocaleString()}
          icon={Car}
          color="from-gray-700 to-gray-800"
        />
        <AnalyticsCard
          title="Total Bookings"
          value={analyticsData.totalBookings.toLocaleString()}
          icon={Calendar}
          color="from-gray-700 to-gray-800"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`रु ${analyticsData.totalRevenue.toLocaleString()}`} // Changed to Nepali Rupees
          icon={DollarSign}
          color="from-gray-700 to-gray-800"
        />
      </div>

      {/* Line Chart Section for Daily Bookings and Revenue */}
      <motion.div
        className="bg-gray-900 rounded-lg p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={dailyBookingData}>
            <CartesianGrid strokeDasharray="5 5" stroke="#d1d5db" />
            <XAxis dataKey="name" stroke="#d1d5db" />
            <YAxis yAxisId="left" stroke="#d1d5db" />
            <YAxis yAxisId="right" orientation="right" stroke="#d1d5db" />
            <Tooltip
              contentStyle={{ backgroundColor: "#2d3748", color: "#fff" }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bookings"
              stroke="#A78BFA" // Light purple for bookings
              activeDot={{ r: 10 }} // Increased dot size
              name="Bookings"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#FBBF24" // Warm yellow for revenue
              activeDot={{ r: 10 }} // Increased dot size
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

// Analytics Card Component
const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`bg-gray-800 rounded-lg p-8 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-white text-lg mb-2 font-semibold">{title}</p>
        <h3 className="text-white text-4xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-transparent opacity-20" />
    <div className="absolute -bottom-4 -right-4 text-white opacity-50">
      <Icon className="h-40 w-40" />
    </div>
  </motion.div>
);
