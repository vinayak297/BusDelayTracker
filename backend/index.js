const express = require("express");
const app = express();

// In-memory bus state
let bus = {
  busNumber: "23A",
  etaMinutes: 6,
  delayMinutes: 0,
  status: "On the way"
};

// Simulate time passing every 5 seconds
setInterval(() => {
  if (bus.etaMinutes > 0) {
    bus.etaMinutes -= 1;
  }

  // Random delay simulation
  const trafficChance = Math.random();
  if (trafficChance > 0.7) {
    bus.delayMinutes += 2;
    bus.etaMinutes += 2;
    bus.status = "Delayed due to traffic";
  }

  if (bus.etaMinutes <= 0) {
    bus.status = "Arrived";
  }
}, 5000);

// API endpoint
app.get("/bus", (req, res) => {
  res.json(bus);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
