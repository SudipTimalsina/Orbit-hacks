const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  Email: String,
  booking_id: Decimal128,
  booking_time_start:Date,
  booking_duration:Date,
})
module.exports = mongoose.model('Booking',BookingSchema);