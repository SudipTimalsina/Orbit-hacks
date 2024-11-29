const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  Name: String,
  Email: { 
    type: String, 
    required: true, 
    unique: true, // Ensures the email is unique
  },
  license_number: String,
  vehicle_type: String,
});


module.exports = mongoose.model('User', UserSchema);
