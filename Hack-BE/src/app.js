const express = require("express");
const app = express();
const Vehicle = require("./models/Vehicle"); // Import the model
const User = require("./models/User")
const Booking = require("./models/Booking")
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


app.post('/users', async (req, res) => {
  try {
    const { Name, Email, license_number, vehicle_type } = req.body;

    // Create a new user instance
    const newUser = new User({
      Name,
      Email,
      license_number,
      vehicle_type,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user', details: err.message });
  }
});


app.post('/booking', async (req, res) => {
  try {
    const { Email, vehicle_type, booking_time_start, booking_duration } = req.body;

    // Check if the email exists in the User schema
    const userExists = await User.findOne({ Email });
    if (!userExists) {
      return res.status(404).json({ error: 'Email not found in User records' });
    }

    // Generate a random unique booking_id
    const booking_id = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number

    // Create a new booking instance
    const newBooking = new Booking({
      Email,
      vehicle_type,
      booking_id,
      booking_time_start,
      booking_duration,
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking', details: err.message });
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
