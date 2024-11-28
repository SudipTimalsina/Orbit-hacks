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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard
          title="Total Vehicles"
          value={analyticsData.totalVehicles.toLocaleString()}
          icon={Car}
          color="from-emerald-500 to-teal-700"
        />
        <AnalyticsCard
          title="Total Bookings"
          value={analyticsData.totalBookings.toLocaleString()}
          icon={Calendar}
          color="from-emerald-500 to-green-700"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-emerald-500 to-lime-700"
        />
      </div>

      {/* Line Chart Section for Daily Bookings and Revenue */}
      <motion.div
        className="bg-gray-800/60 rounded-lg p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailyBookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis yAxisId="left" stroke="#D1D5DB" />
            <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bookings"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Bookings"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
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
    className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-emerald-300 text-sm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 opacity-30" />
    <div className="absolute -bottom-4 -right-4 text-emerald-800 opacity-50">
      <Icon className="h-32 w-32" />
    </div>
  </motion.div>
);
