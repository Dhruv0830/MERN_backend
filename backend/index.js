const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const data = fs.readFileSync("response.json", "utf-8");
const petrol = JSON.parse(data);

function totalFuelConsumed(petrol) {
  fuel = 0;
  for (let i = 0; i < petrol.length; i++) {
    fuel += petrol[i].fuel_level;
  }
  return fuel;
}

function fuel_events(petrol) {
  const fuelFillEvent = [];
  for (let i = 0; i < petrol.length; i++) {
    const time = new Date(petrol[i].timestamp);
    const res_object = {
      time: time.toString(),
      fuel_filled: petrol[i].fuel_level,
      location: petrol[i].location,
    };
    fuelFillEvent.push(res_object);
  }
  return fuelFillEvent;
}

app.get("/", (req, res) => {
  res.json({
    totalFuelConsumed: totalFuelConsumed(petrol),
    FuelFillEvents: fuel_events(petrol),
  });
});

app.listen(3000, () => {
  console.log("Server running");
});
