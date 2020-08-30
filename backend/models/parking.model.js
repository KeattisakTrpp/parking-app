const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parkingSchema = new Schema({
  date: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
}, {
  timestamps: true,
});

const Parking = mongoose.model('Parking', parkingSchema);

module.exports = Parking;