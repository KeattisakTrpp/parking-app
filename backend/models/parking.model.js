const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parkingSchema = new Schema({
  date: { type: Date, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  status: {type: String, enum: ['active', 'reserved', 'inactive'] },
  userId: { type: Schema.Types.ObjectId, required: true }
}, {
  timestamps: true,
});

const Parking = mongoose.model('Parking', parkingSchema);

module.exports = Parking;
