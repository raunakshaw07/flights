const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  sourceCity: {
    type: String,
  },
  destinationCity: {
    type: String,
  },
  tripCategory: {
    type: String,
  },
  departureDay: {
    type: Date,
  },
  departureTime: {
    type: String,
  },
  fare: {
    type: Number,
  },
});

const FlightModel = mongoose.model("Flight", FlightSchema);
module.exports = FlightModel;
