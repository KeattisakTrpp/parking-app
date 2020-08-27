const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeSchema = new Schema({
  date: { type: String, required: true },
  timein: { type: String, required: true },
  timeout: { type: String, required: true },
  
}, {
  timestamps: true,
});

const Time = mongoose.model('Time', timeSchema);

module.exports = Time;