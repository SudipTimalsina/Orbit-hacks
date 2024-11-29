const express = require("express");
const app = express();
const Vehicle = require("./models/Vehicle"); // Import the model
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const PORT = 3001;
const CONNECTION = process.env.CONNECTION;

// Database connection
const start = async () => {
  try {
    await mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);

    });
    server.listen(3002, () => {
      console.log('listening on port ' + 3002);
    });
  } catch (e) {
    console.error("Database connection error:", e.message);
  }
};

// API endpoints
app.get("/api/vehicles", async (req, res) => {
  try {
    const result = await Vehicle.find();
    res.json({ Vehicles: result });
  } catch (e) {
    console.error("Error fetching vehicles:", e.message);
    res.status(500).json({ error: e.message });
  }
});

// GET endpoint to count vehicles
app.get("/api/vehicles/count", async (req, res) => {
  try {
    const vehicleCount = await Vehicle.countDocuments();
    res.json({ count: vehicleCount });
  } catch (err) {
    console.error("Error counting vehicles:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Socket.IO setup
io.on("connection", async(socket) => {
  console.log("A user connected:", socket.id);
  
  try{
    const count = await getVehicleCount();
    const result = await Vehicle.find();
    socket.emit('initialData',{count , result})
  } catch (error) {
    console.error("Error fetching data from database:", error);
  }

  


  const updateVehicleCount = async () => {
    try {
      // Emit the initial count of vehicles to the frontend
      const count = await getVehicleCount();

      console.log("Current vehicle count:", count); 
      socket.emit('vehicleCountUpdate', count);
    } catch (error) {
      console.error("Error fetching data from database:", error);
    }
  };

  const sendVehicleData = async () => {
    console.log("Send Vehicle List");
    try {
      const result = await Vehicle.find();
      socket.emit('entryUpdate',{ Vehicles: result });
    } catch (e) {
      console.error("Error fetching vehicles:", e.message);
      socket.emit('connect_error',{error: e.message})
    }
  }
  
  Vehicle.watch().on('change', async() => {
    console.log('detected');
    updateVehicleCount();
    sendVehicleData();
  });
  

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});


// Function to get the current count of vehicles
const getVehicleCount = async () => {
  try {
    const count = await Vehicle.countDocuments({ exited: false });
    return count;
  } catch (error) {
    console.error("Error getting vehicle count:", error);
    return 0;
  }
};
// Start server
start();
