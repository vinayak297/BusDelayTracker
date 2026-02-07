const express = require("express");
const app = express();

// In-memory bus state
let bus = {
  busNumber: "23A",
  etaMinutes: 6,
  delayMinutes: 0,
  status: "On the way",
  waitingCount: 0
};

// Simulate time passing
setInterval(() => {
  if (bus.status === "Arrived") return;

  if (bus.etaMinutes > 0) {
    bus.etaMinutes -= 1;
  }

  if (bus.etaMinutes <= 0) {
    bus.status = "Arrived";
  }
}, 5000);

// View bus status
app.get("/bus", (req, res) => {
  res.json(bus);
});

// Crowd says: still waiting
app.get("/still-waiting", (req, res) => {
  bus.waitingCount += 1;

  // Only delay after 3 people confirm
  if (bus.waitingCount >= 3) {
    bus.delayMinutes += 2;
    bus.etaMinutes += 2;
    bus.status = "Delayed (confirmed by crowd)";
    bus.waitingCount = 0; // reset after confirmation
  }

  res.json(bus);
});

// Crowd confirms arrival
app.get("/bus-arrived", (req, res) => {
  bus.status = "Arrived";
  bus.etaMinutes = 0;

  res.json(bus);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
