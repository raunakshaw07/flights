const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const FlightModel = require("./model/FlightModel");

const uri = "mongodb://localhost/flight";
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const flights = await FlightModel.find({});
  if (flights.length <= 5) {
    const {
      name,
      sourceCity,
      destinationCity,
      tripCategory,
      departureDay,
      departureTime,
      fare,
    } = req.body;

    const flight = new FlightModel({
      name,
      sourceCity,
      destinationCity,
      tripCategory,
      departureDay,
      departureTime,
      fare,
    });
    await flight.save();

    console.log("Data inserted");
    res.render("index", {
      msg: "Data inserted",
    });
  } else {
    res.render("index", {
      msg: "Maximum 5 flights are allowed",
    });
  }
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.post("/search", (req, res) => {
  const { search, searchValue } = req.body;
  console.log({ search, searchValue });
  FlightModel.find({ [search]: searchValue }, (err, flight) => {
    if (err) {
      console.log(err);
    }
    console.log(flight);
    res.render("search", {
      flight: flight[0],
    });
  });
});

const PORT = 5000;

app.listen(PORT);
